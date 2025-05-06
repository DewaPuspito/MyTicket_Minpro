'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/app/utils/api/myticket.api';
import Swal from 'sweetalert2';

export default function NewPasswordInputPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const encryptedEmail = searchParams.get('email');

    if (!encryptedEmail) {
      Swal.fire({
        title: 'Error',
        text: 'Please provide an encrypted email',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      router.push('/auth/reset-password/email-confirmation');
      return;
    }

    const email = atob(encryptedEmail);

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Fill in all fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Password tidak cocok',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await api.put('/auth/reset-password', {
        email,
        newPassword
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Sukses',
          text: 'Password berhasil direset',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        router.push('/auth/signin');
      }
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Gagal mereset password',
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
          <p className="text-white/90 text-xl font-semibold">New Password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-white/90 font-medium">New Password</label>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 focus-within:border-blue-400 transition">
              <Lock className="text-white/60" size={20} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Insert new password"
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/90 font-medium">Konfirmasi Password</label>
            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 focus-within:border-blue-400 transition">
              <Lock className="text-white/60" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi password baru"
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
            Reset Password
          </motion.button>
        </form>
      </div>
    </div>
  );
}