"use client";
import { useEffect, useState } from 'react';
import { ClockIcon, CalendarIcon, ExclamationTriangleIcon, BanknotesIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { events } from '@/data/event';
import { useParams } from "next/navigation";
import Link from "next/link";

export default function InvoiceCard() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0
  });

  const { id } = useParams();
  const event = events.find((event) => event.id === Number(id));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            if (prev.hours === 0) {
              clearInterval(timer);
              return prev;
            }
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          }
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Tampilkan loading jika event belum ditemukan
  if (!event) {
    return <div className="text-center mt-10 text-gray-500">Loading event data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          
          <h1 className="text-2xl font-bold text-gray-800">{event.title}</h1> <br />
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <CalendarIcon className="w-5 h-5" />
            <span className="text-sm">{event.startDate}</span>
          </div>

        </div>


        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center gap-3 font-bold">
            <ClockIcon className="w-6 h-6" />
            <span>PAYMENT BEFORE: {`
              ${timeLeft.hours.toString().padStart(2, '0')}:
              ${timeLeft.minutes.toString().padStart(2, '0')}:
              ${timeLeft.seconds.toString().padStart(2, '0')}
            `}</span>
          </div>
        </div>

        {/* Due Date Warning */}
        <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg mb-6">
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationTriangleIcon className="w-5 h-5" />
            <div>
              <p className="font-semibold">Payment Due Date: 14 April 2025 15:00</p>
              <p className="text-sm">Ticket will be canceled automatically after due date</p>
            </div>
          </div>
        </div>

        {/* Bank Transfer Section */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <BanknotesIcon className="w-6 h-6" />
            <h3 className="text-xl font-bold">Bank Transfer</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Invoice Code</p>
              <p className="font-mono text-lg font-bold">#MT125456</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Transfer to</p>
              <p className="font-bold">3209990 a/n MyTicketCompany</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Amount</p>
              <p className="text-3xl font-bold text-black">Rp. 900.000</p>
            </div>
          </div>
        </div>

        {/* Payment Details Table */}
        <div className="mb-8">
          <div className="divide-y divide-gray-200">
            <div className="py-4 flex justify-between">
              <span>Ticket Price</span>
              <span className="font-bold">Rp. 1.000.000</span>
            </div>
            <div className="py-4 flex justify-between">
              <span>Voucher Discount</span>
              <span className="font-bold text-red-500">Rp. 100.000</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center 
          hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <ArrowUpTrayIcon className="w-8 h-8" />
            <p className="font-semibold">Upload Payment Proof</p>
            <p className="text-sm">Drag & drop file or click to browse</p>
          </div>
        </div>
      </div>
    </div>
  );
}
