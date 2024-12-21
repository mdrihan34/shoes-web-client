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

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const SellerDash = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales Performance',
            data: [5000, 8000, 6500, 9000, 12000, 15000],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
          },
        ],
      };
    
      // Chart options
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Sales Performance',
          },
        },
      };
    
  return (
    <div>
     <div className="min-h-screen bg-gray-100 p-6">
      {/* Welcome Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back!</h1>
        <p className="mt-2 text-gray-600">Manage your sales, orders, and products from here.</p>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl mt-2">$12,345</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl mt-2">120</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-2xl mt-2">15</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Refund Requests</h3>
          <p className="text-2xl mt-2">2</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Performance</h2>
        <Line data={data} options={options} />
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
        <div className="bg-white mt-4 p-4 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer</th>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">#12345</td>
                <td className="px-4 py-2 border-b">John Doe</td>
                <td className="px-4 py-2 border-b">$50.00</td>
                <td className="px-4 py-2 border-b">Completed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">#12346</td>
                <td className="px-4 py-2 border-b">Jane Smith</td>
                <td className="px-4 py-2 border-b">$75.00</td>
                <td className="px-4 py-2 border-b">Pending</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">#12347</td>
                <td className="px-4 py-2 border-b">Michael Brown</td>
                <td className="px-4 py-2 border-b">$120.00</td>
                <td className="px-4 py-2 border-b">Refunded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SellerDash
