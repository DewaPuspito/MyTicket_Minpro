'use client';

import { Upload, Edit, User, Mail, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function BasicInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Informasi Dasar</h1>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Gambar Profil</h2>
          <p className="text-gray-500 mb-6">
            Avatar dan foto sampul adalah gambar pertama yang akan dilihat di akun profiling.
          </p>

          {/* Cover Photo Upload */}
          <div className="relative h-40 bg-gray-100 rounded-lg mb-16">
            <div className="absolute -bottom-12 left-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="file" className="hidden" accept="image/*" />
                  <div className="w-24 h-24 rounded-full bg-black/50 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Avatar Requirements */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-sm">• Gunakan gambar persegi</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-sm">• Resolusi tinggi (min. 400x400px)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-sm">• Maksimal ukuran file 1MB</span>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">mursyid.suridadredja15@gmail.com</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Edit className="w-4 h-4" />
              <span>Ubah</span>
            </button>
          </div>
        </div>

        {/* Phone Number Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No. Ponsel *</h3>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                  <select className="bg-transparent text-gray-600 focus:outline-none">
                    <option>+62</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="tel"
                    value="81286805939"
                    className="bg-transparent text-gray-600 focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Edit className="w-4 h-4" />
              <span>Ubah</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}