'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'react-feather';
import { useState, useEffect } from 'react';
import api from '@/app/utils/api/myticket.api';

interface Transaction {
  id: number;
  ticketId: number;
  fixedPrice: number;
  event: {
    title: string;
    start_date: string;
  };
  status: 'PENDING' | 'PAID' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
}

interface Review {
  review: string;
  rating: number;
}

const TicketsContent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review>>({});
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
        setError(
          error.response?.data?.message || 'Gagal mengambil data transaksi'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const today = new Date();

  const isEligibleForReview = (ticketDate: string, status: Transaction['status']) => {
    const eventDate = new Date(ticketDate);
    return status === 'PAID' && eventDate < today;
  };

  const handleReviewChange = (ticketId: string, review: string) => {
    setReviews((prev) => ({ ...prev, [ticketId]: { ...prev[ticketId], review } }));
  };

  const handleRatingChange = (ticketId: string, rating: number) => {
    setReviews((prev) => ({ ...prev, [ticketId]: { ...prev[ticketId], rating } }));
  };

  const handleSubmit = (ticketId: string) => {
    const data = reviews[ticketId];
    if (!data?.review || !data.rating) {
      alert("Harap masukkan review dan rating.");
      return;
    }
    // Simulasi kirim review ke server
    console.log(`Review dikirim untuk tiket ${ticketId}:`, data);
    alert("Terima kasih atas feedback Anda!");
  };

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Tiket Saya</h3>
      <div className="grid grid-cols-1 gap-6">
        {transactions.map((tx) => (
          <div key={tx.id} className="border border-gray-100 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm">
            <div className="flex justify-between">
              <div className="w-full">
                <h4 className="text-lg font-semibold">{tx.event.title}</h4>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-purple-500" />
                    {new Date(tx.event.start_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span>{tx.status}</span>
                </div>

                {isEligibleForReview(tx.event.start_date, tx.status) && (
                  <div className="mt-4 space-y-2">
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                      placeholder="Tulis review..."
                      value={reviews[tx.id]?.review || ''}
                      onChange={(e) => handleReviewChange(tx.id.toString(), e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Rating:</label>
                      <select
                        value={reviews[tx.id]?.rating || 0}
                        onChange={(e) => handleRatingChange(tx.id.toString(), parseInt(e.target.value))}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value={0}>Pilih...</option>
                        {[1, 2, 3, 4, 5].map((val) => (
                          <option key={val} value={val}>
                            {val} ⭐
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSubmit(tx.id.toString())}
                        className="ml-auto bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Kirim Review
                      </button>
                    </div>
                  </div>
                )}

                {!isEligibleForReview(tx.event.start_date, tx.status) && (
                  <p className="mt-4 text-sm italic text-gray-400">
                    Review tersedia setelah menghadiri acara.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TicketsContent;