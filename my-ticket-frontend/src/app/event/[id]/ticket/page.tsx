"use client";

import { useParams, useRouter } from "next/navigation";
import { events } from "@/data/event";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";
import { CalendarDays, MapPin, Clock, Ticket, User, CreditCard, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function TicketPage() {
    const { id } = useParams();
    const router = useRouter();
    const event = events.find((event) => event.id === Number(id));

    const [ticketCount, setTicketCount] = useState(1);

    if (!event) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center p-6"
            >
                {/* Error Handling */}
                <h1 className="text-3xl font-bold">Event Not Found</h1>
            </motion.div>
        );
    }

    // Helper untuk format harga
    const formatPrice = (price: string) => {
        return `Rp. ${price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

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
                    {/* Header */}
                    <div className="bg-[#00214D] p-8 text-white ">
                        <div className="flex items-center justify-between ">
                            <Button
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl px-6 py-3"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-sm font-medium">Back to Event</span>
                            </Button>
                            <div className="text-right">
                                <h2 className="text-2xl font-bold">Secure Your Spot</h2>
                                {/* <p className="text-indigo-100">Step 1 of 2 - Payment Information</p> */}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
                        {/* Event Summary */}
                        <motion.div variants={fadeIn('right', 'tween', 0.3, 1)}>
                            <div className="border rounded-xl p-6 shadow-sm">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    width={600}
                                    height={400}
                                    className="rounded-lg object-cover mb-6"
                                />
                                <h3 className="text-2xl font-bold mb-4">{event.title}</h3>

                                <div className="space-y-4 text-gray-600">
                                    <div className="flex items-center">
                                        <CalendarDays className="w-5 h-5 mr-3 text-indigo-600" />
                                        <span>{new Date(event.startDate).toLocaleDateString("en-US", { weekday: 'long', year: "numeric", month: "long", day: "numeric" })}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-3 text-indigo-600" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                {/* Ticket Selector */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-medium text-gray-700">Select Number of Tickets</span>
                                        <div className="flex items-center border rounded-lg overflow-hidden">
                                            <Button
                                                type="button"
                                                className="bg-black hover:bg-black-400"
                                                onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="px-6">{ticketCount}</span>
                                            <Button
                                                type="button"
                                                className="bg-black hover:bg-black-400"
                                                onClick={() => setTicketCount(prev => Math.min(event.remainingTickets, prev + 1))}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Total Tickets: {ticketCount}</span>
                                        <span className="text-2xl font-bold text-indigo-600">
                                            {event.price ? formatPrice((Number(event.price.replace(/\./g, "")) * ticketCount).toString()) : 'FREE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Form */}
                        <motion.div variants={fadeIn('left', 'tween', 0.3, 1)}>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Attendee Information</label>
                                    <div className="space-y-4">
                                        <div className="flex items-center border rounded-lg p-3">
                                            <User className="w-5 h-5 text-gray-400 mr-3" />
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center border rounded-lg p-3">
                                            <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                className="w-full outline-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Details</label>
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-3">
                                            <select
                                                className="w-full outline-none"
                                                required
                                            >
                                                <option value="">Select Bank</option>
                                                <option value="BCA">BCA</option>
                                                <option value="BNI">BNI</option>
                                                <option value="Mandiri">Mandiri</option>
                                                <option value="BRI">BRI</option>
                                                <option value="CIMB">CIMB Niaga</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <Button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg rounded-xl transition-all"
                                >
                                    Complete Purchase
                                </Button>

                                <p className="text-center text-sm text-gray-500">
                                    Secured by SSL encryption. Your information is safe with us.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
