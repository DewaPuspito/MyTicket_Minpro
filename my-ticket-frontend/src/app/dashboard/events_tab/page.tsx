'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Calendar } from 'react-feather';

interface Event {
  id: number;
  title: string;
  userId: number;
}

const EventsTab = ({ events }: { events: Event[] }) => {
  return (
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
        {events.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.005 }}
            className="group border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/50 to-purple-50/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1.5">{event.title}</h4>
                <div className="flex items-center text-sm text-gray-600 space-x-3">
                  <span className="flex items-center bg-white px-2.5 py-1 rounded-full shadow-sm">
                    <Calendar size={14} className="mr-1.5 text-blue-500" />
                    Tanggal belum tersedia
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="bg-white px-2.5 py-1 rounded-full shadow-sm">Lokasi tidak diketahui</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    0 tickets sold
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
  );
};

export default EventsTab;