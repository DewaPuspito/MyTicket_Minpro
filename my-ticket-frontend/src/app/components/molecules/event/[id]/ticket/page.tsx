"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import api from "@/app/utils/api/myticket.api";
import Image from "next/image";
import { Button } from "@/app/components/atomics/button";
import { Card } from "@/app/components/atomics/card";
import { formatDate } from "@/app/utils/formatter";
import Link from "next/link";

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

interface Voucher {
  code: string;
  discount: number;
}

const availableVouchers: Voucher[] = [
  { code: "DISKON10K", discount: 10000 },
  { code: "DISKON20K", discount: 20000 },
  { code: "DISKON50K", discount: 50000 },
];

const MAX_POINTS = 100;
const POINT_TO_RUPIAH = 10;

export default function TicketPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryCount = parseInt(searchParams.get("count") || "1");
  const queryPrice = parseInt(searchParams.get("price") || "0");

  const [event, setEvent] = useState<Event | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(queryCount);
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
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
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
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

  const handleTicketCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      const limited = Math.max(1, parsed); // minimum 1 saja
      setTicketCount(limited);
    }
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) setPointsUsed(Math.min(MAX_POINTS, Math.max(0, value)));
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voucher =
      availableVouchers.find((v) => v.code === e.target.value) || null;
    setSelectedVoucher(voucher);
  };

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

  const handleSubmit = () => {
    if (!paymentProof) {
      alert("Mohon upload bukti pembayaran terlebih dahulu.");
      return;
    }

    // Simpan data transaksi (dummy logikanya)
    console.log("Konfirmasi pembayaran:");
    console.log("Event ID:", id);
    console.log("Total bayar:", totalPrice);
    console.log("File bukti:", paymentProof);

    // Lanjutkan ke halaman sukses atau invoice
    alert("Pembayaran berhasil dikonfirmasi!");
    router.push("/dashboard/tickets");
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading event data...</p>
      </div>
    );
  }

  const pricePerTicket = queryPrice > 0 ? queryPrice : event.price;
  const priceBeforeDiscount = pricePerTicket * ticketCount;
  const pointDiscount = pointsUsed * POINT_TO_RUPIAH;
  const voucherDiscount = selectedVoucher?.discount || 0;
  const totalPrice = Math.max(
    priceBeforeDiscount - pointDiscount - voucherDiscount,
    0
  );

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
              <input
                type="number"
                className="w-16 border border-gray-300 rounded px-3 py-2 text-center"
                value={ticketCount}
                onChange={handleTicketCountChange}
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Gunakan Poin (max {MAX_POINTS})
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={pointsUsed}
                onChange={handlePointsChange}
                min={0}
                max={MAX_POINTS}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Pilih Kode Voucher
              </label>
              <select
                onChange={handleVoucherChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Tidak menggunakan voucher</option>
                {availableVouchers.map((voucher) => (
                  <option key={voucher.code} value={voucher.code}>
                    {voucher.code} - Rp {voucher.discount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Potongan dari Poin</span>
              <span>- Rp {pointDiscount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Potongan Voucher</span>
              <span>- Rp {voucherDiscount.toLocaleString()}</span>
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
