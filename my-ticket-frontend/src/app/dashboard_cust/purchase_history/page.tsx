'use client';

import { useEffect, useState } from 'react';
import api from '@/app/utils/api/myticket.api';

interface Ticket {
  eventId: number;
  event: {
    title: string;
    start_date: string;
  };
  ticket: {
    qty: number;
  };
  status: 'PENDING' | 'PAID' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
  fixedPrice: number;
}

const getStatusColor = (status: Ticket['status']) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'PAID':
      return 'bg-green-100 text-green-800';
    case 'REJECTED':
      return 'bg-red-100 text-red-800';
    case 'EXPIRED':
      return 'bg-gray-200 text-gray-800';
    case 'CANCELLED':
      return 'bg-red-200 text-red-900';
    default:
      return '';
  }
};

const getStatusLabel = (status: Ticket['status']) => {
  switch (status) {
    case 'PENDING':
      return 'PENDING';
    case 'PAID':
      return 'PAID';
    case 'REJECTED':
      return 'REJECTED';
    case 'EXPIRED':
      return 'EXPIRED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      return status;
  }
};

const HistoryPage = () => {
  const [transactions, setTransactions] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token tidak ditemukan. Silakan login kembali.');
          return;
        }

        const response = await api.get('/get-transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setTransactions(response.data.data);
        }
      } catch (error: any) {
        setError(error.response?.data?.message || 'Gagal mengambil data transaksi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Pembelian</h3>
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Belum ada riwayat transaksi
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div key={index} className="border rounded-xl p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{tx.event.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(tx.event.start_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Jumlah Tiket: {tx.ticket?.qty}
                  </p>
                  <p className="text-sm text-gray-700">
                    Total Harga: Rp {tx.fixedPrice.toLocaleString('id-ID')}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(tx.status)}`}
                >
                  {getStatusLabel(tx.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;