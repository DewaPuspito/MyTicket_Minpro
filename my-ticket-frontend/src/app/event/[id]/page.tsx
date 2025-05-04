"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/app/components/atomics/button";
import Image from "next/image";
import { CalendarDays, MapPin, Clock, Ticket, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";
import { useState, useEffect } from "react";
import api from "@/app/utils/api/myticket.api";


 const formatPrice = (value: number | string) => {
   const number = typeof value === "string" ? Number(value) : value;
   return `Rp. ${number.toLocaleString("id-ID")}`;
 };

 interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  price: number;
  available_seats: number;
  imageURL: string;
  category: string;
}
 
 export default function EventDetailPage() {
  const [ticketCount, setTicketCount] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setUserRole(role || "");
        const response = await api.get(`/event/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.data) {
          setEvent(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  useEffect(() => {
    return () => setIsNavigating(false);
  }, []);

  const handleGetTickets = () => {
    if (!event) return;
    
    if (ticketCount > event.available_seats) {
      alert('Ticket value is greater than available seats');
      return;
    }
    
    setIsNavigating(true);
    router.push(`/event/${id}/ticket?count=${encodeURIComponent(ticketCount)}`);
  };

  const handleDeleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      router.push('/');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again later.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            Event yang Anda cari tidak dapat ditemukan.
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
 
  const increaseTicket = () => {
    if (ticketCount < event.available_seats) {
      setTicketCount((prev) => prev + 1);
    }
  };
 
  const decreaseTicket = () => {
    setTicketCount((prev) => Math.max(1, prev - 1));
  };
 
  const totalPrice = event.price * ticketCount;
  const isMaxTickets = ticketCount === event.available_seats;
 
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
              src={event.imageURL}
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
                    {new Date(event.start_date).toLocaleDateString("id-ID", {
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
                  <span>
                  {event.start_date.split('T')[1].substring(0, 5)}
                  </span>
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
                  {userRole === 'EVENT_ORGANIZER' ? (
                    <>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900">Manajemen Event</h3>
                      </div>
                      <div className="space-y-4">
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-all"
                          onClick={() => router.push(`/event/${id}/edit`)}
                        >
                          Update Event
                        </Button>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl transition-all"
                          onClick={() => router.push(`/event/${id}/voucher/create`)}
                        >
                          Add Voucher
                        </Button>
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl transition-all"
                          onClick={handleDeleteEvent}
                        >
                          Hapus Event
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Ticket className="w-8 h-8 text-indigo-600" />
                        <h3 className="text-xl font-bold text-gray-900">Beli Tiket</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Harga Tiket</span>
                          <span className="font-bold text-gray-900">
                            {formatPrice(totalPrice)}
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
                            disabled={ticketCount >= Math.min(event.available_seats, 10)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl transition-all hover:shadow-lg relative"
                          onClick={handleGetTickets}
                          disabled={isNavigating || event.available_seats === 0}
                        >
                          {isNavigating ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Memproses...
                            </div>
                          ) : event.available_seats === 0 ? (
                            "Tiket Habis"
                          ) : (
                            "Beli Tiket"
                          )}
                        </Button>

                        <div className="text-sm text-center text-gray-500 mt-2">
                          {event.available_seats > 0 ? (
                            <>
                              <span className="font-bold text-indigo-600">
                                {event.available_seats}
                              </span> Tiket Tersisa
                              {isMaxTickets && (
                                <span className="block text-red-500 mt-1">
                                  Anda telah memilih jumlah tiket maksimal yang tersedia
                                </span>
                              )}
                            </>
                          ) : (
                            'Tiket Sudah Habis'
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
   );
 }