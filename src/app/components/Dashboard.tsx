"use client"
import { FaBox, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import SideBar from './SideBar';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Sample data for the charts
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales Growth',
        data: [30, 40, 60, 80, 75, 90], // Example data points
        fill: true,
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.2)', // Light blue background for the graph
        tension: 0.4, // Smooth curve for the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
    <SideBar />
    <div className="p-8 font-sans bg-gradient-to-b from-gray-200 to-gray-50 text-gray-700 md:ml-64 overflow-hidden">
    <h1 className="text-2xl text-blue-600 mb-4">Dashboard Overview</h1>
  
    <div className="flex flex-wrap flex-col md:flex-row justify-between mb-8">
      {/* Total Products Card */}
      <div className="flex-1 bg-gradient-to-b from-blue-800 to-blue-600 p-6 m-2 rounded-lg text-white shadow-lg w-full md:w-[200px]">
        <h3 className="text-xl mb-2 flex items-center">
          <FaBox className="mr-2" />
          Total Products
        </h3>
        <p className="text-3xl">350</p>
        <div className="w-full h-24 bg-white rounded-lg mt-4 relative">
          <Line data={data} options={options} />
        </div>
      </div>
  
      {/* Total Orders Card */}
      <div className="flex-1 bg-gradient-to-b from-blue-800 to-blue-600 p-6 m-2 rounded-lg text-white shadow-lg w-full md:w-[200px]">
        <h3 className="text-xl mb-2 flex items-center">
          <FaShoppingCart className="mr-2" />
          Total Orders
        </h3>
        <p className="text-3xl">200</p>
        <div className="w-full h-24 bg-white rounded-lg mt-4 relative">
          <Line data={data} options={options} />
        </div>
      </div>
  
      {/* Total Users Card */}
      <div className="flex-1 bg-gradient-to-b from-blue-800 to-blue-600 p-6 m-2 rounded-lg text-white shadow-lg w-full md:w-[200px]">
        <h3 className="text-xl mb-2 flex items-center">
          <FaUsers className="mr-2" />
          Total Users
        </h3>
        <p className="text-3xl">250</p>
        <div className="w-full h-24 bg-white rounded-lg mt-4 relative">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  
    {/* Sales Analytics Section */}
    <div>
      <h3 className="text-xl mb-5 text-blue-600 flex items-center">
        <FaChartLine className="mr-2" />
        Sales Analytics
      </h3>
      <div className="w-full h-72 bg-gray-200 rounded-lg flex justify-center items-center text-gray-700 text-lg">
        <Line data={data} options={options} />
      </div>
    </div>
  </div>
  </>
  );
};

export default Dashboard;
