"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { events } from "@/data/event";
import { Button } from "@/app/components/atomics/button";
import Image from "next/image";
import { ArrowLeft, CalendarDays, MapPin, Clock, Ticket, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";

const formatPrice = (value: number) => {
  return `Rp. ${value.toLocaleString("id-ID")}`;
};

export default function EventDetailPage() {
  const [ticketCount, setTicketCount] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const event = events.find((event) => event.id === Number(id));

  useEffect(() => {
    return () => setIsNavigating(false);
  }, []);

  const handleGetTickets = () => {
    if (!event) return;
    
    if (ticketCount > event.remainingTickets) {
      alert('Jumlah tiket melebihi kuota yang tersedia');
      return;
    }
    
    setIsNavigating(true);
    router.push(`/event/${id}/ticket?count=${encodeURIComponent(ticketCount)}`);
  };

  const increaseTicket = () => {
    if (event && ticketCount < Math.min(event.remainingTickets, 10)) {
      setTicketCount((prev) => prev + 1);
    }
  };

  const decreaseTicket = () => {
    setTicketCount((prev) => Math.max(1, prev - 1));
  };

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center p-6"
      >
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! 😢</h1>
          <p className="text-lg text-gray-600 mb-8">
            Acara yang Anda cari tidak dapat ditemukan.
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

  const totalPrice = event.price * ticketCount;
  const isMaxTickets = ticketCount === event.remainingTickets;

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-shadow hover:shadow-3xl"
        >
          {/* Banner Section */}
          <div className="relative h-96 w-full group">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h1
                variants={fadeIn('up', 'tween', 0.5, 1)}
                className="text-4xl font-bold mb-4 drop-shadow-2xl"
              >
                {event.title}
              </motion.h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    {new Date(event.startDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <motion.div variants={staggerContainer()} className="p-8 space-y-8">
            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center text-lg text-gray-600">
                  <Clock className="w-6 h-6 mr-3 text-indigo-600" />
                  <span>{event.time}</span>
                </div>
                <div className="prose prose-lg text-gray-600">
                  {event.description}
                </div>
              </div>

              {/* Right Column - Ticket Purchase */}
              <motion.div
                variants={fadeIn('left', 'tween', 0.5, 1)}
                className="bg-indigo-50 p-6 rounded-xl h-fit sticky top-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-8 h-8 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-900">Buy Ticket</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ticket Fee</span>
                      <span className="font-bold text-gray-900">
                        {event.price ? formatPrice(totalPrice) : 'GRATIS'}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-4 my-4">
                      <Button 
                        onClick={decreaseTicket}
                        className="bg-black hover:bg-indigo-200 text-indigo-600 rounded-full px-4 py-2"
                        disabled={ticketCount === 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-bold">{ticketCount}</span>
                      <Button 
                        onClick={increaseTicket}
                        className="bg-black hover:bg-indigo-200 text-indigo-600 rounded-full px-4 py-2"
                        disabled={ticketCount >= Math.min(event.remainingTickets, 10)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl transition-all hover:shadow-lg relative"
                      onClick={handleGetTickets}
                      disabled={isNavigating || event.remainingTickets === 0}
                    >
                      {isNavigating ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Process...
                        </div>
                      ) : event.remainingTickets === 0 ? (
                        "Ticket Sold Out"
                      ) : (
                        "Buy Ticket"
                      )}
                    </Button>

                    <div className="text-sm text-center text-gray-500 mt-2">
                      {event.remainingTickets > 0 ? (
                        <>
                          Remaining <span className="font-bold text-indigo-600">
                            {event.remainingTickets}
                          </span> Ticket
                          {isMaxTickets && (
                            <span className="block text-red-500 mt-1">
                              Anda memilih semua tiket tersisa!
                            </span>
                          )}
                        </>
                      ) : (
                        'Tiket sudah habis terjual'
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}