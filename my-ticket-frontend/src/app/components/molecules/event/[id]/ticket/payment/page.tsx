"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import api from "@/app/utils/api/myticket.api";
import { formatDate } from "@/app/utils/formatter";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  start_date: string;
  location: string;
  price: number;
  imageURL?: string;
}

const PaymentCheckoutPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const pointDiscount = parseInt(searchParams.get("points") || "0");
  const voucherDiscount = parseInt(searchParams.get("voucher") || "0");
  const ticketCount = parseInt(searchParams.get("count") || "1");
  const totalPrice = parseInt(searchParams.get("total") || "0");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/event/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(res.data.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handlePaymentExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePaymentExpired = () => {
    alert("Waktu pembayaran habis.");
    router.push(`/event/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Konfirmasi Pembayaran</h1>

      {event && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Event Info + Ringkasan */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h2 className="text-xl font-semibold">🗓️ Detail Event & Ringkasan Pembayaran</h2>

              {event.imageURL && (
                <Image
                  src={event.imageURL}
                  alt={event.title}
                  width={600}
                  height={300}
                  className="rounded-lg w-full object-cover"
                />
              )}

              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-gray-600">{formatDate(event.start_date)}</p>
                <p className="text-gray-600">{event.location}</p>
                <p className="mt-2 text-sm text-gray-500">Jumlah Tiket: {ticketCount}</p>
              </div>

              <hr className="my-2" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {(event.price * ticketCount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Potongan Poin</span>
                  <span>- Rp {pointDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Potongan Voucher</span>
                  <span>- Rp {voucherDiscount.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-indigo-700 text-lg">
                  <span>Total Bayar</span>
                  <span>Rp {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timer & Upload */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">⏰ Waktu Tersisa</h2>
              <p className="text-3xl font-bold text-red-600">{formatTime(timeLeft)}</p>
              <p className="text-sm text-gray-500 mt-2">Bayar sebelum waktu habis</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">📤 Upload Bukti Pembayaran</h2>
              <input
                type="file"
                accept="image/*"
                className="block w-full p-2 border rounded-lg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPaymentProof(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm mb-2 text-gray-500">Preview:</p>
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full rounded-lg object-cover shadow"
                    />
                    <button
                      onClick={() => {
                        setPaymentProof(null);
                        setPreviewImage(null);
                      }}
                      className="absolute top-2 right-2 bg-white text-red-600 hover:text-red-800 rounded-full p-1 shadow"
                      title="Hapus gambar"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => alert("Pembayaran dikonfirmasi!")}
              disabled={isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition disabled:opacity-50"
            >
              Konfirmasi Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCheckoutPage;
