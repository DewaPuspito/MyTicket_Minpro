"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import api from "@/app/utils/api/myticket.api";
import Image from "next/image";
import { Button } from "@/app/components/atomics/button";
import { Card } from "@/app/components/atomics/card";
import { formatDate } from "@/app/utils/formatter";

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  start_date: string;
  location: string;
  imageURL: string;
  price: number;
}

export default function TicketPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryCount = parseInt(searchParams.get("count") || "1");
  const queryPrice = parseInt(searchParams.get("price") || "0");

  const [event, setEvent] = useState<Event | null>(null);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(2 * 60 * 60); // 2 hours in seconds
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(response.data.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setEvent(null);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleRemovePreview = () => {
    setPaymentProof(null);
    setPreviewURL(null);
  };

  const handleSubmit = async () => {
    if (!paymentProof) {
      alert("Mohon upload bukti pembayaran terlebih dahulu.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu");
        router.push("/auth/signin");
        return;
      }

      const formData = new FormData();
      formData.append("paymentProof", paymentProof);
      formData.append("fixedPrice", totalPrice.toString());
      formData.append("status", "PENDING");
      formData.append("qty", queryCount.toString());
      
      if (voucherCode) {
        formData.append("vouchers", JSON.stringify([{ code: voucherCode }]));
      }
      
      if (couponCode) {
        formData.append("coupons", JSON.stringify([{ code: couponCode }]));
      }

      const response = await api.post(`/ticket/${id}/create-transaction`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Transaksi berhasil dibuat! Menunggu konfirmasi dari event organizer.");
        router.push("/dashboard_cust");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Terjadi kesalahan saat membuat transaksi");
    }
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading event data...</p>
      </div>
    );
  }

  const pricePerTicket = queryPrice > 0 ? queryPrice : event.price;
  const totalPrice = pricePerTicket * queryCount;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded text-center text-lg font-semibold">
        ⏳ Waktu Tersisa untuk Pembayaran: {formatTime(timeLeft)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <Image
            src={event.imageURL}
            alt={event.title}
            width={600}
            height={300}
            className="rounded-xl object-cover w-full h-64"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <div className="flex items-center mt-2 text-gray-600">
              📅 <span className="ml-2">{formatDate(event.start_date)}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              📍 <span className="ml-2">{event.location}</span>
            </div>
          </div>
        </Card>

        <Card className="bg-blue-50 p-6">
          <h2 className="text-xl font-bold mb-4">🎟️ Detail Pesanan</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Harga per Tiket</span>
              <span className="font-semibold">
                Rp {pricePerTicket.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Jumlah Tiket</span>
              <span className="font-semibold">{queryCount}</span>
            </div>

            {/* Form Voucher */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Kode Voucher
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Masukkan kode voucher"
              />
            </div>

            {/* Form Coupon */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Kode Kupon
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Masukkan kode kupon"
              />
            </div>

            <hr />
            <div className="flex justify-between text-xl font-bold text-blue-700">
              <span>Total Pembayaran</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>

            {/* Upload Bukti Transfer */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Upload Bukti Transfer
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500"
              />
              {previewURL && (
                <div className="mt-3 relative w-fit">
                  <button
                    onClick={handleRemovePreview}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md -translate-y-1/2 translate-x-1/2"
                    title="Hapus Preview"
                  >
                    &times;
                  </button>
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <Image
                    src={previewURL}
                    alt="Preview Bukti Pembayaran"
                    width={400}
                    height={250}
                    className="rounded border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Konfirmasi Pembayaran
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}