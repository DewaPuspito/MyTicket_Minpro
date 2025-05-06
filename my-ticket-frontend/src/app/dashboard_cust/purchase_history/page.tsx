'use client';

import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  eventName: string;
  date: string;
  status: 'waiting for payment' | 'waiting for admin confirmation' | 'done' | 'rejected' | 'expired' | 'canceled';
}

const dummyTransactions: Transaction[] = [
  { id: 1, eventName: 'Jazz Night 2025', date: '2025-05-01', status: 'waiting for payment' },
  { id: 2, eventName: 'Startup Expo', date: '2025-04-20', status: 'waiting for admin confirmation' },
  { id: 3, eventName: 'Music Festival', date: '2025-03-15', status: 'done' },
  { id: 4, eventName: 'Tech Conference', date: '2025-02-10', status: 'rejected' },
  { id: 5, eventName: 'Food Carnival', date: '2025-01-05', status: 'expired' },
  { id: 6, eventName: 'Art Exhibition', date: '2024-12-25', status: 'canceled' },
];

const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'waiting for payment':
      return 'bg-yellow-100 text-yellow-800';
    case 'waiting for admin confirmation':
      return 'bg-blue-100 text-blue-800';
    case 'done':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'expired':
      return 'bg-gray-200 text-gray-800';
    case 'canceled':
      return 'bg-red-200 text-red-900';
    default:
      return '';
  }
};

const HistoryPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulasi fetch dari backend
    setTransactions(dummyTransactions);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Purchase History</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{tx.eventName}</h4>
                <p className="text-gray-600 text-sm">{new Date(tx.date).toLocaleDateString()}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(tx.status)}`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
