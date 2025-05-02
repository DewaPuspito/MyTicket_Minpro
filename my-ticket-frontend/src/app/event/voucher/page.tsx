<<<<<<< HEAD:src/app/my-ticket/page.tsx
import Image from "next/image";

interface EVoucherCardProps {
  eventName: string;
  buyDate: string;
  transactionCode: string;
  ticketAmount: number;
  imageUrl: string;
}

export default function EVoucherCard({
  eventName,
  buyDate,
  transactionCode,
  ticketAmount,
  imageUrl,
}: EVoucherCardProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Ticket E-Voucher</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Image */}
        <div className="w-full md:w-1/3">
          <Image
            src={imageUrl}
            alt="Event Poster"
            width={400}
            height={250}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div>
            <p className="text-sm text-gray-600">Event :</p>
            <p className="text-md font-semibold">{eventName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Buy Date :</p>
            <p className="text-md font-semibold">{buyDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Transaction Code :</p>
            <p className="text-md font-semibold">{transactionCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Ticket Amount :</p>
            <p className="text-md font-semibold">{ticketAmount}</p>
          </div>
        </div>

        {/* E-Voucher Button */}
        <div className="mt-4 md:mt-0">
          <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg">
            E - Voucher
          </button>
        </div>
      </div>
    </div>
  );
}
=======
"use client";
import { TicketIcon, CalendarIcon, HashtagIcon, QrCodeIcon } from '@heroicons/react/24/outline';

export default function TicketPage() {
  const ticketDetails = {
    eventName: "Heart2heart",
    transactionCode: "#xxyyyzzz123456",
    buyDate: "13 April 2025",
    ticketAmount: "1",
    voucherCode: "EV-7890-ABCD-1234"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 text-white">
          <div className="flex items-center gap-3">
            <TicketIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">E-Voucher Ticket</h1>
          </div>
        </div>

        {/* Ticket Content */}
        <div className="p-6 space-y-6">
          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <HashtagIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Transaction Code</p>
                <p className="font-mono font-bold text-lg">{ticketDetails.transactionCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Buy Date</p>
                <p className="font-medium">{ticketDetails.buyDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Event</p>
                <p className="font-bold text-lg text-pink-600">{ticketDetails.eventName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ticket Amount</p>
                <p className="font-bold text-lg">{ticketDetails.ticketAmount}</p>
              </div>
            </div>
          </div>

          {/* Voucher Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <QrCodeIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-sm text-gray-500 mb-2">E-Voucher Code</p>
            <p className="font-mono text-xl font-bold text-gray-800">{ticketDetails.voucherCode}</p>
            <div className="mt-4 text-sm text-gray-500">
              Scan this code at event entrance
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-500">
            <p>This is your digital ticket</p>
            <p>Present this voucher for event entry</p>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> b802585e56f6e732c53282d6dbf36c9ce90427d9:my-ticket-frontend/src/app/event/voucher/page.tsx
