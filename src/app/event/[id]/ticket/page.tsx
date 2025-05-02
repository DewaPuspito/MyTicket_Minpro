"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { events } from "@/data/event";
import { Button } from "@/app/components/atomics/button";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";
import {
  CalendarDays,
  MapPin,
  Ticket,
  User,
  ArrowLeft,
  Banknote,
  Smartphone,
  Loader,
  CreditCard,
} from "lucide-react";
import { useState, useEffect } from "react";
import { formatPrice } from "@/app/utils/formatter"; // Pastikan path benar

interface Attendee {
  name: string;
  email: string;
}

export default function TicketPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketCount = Number(searchParams.get("count")) || 1; // Default 1 ticket

  const [attendee, setAttendee] = useState<Attendee>({ name: "", email: "" });
  const [selectedPayment, setSelectedPayment] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    payment?: string;
    attendee?: string;
    referral?: string;
  }>({});

  const event = events.find((event) => event.id === Number(id));

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Validasi payment method
    if (!selectedPayment) {
      newErrors.payment = "Please select payment method";
    }

    // Validasi attendee info
    if (!attendee.name.trim()) newErrors.attendee = "Name is required";
    if (!attendee.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.attendee = "Invalid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/event/${id}/ticket/success`);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateReferral = (code: string) => {
    const validCodes: Record<string, number> = {
      DISKON10: 10,
      EVENT5: 5,
    };
    const upperCode = code.toUpperCase();

    if (validCodes[upperCode]) {
      setDiscount(validCodes[upperCode]);
      setReferralCode("");
    } else {
      setDiscount(0);
      setErrors(prev => ({
        ...prev,
        referral: "Voucher Invalid!"
      }));
    }
  };

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center p-6"
      >
        <h1 className="text-3xl font-bold mb-4">Event Tidak Ditemukan</h1>
        <Button onClick={() => router.push("/")}>
          Kembali ke Beranda
        </Button>
      </motion.div>
    );
  }

  const basePrice = event.price * ticketCount;
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
          className="bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white py-12 px-6">
            <div className="flex items-center justify-between mb-8">
              <Button
                className="btn-secondary gap-2 bg-black"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </Button>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Checkout Process</h2>
                <div className="flex items-center justify-center space-x-4">
                  {[1, 2].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                        ${step === 1 ? "bg-white text-indigo-600" : "bg-indigo-500 text-white"}`}>
                        {step}
                      </div>
                      {step < 2 && <div className="h-px w-12 bg-indigo-300"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-24"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Order Summary */}
            <motion.div variants={fadeIn("right", "tween", 0.3, 1)}>
              <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Ticket className="w-6 h-6 mr-2 text-indigo-600" />
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Tiket x{ticketCount}</span>
                    <span>{formatPrice(event.price)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon ({discount}%)</span>
                      <span>-{formatPrice(basePrice * (discount / 100))}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-4 font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">
                      {formatPrice(discountedPrice)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold mb-4">Event Detail</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CalendarDays className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div variants={fadeIn("left", "tween", 0.3, 1)}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Voucher Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Voucher Code</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter Voucher Code"
                      className="flex-1 border rounded-lg p-3"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                    <Button
                      type="button"
                      className="btn-secondary bg-green-500"
                      onClick={() => validateReferral(referralCode)}
                      disabled={!referralCode.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                  {errors.referral && (
                    <p className="text-red-500 mt-2">{errors.referral}</p>
                  )}
                </div>

                {/* Attendee Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />
                    Attendee Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium mb-3">Attendee : </h4>
                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-2 border-b focus:outline-none"
                            value={attendee.name}
                            onChange={(e) =>
                              setAttendee({ ...attendee, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border-b focus:outline-none"
                            value={attendee.email}
                            onChange={(e) =>
                              setAttendee({ ...attendee, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {errors.attendee && (
                      <p className="text-red-500 mt-2">{errors.attendee}</p>
                    )}
                  </div>
                </div>

                {/* Payment Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="bankTransfer"
                        name="paymentMethod"
                        value="bankTransfer"
                        onChange={() => setSelectedPayment("bankTransfer")}
                      />
                      <label htmlFor="bankTransfer" className="flex items-center">
                        <Banknote className="w-5 h-5 mr-2 text-indigo-600" />
                        Transfer Bank
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="creditCard"
                        onChange={() => setSelectedPayment("creditCard")}
                      />
                      <label htmlFor="creditCard" className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                        Credit Card
                      </label>
                    </div>
                    {errors.payment && (
                      <p className="text-red-500 mt-2">{errors.payment}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="button"
                    className="w-full btn-primary bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg transition-all"
                    onClick={() => router.push(`/event/${id}/ticket/payment`)}
                  >
                    Buy Now
                  </Button>

                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
