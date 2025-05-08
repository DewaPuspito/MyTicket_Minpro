"use client";
import React, { useEffect, useState } from 'react';
import { Check, X, FileText } from 'react-feather';
import { motion } from 'framer-motion';
import api from '@/app/utils/api/myticket.api';
import { toast } from 'react-hot-toast';

interface Transaction {
  id: number;
  user: {
    email: string;
  };
  event: {
    title: string;
  };
  ticket: {
    id: number;
    qty: number;
  };
  fixedPrice: number;
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'REJECTED' | 'CANCELLED';
  paymentProof: string;
}

const TransactionsTab = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await api.get('/get-transactions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response:', response.data);
      setTransactions(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data transaksi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (transactionId: number, status: 'PAID' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/transaction/${transactionId}/status`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.success(`Transaksi berhasil ${status === 'PAID' ? 'disetujui' : 'ditolak'}`);
      fetchTransactions();
    } catch (error) {
      toast.error('Gagal mengupdate status transaksi');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Manajemen Transaksi</h3>

      <div className="overflow-x-auto rounded-xl border border-gray-200/50 shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm font-medium text-gray-500">
              <th className="px-6 py-4 rounded-tl-xl">User</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/30">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-700">{transaction.user.email}</td>
                <td className="px-6 py-4 text-gray-600">{transaction.event.title}</td>
                <td className="px-6 py-4 text-gray-600">{transaction.ticket.qty}</td>
                <td className="px-6 py-4 font-semibold text-blue-600">
                  Rp {transaction.fixedPrice.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-600'
                        : transaction.status === 'PAID'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {transaction.status === 'PENDING' && (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleUpdateStatus(transaction.id, 'PAID')}
                        className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        title="Setujui Transaksi"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(transaction.id, 'REJECTED')}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        title="Tolak Transaksi"
                      >
                        <X size={18} />
                      </button>
                      <a 
                        href={transaction.paymentProof} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Lihat Bukti
                      </a>
                    </div>
                  )}
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