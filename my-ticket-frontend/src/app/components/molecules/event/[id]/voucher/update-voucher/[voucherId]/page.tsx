'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from "@/app/utils/api/myticket.api";

export default function UpdateVoucherForm() {
  interface FormData {
    title: string;
    code: string;
    discount: number;
    expiry_date: string;
  }

  const { id, voucherId } = useParams();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    code: '',
    discount: 0,
    expiry_date: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchVoucherData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            title: 'Error',
            text: 'Silakan login terlebih dahulu',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          router.push('/auth/login');
          return;
        }

        const response = await api.get(`/event/${id}/voucher/${voucherId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.data) {
          const voucherData = response.data.data;
          const expiryDate = new Date(voucherData.expiry_date);
          
          setFormData({
            title: voucherData.title,
            code: voucherData.code,
            discount: voucherData.discount,
            expiry_date: expiryDate.toISOString().slice(0, 16)
          });
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Terjadi kesalahan saat mengambil data voucher',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        router.push(`/components/molecules/event/${id}`);
      }
    };

    fetchVoucherData();
  }, [id, voucherId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'discount') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = 'Judul harus diisi';
    if (!formData.code) newErrors.code = 'Kode voucher harus diisi';
    if (!formData.discount) newErrors.discount = 'Diskon harus diisi';
    if (!formData.expiry_date) newErrors.expiry_date = 'Tanggal kadaluarsa harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            title: 'Error',
            text: 'Silakan login terlebih dahulu',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          router.push('/auth/login');
          return;
        }

        const expiryDate = new Date(formData.expiry_date);
        expiryDate.setHours(expiryDate.getHours() + 7);

        const voucherData = {
          title: formData.title,
          code: formData.code,
          discount: formData.discount,
          expiry_date: expiryDate.toISOString()
        };

        const response = await api.put(`/event/${id}/voucher/${voucherId}`, voucherData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          await Swal.fire({
            title: 'Sukses',
            text: 'Voucher berhasil diperbarui',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          router.push(`/components/molecules/event/${id}`);
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui voucher',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#002459] to-[#0d1e4a] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <Image
            src="/logo-transparent.png"
            alt="MyTicket Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <h2 className="text-3xl font-bold text-white/90">Update Voucher</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 font-medium mb-2">Judul</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.title ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.title && <p className="text-sm text-red-400 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Kode Voucher</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.code ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.code && <p className="text-sm text-red-400 mt-1">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Diskon (%)</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.discount ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.discount && <p className="text-sm text-red-400 mt-1">{errors.discount}</p>}
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Tanggal Kadaluarsa</label>
            <input
              type="datetime-local"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.expiry_date ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.expiry_date && <p className="text-sm text-red-400 mt-1">{errors.expiry_date}</p>}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Memperbarui Voucher...' : 'Update Voucher'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}