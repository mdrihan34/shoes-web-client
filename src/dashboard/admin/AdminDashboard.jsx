import { FaUsers, FaBoxOpen, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const summaryData = [
    { title: 'Total Users', value: 1200, icon: <FaUsers className="text-blue-500" /> },
    { title: 'Total Products', value: 850, icon: <FaBoxOpen className="text-green-500" /> },
    { title: 'Total Revenue', value: '$15,300', icon: <FaDollarSign className="text-yellow-500" /> },
    { title: 'Total Orders', value: 540, icon: <FaChartLine className="text-purple-500" /> },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [400, 600, 800, 1200, 1500, 2000, 2400],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="text-3xl">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-600 font-medium">{item.title}</p>
              <p className="text-xl font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white mt-6 p-4  mx-auto rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales Overview</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
