"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/app/components/atomics/button";
import { Card, CardContent } from "@/app/components/atomics/card";
import Image from "next/image";
import { CalendarDays, MapPin, Clock, Ticket, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";
import { useState, useEffect } from "react";
import api from "@/app/utils/api/myticket.api";
import Navbar from "@/app/components/atomics/navbar";
import { toast } from "react-hot-toast";

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
  vouchers?: Voucher[];
}

interface Voucher {
  id: number;
  title: string;
  code: string;
  discount: number;
  expiry_date: string;
}

interface TicketData {
  id: number;
  qty: number;
  total_price: number;
  event: {
    name: string;
  };
}

export default function EventDetailPage() {
  const [ticketCount, setTicketCount] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [event, setEvent] = useState<Event | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
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
          const voucherResponse = await api.get(`/event/${id}/voucher`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (voucherResponse.data.data) {
            setVouchers(voucherResponse.data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  const handleDeleteVoucher = async (voucherId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus voucher ini?')) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/event/${id}/voucher/${voucherId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setVouchers(vouchers.filter(v => v.id !== voucherId));
      toast.success('Voucher berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus voucher');
    }
  };

  const handleGetTickets = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Anda harus login terlebih dahulu');
      router.push('/login');
      return;
    }

    if (!event) return;
    
    if (ticketCount > event.available_seats) {
      toast.error('Jumlah tiket melebihi kursi yang tersedia');
      return;
    }
    
    setIsNavigating(true);
    
    try {
      const response = await api.post(`/event/${id}/generate-ticket`, {
        qty: ticketCount
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setTicketData(response.data.data);
        setShowTicketModal(true);
        
        // Refresh event data
        const eventResponse = await api.get(`/event/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEvent(eventResponse.data.data);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Gagal membeli tiket';
      toast.error(message);
    } finally {
      setIsNavigating(false);
    }
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
      toast.success('Event deleted successfully');
      router.push('/');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const increaseTicket = () => {
    if (event && ticketCount < event.available_seats) {
      setTicketCount((prev) => prev + 1);
    }
  };

  const decreaseTicket = () => {
    setTicketCount((prev) => Math.max(1, prev - 1));
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
        variants={staggerContainer()}
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

  const totalPrice = event.price * ticketCount;
  const isMaxTickets = ticketCount === event.available_seats;

  return (
    <>
      <Navbar />
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
                  
                  {/* Voucher Section */}
                  <motion.div
                    variants={fadeIn('up', 'tween', 0.6, 1)}
                    className="bg-white shadow-xl rounded-2xl p-6 mt-8"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Voucher Tersedia</h2>
                    </div>

                    {vouchers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {vouchers.map((voucher) => (
                          <Card key={voucher.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg text-gray-800">{voucher.title}</h3>
                              </div>
                              <div className="space-y-2 mt-2">
                                <p className="text-sm text-gray-600">
                                  Kode: <span className="font-mono font-semibold bg-gray-100 px-2 py-1 rounded">{voucher.code}</span>
                                </p>
                                <p className="text-sm text-gray-600">Diskon: <span className="font-semibold">{voucher.discount}%</span></p>
                                <p className="text-sm text-gray-600">
                                  Berlaku sampai: {new Date(voucher.expiry_date).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              {userRole === 'EVENT_ORGANIZER' && (
                                <div className="flex justify-end gap-2 mt-4 border-t pt-4">
                                  <Button
                                    onClick={() => router.push(`/components/molecules/event/${id}/voucher/update-voucher/${voucher.id}`)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex-1"
                                  >
                                    Update Voucher
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteVoucher(voucher.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex-1"
                                  >
                                    Hapus Voucher
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Belum ada voucher tersedia untuk event ini
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right Column - Ticket Purchase */}
                <motion.div
                  variants={fadeIn('left', 'tween', 0.5, 1)}
                  className="bg-indigo-50 p-6 rounded-xl h-fit sticky top-8"
                >
                  <div className="space-y-6">
                    {userRole === 'EVENT_ORGANIZER' ? (
                      <>
                        <div className="space-y-4">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-all"
                            onClick={() => router.push(`/components/molecules/event/${id}/update-event`)}
                          >
                            Update Event
                          </Button>
                          <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl transition-all"
                            onClick={() => router.push(`/components/molecules/event/${id}/voucher/create-voucher`)}
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
                              {formatPrice(event.price)} / tiket
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
                              disabled={ticketCount >= event.available_seats}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-center border-t pt-3">
                            <span className="text-gray-600 font-medium">Total Harga</span>
                            <span className="font-bold text-lg text-indigo-600">
                              {formatPrice(totalPrice)}
                            </span>
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

      {/* Ticket Purchase Modal */}
      {showTicketModal && ticketData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full animate-in fade-in zoom-in-95">
            <h3 className="text-2xl font-bold mb-4">Pembelian Berhasil!</h3>
            <div className="space-y-3">
              <p><span className="font-semibold">Event:</span> {ticketData.event.name}</p>
              <p><span className="font-semibold">Jumlah Tiket:</span> {ticketData.qty}</p>
              <p><span className="font-semibold">Total Harga:</span> {formatPrice(ticketData.total_price)}</p>
            </div>
            <div className="mt-6 flex gap-3">
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => {
                  setShowTicketModal(false);
                  router.push(`/components/molecules/event/${id}/ticket?count=${ticketCount}`);
                }}
              >
                Lanjutkan Transaksi
              </Button>
              <Button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={() => setShowTicketModal(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}