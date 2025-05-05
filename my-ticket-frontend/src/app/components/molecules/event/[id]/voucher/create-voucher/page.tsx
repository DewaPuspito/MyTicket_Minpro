'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from "@/app/utils/api/myticket.api";

export default function VoucherForm() {
  interface FormData {
    title: string;
    code: string;
    discount: number;
    expiry_date: string;
  }

  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    code: '',
    discount: 0,
    expiry_date: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

    if (!formData.title) newErrors.title = 'Title must be filled';
    if (!formData.code) newErrors.code = 'Voucher code must be filled';
    if (!formData.discount) newErrors.discount = 'Voucher discount must be filled';
    if (!formData.expiry_date) newErrors.expiry_date = 'Expiry date must be filled';

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
          alert('Please login first');
          router.push('/auth/login');
          return;
        }

        const voucherData = {
          title: formData.title,
          code: formData.code,
          discount: formData.discount,
          expiry_date: new Date(formData.expiry_date).toISOString(),
          eventId: id
        };

        const response = await api.post(`/event/${id}/voucher`, voucherData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201) {
          await Swal.fire({
            title: 'Voucher successfully created',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          
          router.push(`/components/molecules/event/${id}`);
        }
      } catch (error: any) {
        if (error.response) {
          alert(`Error: ${error.response.data.message || 'Something went wrong please try again later'}`);
        } else if (error.request) {
          alert('Cannot connect to the server');
        } else {
          alert('Internal Server Error');
        }
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
            alt="Eventify Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <h2 className="text-3xl font-bold text-white/90">Create New Voucher</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.title ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.title && <p className="text-sm text-red-400 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Voucher Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.code ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.code && <p className="text-sm text-red-400 mt-1">{errors.code}</p>}
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Discount (%)</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.discount ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.discount && <p className="text-sm text-red-400 mt-1">{errors.discount}</p>}
          </div>

          <div>
            <label className="block text-white/90 font-medium mb-2">Expiry Date</label>
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
            {isLoading ? 'Making Voucher...' : 'Create Voucher'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}