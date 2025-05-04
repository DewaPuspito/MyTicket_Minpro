'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from "@/app/utils/api/myticket.api";

export default function EventForm() {
  interface FormData {
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    price: number;
    remainingTickets: number;
    category: 'MUSIC' | 'SPORTS' | 'BUSINESS' | 'TECHNOLOGY' | 'EDUCATION' | 'NONE';
    image: File | null;
  }

  const [formData, setFormData] = useState<FormData>({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    price: 0,
    remainingTickets: 0,
    category: 'NONE',
    image: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
  
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files ? files[0] : null }));
    } else if (name === 'price' || name === 'remainingTickets') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name === 'category') {
      setFormData(prev => ({...prev, [name]: value as 'MUSIC' | 'SPORTS' | 'BUSINESS' | 'TECHNOLOGY' | 'EDUCATION' | 'NONE' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.remainingTickets) newErrors.remainingTickets = 'Remaining tickets are required';
    if (!formData.category || formData.category === 'NONE') newErrors.category = 'Event category is required';
    if (!formData.image) newErrors.image = 'Image is required';

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
          alert('Silakan login terlebih dahulu');
          router.push('/auth/login');
          return;
        }

        const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
        const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
        
        startDateTime.setHours(startDateTime.getHours() + 7);
        endDateTime.setHours(endDateTime.getHours() + 7);

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('start_date', startDateTime.toISOString());
        formDataToSend.append('end_date', endDateTime.toISOString());
        formDataToSend.append('location', formData.location);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price.toString());
        formDataToSend.append('available_seats', formData.remainingTickets.toString());
        formDataToSend.append('category', formData.category);
        if (formData.image) {
          formDataToSend.append('imageURL', formData.image);
        }

        const response = await api.post('/event', formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000
        });

        if (response.status === 201) {
          const eventId = response.data.data.id;
          
          const result = await Swal.fire({
            title: 'Event Berhasil Dibuat!',
            text: 'Apakah Anda ingin menambahkan voucher untuk event ini?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
          });

          if (result.isConfirmed) {
            router.push(`/event/voucher/${eventId}`);
          } else {
            router.push('/');
          }
        }
      } catch (error: any) {
        console.error('Error creating event:', error);
        if (error.response) {
          alert(`Error: ${error.response.data.message || 'Something went wrong when creating the event'} ${error.response.data.error? error.response.data.error : ''}`);
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
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <Image
            src="/logo-transparent.png"
            alt="Eventify Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <h2 className="text-3xl font-bold text-white/90">Create New Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label className="block text-white/90 font-medium mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border  rounded-lg p-3 focus:outline-none focus:ring-2 text-white placeholder-white/60 ${errors.title ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
            />
            {errors.title && <p className="text-sm text-red-400 mt-1">{errors.title}</p>}
          </div>

          {/* Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/90 font-medium mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.startDate ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
              />
              {errors.startDate && <p className="text-sm text-red-400 mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-white/90 font-medium mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.endDate ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
              />
              {errors.endDate && <p className="text-sm text-red-400 mt-1">{errors.endDate}</p>}
            </div>
          </div>

          {/* Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/90 font-medium mb-2">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.startTime ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
              />
              {errors.startTime && <p className="text-sm text-red-400 mt-1">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-white/90 font-medium mb-2">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.endTime ? 'border-red-500 focus:ring-red-300' : 'border-white/20 focus:ring-blue-300'}`}
              />
              {errors.endTime && <p className="text-sm text-red-400 mt-1">{errors.endTime}</p>}
            </div>
          </div>
          {/* Location */}
          <div>
            <label className="block text-white/90 font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.location ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/90 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.description ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Price & Tickets */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/90 font-medium mb-2">Price (IDR)</label>
              <input
                type="number"
                name="price"
                min={0}
                step={10000}
                value={formData.price}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.price ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-white/90 font-medium mb-2">Total Tickets</label>
              <input
                type="text"
                name="remainingTickets"
                min={1}
                value={formData.remainingTickets}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 text-white ${errors.remainingTickets ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.remainingTickets && <p className="text-sm text-red-500 mt-1">{errors.remainingTickets}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
          <label className="block text-white/90 font-medium mb-2">Event Category</label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 appearance-none"
            >
              <option value="NONE" className="text-black">Select Category</option>
              <option value="MUSIC" className="text-black">Music</option>
              <option value="SPORTS" className="text-black">Sports</option>
              <option value="BUSINESS" className="text-black">Business</option>
              <option value="TECHNOLOGY" className="text-black">Technology</option>
              <option value="EDUCATION" className="text-black">Education</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">
              ▼
            </div>
          </div>
        </div>
          {/* Image Upload */}
          <div>
            <label className="block text-white/90 font-medium mb-2">Event Image</label>
            <div className="flex">
              <label className="flex items-center px-4 py-2 bg-gray-200 text-black rounded-l-lg cursor-pointer hover:bg-gray-300 transition-colors border-r border-gray-300">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
                Choose file
              </label>
              <span className="flex items-center px-4 py-2 bg-gray-100 text-black rounded-r-lg flex-grow">
                {formData.image ? formData.image.name : 'No file chosen'}
              </span>
            </div>
            {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            Create Event
          </motion.button>
        </form>
        </div>
      </div>
  );
}
