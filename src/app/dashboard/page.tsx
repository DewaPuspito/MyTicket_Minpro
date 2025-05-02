"use client"
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';
import { Calendar, Users, PieChart, Settings, Bell, Search, Plus, Edit3, Check, X, FileText, Tag } from 'react-feather';
import  { User } from 'lucide-react';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    name: string;
    date: string;
    location: string;
    ticketsSold: number;
    status: string
  } | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-r from-[#002459] to-[#0d1e4a] shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-8">Event Management</h2>
          <nav className="space-y-2">
            {[
              { id: 'events', icon: <Tag size={18} />, label: 'Events' },
              { id: 'transactions', icon: <FileText size={18} />, label: 'Transactions' },
              { id: 'stats', icon: <PieChart size={18} />, label: 'Analytics' },
              { id: 'attendees', icon: <Users size={18} />, label: 'Attendees' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-blue-100 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm w-96 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search events, transactions..."
              className="ml-3 flex-1 outline-none placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-blue-600">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {activeTab === 'events' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Managed Events</h3>
                <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center shadow-md hover:bg-blue-700 transition-colors">
                  <Plus size={18} className="mr-2" />
                  New Event
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {events.map(event => (
                  <div key={event.id} className="group border rounded-xl p-5 hover:shadow-md transition-all bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1.5">{event.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-3">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1.5" />
                            {event.date}
                          </span>
                          <span>•</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-3 flex items-center">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {event.ticketsSold} tickets sold
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-blue-600 p-2 rounded-lg">
                        <Edit3 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Transaction Management</h3>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Qty</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{transaction.user}</td>
                        <td className="px-6 py-4">{transaction.event}</td>
                        <td className="px-6 py-4">{transaction.amount}</td>
                        <td className="px-6 py-4 font-semibold">{transaction.total}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${transaction.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                              transaction.status === 'accepted' ? 'bg-green-100 text-green-600' :
                                'bg-red-100 text-red-600'
                            }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button className="text-green-600 hover:text-green-700 p-1.5 rounded-md hover:bg-green-50">
                              <Check size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50">
                              <X size={18} />
                            </button>
                            <button className="text-blue-600 hover:text-blue-700 p-1.5 rounded-md hover:bg-blue-50">
                              View Proof
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Event Analytics</h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm">
                  <select className="outline-none text-gray-700">
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow-sm">
                  <select className="outline-none text-gray-700">
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <h4 className="text-lg font-semibold mb-4">Sales Performance</h4>
                  <LineChart width={400} height={200} data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        background: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <h4 className="text-lg font-semibold mb-4">Attendee Overview</h4>
                  <BarChart width={400} height={200} data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        background: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar
                      dataKey="attendees"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;