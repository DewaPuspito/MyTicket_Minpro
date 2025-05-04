"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { events } from "@/data/event";
import { Button } from "@/app/components/atomics/button";
import Image from "next/image";
import { ArrowLeft, CalendarDays, MapPin, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";
import { useEffect, useState } from "react";

const formatPrice = (value: number) => {
  return `Rp. ${value.toLocaleString("id-ID")}`;
};

export default function TicketPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id;
  const count = searchParams.get("count");
  const ticketCount = count ? parseInt(count) : 1;

  const [pointsUsed, setPointsUsed] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  const pointValue = 1000;
  const discountFromPoints = pointsUsed * pointValue;

  const event = events.find((event) => event.id === Number(id));

  const totalPrice = event ? event.price * ticketCount : 0;
  const finalPrice = Math.max(0, totalPrice - discountFromPoints - voucherDiscount);

  useEffect(() => {
    // Contoh: validasi voucher
    if (voucherCode === "DISKON10") {
      const discount = totalPrice * 0.1; // 10% dari total harga
      setVoucherDiscount(discount);
    } else {
      setVoucherDiscount(0);
    }
  }, [voucherCode, totalPrice]);

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center p-6"
      >
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Tidak Ditemukan! 😢</h1>
          <p className="text-lg text-gray-600 mb-8">
            Event yang Anda cari tidak ditemukan atau mungkin telah dihapus.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition-transform hover:scale-105"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-grow">
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 1)}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Summary</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Details */}
            <div className="space-y-6">
              <div className="relative h-64 w-full rounded-xl overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{event.title}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="w-5 h-5" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-indigo-50 p-6 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Ticket className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold">Detail Pesanan</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga per Tiket</span>
                    <span className="font-medium">
                      {event.price ? formatPrice(event.price) : "GRATIS"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah Tiket</span>
                    <span className="font-medium">{ticketCount}</span>
                  </div>

                  {/* Input Poin */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Gunakan Poin</label>
                    <input
                      type="number"
                      value={pointsUsed}
                      onChange={(e) => setPointsUsed(Number(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                      placeholder="Masukkan jumlah poin"
                      min={0}
                    />
                  </div>

                  {/* Input Voucher */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Kode Voucher</label>
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                      placeholder="Masukkan kode voucher"
                    />
                  </div>

                  <div className="border-t border-gray-200 my-4" />

                  <div className="flex justify-between">
                    <span className="text-gray-600">Potongan dari Poin</span>
                    <span className="text-red-500">- {formatPrice(discountFromPoints)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Potongan Voucher</span>
                    <span className="text-red-500">- {formatPrice(voucherDiscount)}</span>
                  </div>

                  <div className="border-t border-gray-200 my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Pembayaran</span>
                    <span className="text-indigo-600">{formatPrice(finalPrice)}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-5 rounded-xl mt-4"
                onClick={() => router.push(`/event/${params.id}/ticket/payment?count=${ticketCount}&finalPrice=${finalPrice}`)
              }
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
