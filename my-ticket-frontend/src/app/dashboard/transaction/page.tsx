// TransactionsTab.tsx
import React from 'react';
import { Check, X, FileText } from 'react-feather';
import { motion } from 'framer-motion';

const TransactionsTab = ({ transactions }: { transactions: Array<any> }) => {
  return (
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
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-700">{transaction.user}</td>
                <td className="px-6 py-4 text-gray-600">{transaction.event}</td>
                <td className="px-6 py-4 text-gray-600">{transaction.amount}</td>
                <td className="px-6 py-4 font-semibold text-blue-600">{transaction.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.status === 'pending'
                        ? 'bg-amber-100 text-amber-600'
                        : transaction.status === 'accepted'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
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
  );
};

export default TransactionsTab;
