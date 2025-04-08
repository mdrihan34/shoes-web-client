import { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AuthContext } from '../../AuthProvider/AuthProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SellerDash = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) {
      console.error('User not found or email is missing.');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://shoes-web-server.vercel.app/order?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data);

          // Filter for confirmed orders only
          const confirmedOrders = data.filter(order => order.Status === 'Confirmed');
          const pendingOrderCount = data.filter(order => order.Status === 'pending').length;

          // Calculate total sales from confirmed orders
          const totalSalesAmount = confirmedOrders.reduce((acc, order) => {
            const price = parseFloat(order.totalPrice);
            return !isNaN(price) ? acc + price : acc;
          }, 0);

          // Calculate the number of products in confirmed orders
          // const productsInConfirmedOrders = confirmedOrders.reduce((acc, order) => {
          //   const itemsCount = Array.isArray(order.items) ? order.items.length : 0;
          //   return acc + itemsCount;
          // }, 0);
          
          setTotalSales(totalSalesAmount);
          setPendingOrders(pendingOrderCount);
         
        } else {
          console.error('Error fetching orders:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Get the current month and year for the title and the chart
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December
  const currentYear = currentDate.getFullYear();

  // Group confirmed orders by date and only show sales for the current month
  const getMonthlySalesData = (orders) => {
    const monthlySales = new Array(30).fill(0); // Initialize array for 30 days in a month

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      if (month === currentMonth && year === currentYear) {
        const day = orderDate.getDate() - 1; // Get day (0-based)
        const totalPrice = parseFloat(order.totalPrice);
        if (!isNaN(totalPrice)) {
          monthlySales[day] += totalPrice; // Add to the specific day of the month
        }
      }
    });

    return monthlySales;
  };

  const monthlySalesData = getMonthlySalesData(orders.filter(order => order.Status === 'Confirmed')); // Only confirmed orders

  // Chart Data Setup
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // Assuming 30 days in the month
    datasets: [
      {
        label: 'Sales Performance ($)',
        data: monthlySalesData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Performance for ${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  useEffect(() => {
    
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(`https://shoes-web-server.vercel.app/user-products?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setProductsCount(data.products);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back!</h1>
        <p className="mt-2 text-gray-600">Manage your sales, orders, and products from here.</p>
      </div>

      <div className="flex w-full justify-evenly gap-4 mt-6">
        <div className="bg-blue-500 text-white w-full p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl mt-2">${totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-green-500 w-full text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl mt-2">{productsCount.length}</p>
        </div>
        <div className="bg-yellow-500 w-full text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-2xl mt-2">{pendingOrders}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Performance</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SellerDash;
