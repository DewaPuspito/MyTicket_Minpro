'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/app/utils/api/myticket.api';
import Swal from 'sweetalert2';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: 'Error',
        text: 'Enter your email address',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await api.post('/email/reset-password', { email });
      
      if (response.status === 200) {
        localStorage.setItem('resetPasswordEmail', email);
        Swal.fire({
          title: 'Sukses',
          text: 'Please check your email for password reset instructions',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to send password reset instructions. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#002459] to-[#0d1e4a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <Image
            src="/logo-transparent.png"
            alt="MyTicket Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <p className="text-white/90 text-xl font-semibold">Reset Password</p>
          <p className="text-white/70 text-sm">
            Enter your email address and we will send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-white/90 font-medium">Email</label>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 focus-within:border-blue-400 transition">
              <Mail className="text-white/60" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            Send Reset Link
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-white/80">
          <a href="/auth/signin" className="text-white font-semibold underline hover:text-blue-400 transition">
            Back to Login Page
          </a>
        </div>
      </div>
    </div>
  );
}