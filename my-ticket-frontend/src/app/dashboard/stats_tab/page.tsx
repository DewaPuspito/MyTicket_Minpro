// StatsTab.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

const StatsTab = ({ statsData }: { statsData: Array<any> }) => {
  return (
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
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#bfdbfe" strokeWidth={2} />
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
                <Bar dataKey="attendees" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsTab;
