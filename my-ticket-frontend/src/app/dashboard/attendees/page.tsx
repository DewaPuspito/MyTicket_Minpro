"use client";
import React, { useEffect, useState } from 'react';
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
    qty: number;
  };
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'REJECTED' | 'CANCELLED';
}

const AttendeesTab = () => {
  const [attendees, setAttendees] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/get-transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter hanya transaksi dengan status PAID
      const paidTransactions = response.data.data.filter(
        (transaction: Transaction) => transaction.status === 'PAID'
      );

      setAttendees(paidTransactions); // <- Ini penting!
    } catch (error) {
      toast.error('Gagal mengambil data attendees');
    } finally {
      setIsLoading(false);
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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Event Attendees</h2>
      {attendees.length === 0 ? (
        <p className="text-gray-500">Belum ada peserta yang terverifikasi.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Email</th>
              <th>Event</th>
              <th>Ticket Amount</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{a.user.email}</td>
                <td>{a.event.title}</td>
                <td>{a.ticket.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendeesTab;