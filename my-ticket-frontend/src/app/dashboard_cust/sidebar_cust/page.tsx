'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6 space-y-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Customer Dashboard</h2>

      <button
        onClick={() => setActiveTab('tickets')}
        className={`block w-full text-left px-4 py-2 rounded-lg transition ${
          activeTab === 'tickets' ? 'bg-white text-gray-800' : 'hover:bg-white/10'
        }`}
      >
        My Tickets
      </button>

      <button
        onClick={() => setActiveTab('purchase history')}
        className={`block w-full text-left px-4 py-2 rounded-lg transition ${
          activeTab === 'purchase history' ? 'bg-white text-gray-800' : 'hover:bg-white/10'
        }`}
      >
        Purchase History
      </button>

      <button
        onClick={() => router.push('/')}
        className="block w-full text-left px-4 py-2 rounded-lg mt-4 bg-blue-500 hover:bg-blue-600 text-white transition"
      >
        See Another Event
      </button>
    </div>
  );
};

export default Sidebar;