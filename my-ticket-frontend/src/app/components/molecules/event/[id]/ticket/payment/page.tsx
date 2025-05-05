'use client';
import { useEffect, useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { events } from '@/data/event';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function InvoiceCard() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [invoiceCode, setInvoiceCode] = useState('');

  const { id } = useParams();
  const searchParams = useSearchParams();

  const count = parseInt(searchParams.get("count") || "1");
  const finalPrice = parseInt(searchParams.get("finalPrice") || "0");

  const event = events.find((event) => event.id === Number(id));
  const originalPrice = event ? event.price * count : 0;
  const youSave = event ? originalPrice - finalPrice : 0;

  const generateInvoiceCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '#';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInvoiceCode(code);
  };

  useEffect(() => {
    generateInvoiceCode();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      alert(`Payment proof ${selectedFile.name} successfully uploaded.`);
    } else {
      alert('Please select a file first.');
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="animate-pulse text-2xl font-bold text-gray-600">Loading Event...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden
        border-8 border-white/20 backdrop-blur-lg min-h-[80vh] landscape:min-h-[60vh]"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-900 p-8 text-white">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold drop-shadow-md">{event.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <CalendarIcon className="w-6 h-6 text-blue-200" />
              <span className="font-medium">
                {new Date(event.startDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Left */}
          <div className="space-y-6">
            {/* Payment Info (Bank + Invoice) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <BanknotesIcon className="w-8 h-8 text-green-600" />
                <h3 className="text-lg font-bold">Bank Transfer</h3>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-bold text-xl">320 9990</p>
                <p className="text-sm text-gray-500">BCA Virtual Account</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-blue-800">
                <p className="text-sm">Invoice Code</p>
                <p className="text-lg font-bold">{invoiceCode}</p>
              </div>
            </div>

            {/* Payment Deadline + Price */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
              {/* Payment Deadline (Merah) */}
              <div className="flex items-center gap-4 text-red-600">
                <ClockIcon className="w-8 h-8" />
                <div>
                  <p className="text-lg font-semibold">Payment Deadline</p>
                  <p className="font-mono text-2xl font-bold">
                    {timeLeft.hours.toString().padStart(2, '0')}:
                    {timeLeft.minutes.toString().padStart(2, '0')}:
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>

              {/* Price Breakdown (Dinamis) */}
              <div className="border-t pt-4 space-y-2 text-black">
                <div className="flex justify-between">
                  <p className="text-sm">Original Price</p>
                  <p className="line-through text-lg">
                    Rp {originalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">You Save</p>
                  <p className="text-green-600 font-bold">
                    Rp {youSave.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <p className="text-sm font-semibold">Total Payment</p>
                  <p className="text-xl font-bold">
                    Rp {finalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Upload Payment Proof */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="border-3 border-dashed border-gray-200 rounded-2xl p-6 text-center bg-white hover:border-green-400 transition-all cursor-pointer"
            >
              <div className="space-y-4">
                <div className="inline-flex p-4 bg-green-100 rounded-full">
                  <ArrowUpTrayIcon className="w-8 h-8 text-green-600 animate-bounce" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-gray-800 mb-1">
                    Upload Payment Proof
                  </p>
                  <p className="text-sm text-gray-500">
                    Drag & drop files or <span className="text-green-600">browse</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Supported formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 mt-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  Submit Payment Proof
                </button>
                <a
                  href="/"
                  className="block w-full mt-3 text-center py-3 bg-gray-100 text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Back to Home Page
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
