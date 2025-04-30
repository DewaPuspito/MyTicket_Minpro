"use client"
import { useState } from 'react';
import { FiMenu, FiUsers, FiBox, FiDollarSign, FiPieChart, FiSettings } from 'react-icons/fi';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dummy data
  const stats = [
    { title: 'Total Users', value: '2,345', icon: <FiUsers className="text-2xl" />, color: 'bg-blue-500' },
    { title: 'Total Products', value: '1,234', icon: <FiBox className="text-2xl" />, color: 'bg-green-500' },
    { title: 'Revenue', value: '$45,678', icon: <FiDollarSign className="text-2xl" />, color: 'bg-purple-500' },
    { title: 'Conversion', value: '3.2%', icon: <FiPieChart className="text-2xl" />, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: '$150', status: 'Completed' },
    { id: '#1235', customer: 'Jane Smith', amount: '$200', status: 'Processing' },
    { id: '#1236', customer: 'Bob Johnson', amount: '$75', status: 'Pending' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { name: 'Dashboard', icon: <FiPieChart /> },
            { name: 'Users', icon: <FiUsers /> },
            { name: 'Products', icon: <FiBox /> },
            { name: 'Settings', icon: <FiSettings /> },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                ${activeTab === item.name.toLowerCase() 
                  ? 'bg-gray-700 text-white' 
                  : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setActiveTab(item.name.toLowerCase())}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white shadow-sm p-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu className="text-xl" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  AD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-gray-500">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-sm mx-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}