"use client";
import { Line } from 'react-chartjs-2';
import { FaBox, FaShoppingCart, FaUsers, FaExclamationCircle, FaStar } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import SideBar from '../components/SideBar';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartPage = () => {
  // Sample data for each section
  const productData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Total Products Sold',
        data: [30, 40, 60, 70, 90],
        fill: false,
        borderColor: '#3182CE',
        tension: 0.4,
      },
    ],
  };

  const orderData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Total Orders',
        data: [50, 60, 80, 100, 120],
        fill: false,
        borderColor: '#2F855A',
        tension: 0.4,
      },
    ],
  };

  const userData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'New Users',
        data: [20, 30, 45, 50, 65],
        fill: false,
        borderColor: '#D69E2E',
        tension: 0.4,
      },
    ],
  };

  const complaintData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Complaints Received',
        data: [2, 4, 6, 8, 10],
        fill: false,
        borderColor: '#E53E3E',
        tension: 0.4,
      },
    ],
  };

  const reviewData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Average Reviews',
        data: [4, 4.2, 4.5, 4.7, 4.8],
        fill: false,
        borderColor: '#F6AD55',
        tension: 0.4,
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
    <div className="md: ml-64 p-8 font-sans bg-gradient-to-b from-gray-200 to-gray-50 text-gray-700 overflow-hidden">
      <h1 className="text-2xl text-blue-600 mb-4">E-commerce Dashboard: Analytics</h1>

      {/* Product Sales Chart */}
      <div className="mb-8">
        <h3 className="text-xl text-blue-600 mb-3 flex items-center">
          <FaBox className="mr-2" />
          Product Sales Growth
        </h3>
        <div className="w-full h-72 bg-white rounded-lg p-4 shadow-lg">
          <Line data={productData} options={options} />
        </div>
      </div>

      {/* Total Orders Chart */}
      <div className="mb-8">
        <h3 className="text-xl text-green-600 mb-3 flex items-center">
          <FaShoppingCart className="mr-2" />
          Orders Overview
        </h3>
        <div className="w-full h-72 bg-white rounded-lg p-4 shadow-lg">
          <Line data={orderData} options={options} />
        </div>
      </div>

      {/* New Users Chart */}
      <div className="mb-8">
        <h3 className="text-xl text-yellow-600 mb-3 flex items-center">
          <FaUsers className="mr-2" />
          New Users Growth
        </h3>
        <div className="w-full h-72 bg-white rounded-lg p-4 shadow-lg">
          <Line data={userData} options={options} />
        </div>
      </div>

      {/* Complaints Chart */}
      <div className="mb-8">
        <h3 className="text-xl text-red-600 mb-3 flex items-center">
          <FaExclamationCircle className="mr-2" />
          Customer Complaints
        </h3>
        <div className="w-full h-72 bg-white rounded-lg p-4 shadow-lg">
          <Line data={complaintData} options={options} />
        </div>
      </div>

      {/* Reviews Chart */}
      <div>
        <h3 className="text-xl text-orange-600 mb-3 flex items-center">
          <FaStar className="mr-2" />
          Average Customer Reviews
        </h3>
        <div className="w-full h-72 bg-white rounded-lg p-4 shadow-lg">
          <Line data={reviewData} options={options} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ChartPage;
