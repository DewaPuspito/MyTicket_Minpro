"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts';
import { Calendar, Users, PieChart, Settings, Bell, Search, Plus, Edit3, Check, X, FileText, Tag } from 'react-feather';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('events');
  const [isMounted, setIsMounted] = useState(false);

  // Mock Data
  const events = [
    { id: 1, name: 'Heart2Heart Concert', date: '2025-05-15', location: 'Jakarta', ticketsSold: 1500, status: 'active' },
    { id: 2, name: 'Tech Summit 2025', date: '2025-06-20', location: 'Bandung', ticketsSold: 850, status: 'active' },
  ];

  const transactions = [
    { id: 1, user: 'john@example.com', event: 'Heart2Heart', amount: 2, total: 'Rp 1.000.000', status: 'pending', proof: 'proof1.jpg' },
    { id: 2, user: 'sarah@mail.com', event: 'Tech Summit', amount: 1, total: 'Rp 500.000', status: 'accepted', proof: 'proof2.jpg' },
  ];

  const statsData = [
    { month: 'Jan', sales: 4000, attendees: 2400 },
    { month: 'Feb', sales: 3000, attendees: 1398 },
    // ... other months
  ];

  // Handle component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update activeTab from localStorage on mount
  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  // Persist activeTab to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab, isMounted]);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Enhanced Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl border-r border-white/10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            Event Manager Pro
          </h2>
          <nav className="space-y-1">
            {[
              { id: 'events', icon: <Tag size={18} className="text-blue-400" />, label: 'Events' },
              { id: 'transactions', icon: <FileText size={18} className="text-purple-400" />, label: 'Transactions' },
              { id: 'stats', icon: <PieChart size={18} className="text-green-400" />, label: 'Analytics' },
              { id: 'attendees', icon: <Users size={18} className="text-yellow-400" />, label: 'Attendees' },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center w-full p-3.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-sm w-96 ring-1 ring-gray-200/50 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search events, transactions..."
              className="ml-3 flex-1 outline-none placeholder-gray-400 bg-transparent text-gray-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-blue-600 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border-2 border-blue-600/30 flex items-center justify-center shadow-sm hover:shadow-md transition-all">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {activeTab === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Managed Events</h3>
                <button className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  <Plus size={18} className="mr-2" />
                  New Event
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {events.map(event => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.005 }}
                    className="group border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/50 to-purple-50/50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1.5">{event.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-3">
                          <span className="flex items-center bg-white px-2.5 py-1 rounded-full shadow-sm">
                            <Calendar size={14} className="mr-1.5 text-blue-500" />
                            {event.date}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="bg-white px-2.5 py-1 rounded-full shadow-sm">{event.location}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                            {event.ticketsSold} tickets sold
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-blue-600 p-2 rounded-lg bg-white shadow-sm hover:shadow-md">
                        <Edit3 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'transactions' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Transaction Management</h3>

              <div className="overflow-x-auto rounded-xl border border-gray-200/50 shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="px-6 py-4 rounded-tl-xl">User</th>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Qty</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/30">
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-700">{transaction.user}</td>
                        <td className="px-6 py-4 text-gray-600">{transaction.event}</td>
                        <td className="px-6 py-4 text-gray-600">{transaction.amount}</td>
                        <td className="px-6 py-4 font-semibold text-blue-600">{transaction.total}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            transaction.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                            transaction.status === 'accepted' ? 'bg-green-100 text-green-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                              <Check size={18} />
                            </button>
                            <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                              <X size={18} />
                            </button>
                            <button className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-sm font-medium">
                              View Proof
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Event Analytics</h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white border border-gray-200/50 rounded-xl px-4 py-2 shadow-sm">
                  <select className="outline-none text-gray-700 bg-transparent">
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200/50 rounded-xl px-4 py-2 shadow-sm">
                  <select className="outline-none text-gray-700 bg-transparent">
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl border border-gray-200/30 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4">Sales Performance</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={statsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stroke="#3b82f6"
                          fill="#bfdbfe"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl border border-gray-200/30 shadow-sm">
                  <h4 className="text-lg font-semibold mb-4">Attendee Overview</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Bar
                          dataKey="attendees"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
