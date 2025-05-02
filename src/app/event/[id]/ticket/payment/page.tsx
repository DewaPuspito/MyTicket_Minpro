"use client";
import { useEffect, useState } from 'react';
import { ClockIcon, CalendarIcon, ExclamationTriangleIcon, BanknotesIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { events } from '@/data/event';
import { useParams } from "next/navigation";
import { motion } from 'framer-motion';

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

  if (!event) {
    return <div className="text-center mt-10 text-gray-500">Loading event data...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white py-12 px-6">

          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-purple-200" />
            <span className="font-medium">{event.startDate}</span>
            {event.location && (
              <>
                <span className="text-purple-200">•</span>
                <span className="text-purple-200">{event.location}</span>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Countdown Timer */}
          <div className="bg-red-800 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <ClockIcon className="w-7 h-7" />
                <span className="text-lg font-semibold">PAYMENT TIMER</span>
              </div>
              <div className="flex gap-4 text-2xl font-mono font-bold">
                <span className="bg-white/10 p-3 rounded-lg">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                :
                <span className="bg-white/10 p-3 rounded-lg">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                :
                <span className="bg-white/10 p-3 rounded-lg">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Alert */}
          <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl flex items-start gap-4">
            <ExclamationTriangleIcon className="w-7 h-7 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">Payment Due Date</h3>
              <p className="text-red-500">Please Pay Before Timer runs Out • Automatic cancellation after due</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <BanknotesIcon className="w-7 h-7 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500">Invoice Code</span>
                  <span className="font-mono font-bold text-indigo-600">#MT125456</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500">Bank Account</span>
                  <span className="font-bold">3209990 a/n MyTicketCompany</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="text-3xl font-bold text-gray-800">Rp 900.000</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="divide-y divide-gray-200">
                <div className="py-4 flex justify-between items-center hover:bg-gray-50 px-3 rounded-lg">
                  <span>Ticket Price</span>
                  <span className="font-medium">Rp 1.000.000</span>
                </div>
                <div className="py-4 flex justify-between items-center hover:bg-gray-50 px-3 rounded-lg">
                  <span className="text-red-500">Voucher Discount</span>
                  <span className="font-medium text-red-500">- Rp 100.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="group border-2 border-dashed border-gray-300 rounded-xl p-8 text-center 
            transition-all hover:border-green-500 hover:bg-green-50 cursor-pointer
            hover:shadow-md">
            <div className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-green-600">
              <ArrowUpTrayIcon className="w-10 h-10 mb-3 transition-transform group-hover:scale-110" />
              <p className="text-lg font-semibold">Upload Payment Proof</p>
              <p className="text-sm">PNG, JPG, or PDF (Max 5MB)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}