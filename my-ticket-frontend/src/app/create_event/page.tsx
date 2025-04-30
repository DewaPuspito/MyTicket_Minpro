'use client';

import { useState } from 'react';

export default function EventForm() {
  interface Organizer {
    name: string;
    logo: string;
  }

  interface FormData {
    title: string;
    startDate: string;
    endDate: string;
    time: string;
    location: string;
    description: string;
    price: number;
    remainingTickets: number;
    image: File | null;
    organizer: Organizer;
  }

  const [formData, setFormData] = useState<FormData>({
    title: '',
    startDate: '',
    endDate: '',
    time: '',
    location: '',
    description: '',
    price: 0,
    remainingTickets: 0,
    image: null,
    organizer: {
      name: '',
      logo: '',
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files ? files[0] : null }));
    } else if (name === 'price' || name === 'remainingTickets') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name === 'organizerName') {
      setFormData(prev => ({ ...prev, organizer: { ...prev.organizer, name: value } }));
    } else if (name === 'organizerLogo') {
      setFormData(prev => ({ ...prev, organizer: { ...prev.organizer, logo: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.remainingTickets) newErrors.remainingTickets = 'Remaining tickets are required';
    if (!formData.image) newErrors.image = 'Image is required';
    if (!formData.organizer.name) newErrors.organizerName = 'Organizer name is required';
    if (!formData.organizer.logo) newErrors.organizerLogo = 'Organizer logo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      // Submit form
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create New Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Event Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.startDate ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.endDate ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Event Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.time ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.location ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.description ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Price & Tickets */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price (IDR)</label>
              <input
                type="number"
                name="price"
                min={0}
                step={1000}
                value={formData.price}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.price ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Total Tickets</label>
              <input
                type="number"
                name="remainingTickets"
                min={1}
                value={formData.remainingTickets}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.remainingTickets ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
              />
              {errors.remainingTickets && <p className="text-sm text-red-500 mt-1">{errors.remainingTickets}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Event Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.image ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image}</p>}
          </div>

          {/* Organizer */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              value={formData.organizer.name}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.organizerName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.organizerName && <p className="text-sm text-red-500 mt-1">{errors.organizerName}</p>}
          </div>
          {/* <div>
            <label className="block text-gray-700 font-medium mb-2">Organizer Logo URL</label>
            <input
              type="text"
              name="organizerLogo"
              value={formData.organizer.logo}
              onChange={handleChange}
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${errors.organizerLogo ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.organizerLogo && <p className="text-sm text-red-500 mt-1">{errors.organizerLogo}</p>}
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
