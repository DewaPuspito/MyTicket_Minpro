"use client";

import { useParams, useRouter } from "next/navigation";
import { events } from "@/data/event";
import { Button } from "@/app/components/atomics/button";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";
import {
  CalendarDays,
  MapPin,
  Ticket,
  User,
  CreditCard,
  ArrowLeft,
  Banknote,
  Smartphone,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TicketPage() {
  const { id } = useParams();
  const router = useRouter();
  const event = events.find((event) => event.id === Number(id));
  const [ticketCount, setTicketCount] = useState(1);
  const [attendees, setAttendees] = useState<
    Array<{ name: string; email: string }>
  >([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [referralError, setReferralError] = useState("");

  useEffect(() => {
    setAttendees(Array(ticketCount).fill({ name: "", email: "" }));
  }, [ticketCount]);

  const validateReferral = (code: string) => {
    const validCodes: Record<string, number> = {
      DISKON10: 10,
      EVENT5: 5,
    };
    const upperCode = code.toUpperCase();
    if (validCodes[upperCode]) {
      setDiscount(validCodes[upperCode]);
      setReferralError("");
    } else {
      setDiscount(0);
      setReferralError("Wrong code. Please try again.");
    }
  };

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center p-6"
      >
        <h1 className="text-3xl font-bold">Event Not Found</h1>
      </motion.div>
    );
  }

  const formatPrice = (price: string) =>
    `Rp. ${price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  const basePrice =
    Number(event.price.toString().replace(/\./g, "")) * ticketCount;
  const discountedPrice = basePrice - basePrice * (discount / 100);

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn("up", "tween", 0.4, 1)}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-shadow hover:shadow-3xl"
        >
          <div className="bg-[#00214D] p-8 text-white">
            <div className="flex items-center justify-between">
              <Button
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl px-6 py-3"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Event</span>
              </Button>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Checkout Process</h2>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center text-indigo-200">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                      1
                    </div>
                    <span className="ml-2">Ticket Details</span>
                  </div>
                  <div className="h-px w-12 bg-indigo-300"></div>
                  <div className="flex items-center text-indigo-200">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                      2
                    </div>
                    <span className="ml-2">Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Order Summary */}
            <motion.div variants={fadeIn("right", "tween", 0.3, 1)}>
              <div className="border rounded-xl p-6 shadow-sm bg-indigo-50">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Ticket className="w-6 h-6 mr-2 text-indigo-600" />
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tickets x{ticketCount}</span>
                    <span className="font-medium">
                      {formatPrice(event.price.toString())}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>
                        -
                        {formatPrice(
                          (basePrice * (discount / 100)).toString()
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-indigo-600">
                      {formatPrice(discountedPrice.toString())}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold mb-4">Event Details</h4>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <CalendarDays className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                      <span className="flex-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div variants={fadeIn("left", "tween", 0.3, 1)}>
              <form className="space-y-8">
                {/* Referral Code Input */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Voucher Code</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter referral code"
                      className="w-full border rounded-lg p-3 bg-gray-50 outline-none"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={() => validateReferral(referralCode)}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && !referralError && (
                    <p className="mt-2 text-green-600 font-medium">
                      Voucher applied! {discount}% discount.
                    </p>
                  )}
                  {referralError && (
                    <p className="mt-2 text-red-600 font-medium">
                      {referralError}
                    </p>
                  )}
                </div>

                {/* Attendee Info */}
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <User className="w-6 h-6 mr-2 text-indigo-600" />
                    Attendee Information
                  </h3>

                  <div className="space-y-6">
                    {attendees.map((_, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border shadow-sm"
                      >
                        <h4 className="font-medium mb-4 text-gray-700">
                          Attendee #{index + 1}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                            <User className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="w-full outline-none bg-transparent"
                              required
                              value={attendees[index]?.name}
                              onChange={(e) => {
                                const newAttendees = [...attendees];
                                newAttendees[index].name = e.target.value;
                                setAttendees(newAttendees);
                              }}
                            />
                          </div>
                          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
                            <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                              type="email"
                              placeholder="Email Address"
                              className="w-full outline-none bg-transparent"
                              required
                              value={attendees[index]?.email}
                              onChange={(e) => {
                                const newAttendees = [...attendees];
                                newAttendees[index].email = e.target.value;
                                setAttendees(newAttendees);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Banknote className="w-6 h-6 mr-2 text-indigo-600" />
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {["BCA", "Mandiri", "Gopay", "OVO"].map((method) => (
                      <div
                        key={method}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          selectedPayment === method
                            ? "border-indigo-500 bg-indigo-50"
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPayment(method)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 mr-3 flex items-center justify-center rounded-full ${
                              selectedPayment === method
                                ? "bg-indigo-500 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            {method === "Gopay" || method === "OVO" ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Banknote className="w-4 h-4" />
                            )}
                          </div>
                          <span className="font-medium">{method}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl transition-all hover:shadow-lg"
                  onClick={() => router.push(`/event/${id}/ticket/payment`)}
                >
                  Get Tickets Now
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
