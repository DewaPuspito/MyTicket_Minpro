'use client';

import api from "@/app/utils/api/myticket.api";
import { Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role: role === 'promotor' ? 'EVENT_ORGANIZER' : 'CUSTOMER',
        referralCode: referralCode || undefined
      });

      if (response.data.success) {
        alert('Registrasi berhasil! Silakan login.');
        router.push('./signin');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Terjadi kesalahan saat registrasi');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#002459] to-[#0d1e4a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <Image
            src="/logo-transparent.png"
            alt="Eventify Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <p className="text-white/90 text-xl font-semibold">Create Your Account</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm text-white/90 font-medium">Full Name</label>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 focus-within:border-blue-400 transition">
              <User className="text-white/60" size={20} />
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-white/90 font-medium">Email</label>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 focus-within:border-blue-400 transition">
              <Mail className="text-white/60" size={20} />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm text-white/90 font-medium">Password</label>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 focus-within:border-blue-400 transition">
              <Lock className="text-white/60" size={20} />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="text-sm text-white/90 font-medium">Register As</label>
            <div className="relative">
              <select
                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 appearance-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>Select Role</option>
                <option value="customer" className="text-black">Customer</option>
                <option value="promotor" className="text-black">Promotor</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">
                ▼
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="space-y-1">
            <label className="text-sm text-white/90 font-medium">Referral Code (Optional)</label>
            <input
              type="text"
              placeholder="Enter Referral Code"
              className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 placeholder-white/60 focus:outline-none focus:border-blue-400"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            Register
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 space-y-3 text-center text-sm text-white/80">
          <p>
            Already Have An Account?{" "}
            <a href="./signin" className="text-white font-semibold underline hover:text-blue-400 transition">
              Login
            </a>
          </p>
          <p>
            Forgot Password?{" "}
            <a href="#" className="text-white font-semibold underline hover:text-red-400 transition">
              Reset Password
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-10">
          <div className="h-px bg-white/20 my-6" />
          <p className="text-center text-white/70 text-sm mb-2">
            Never miss your favorite events again.
          </p>
          <p className="text-center text-white/60 text-xs">
            Join and experience the ease of transactions and event management with myTicket.
          </p>
        </div>
      </div>
    </div>
  );
}
