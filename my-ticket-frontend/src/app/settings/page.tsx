'use client';

import { User, Ticket, Settings, Calendar, Twitch, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-gradient-to-br from-[#001d4a] to-[#002c6d] p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-center mb-4 md:mb-0">
                        <Image
                            src="/myticket.png"
                            alt="Eventify Logo"
                            width={80}
                            height={80}
                            className="object-contain mr-2"
                        />
                    </div>

                    <nav className="space-y-4">
                        <div className="mb-6">
                            <h2 className="text-sm text-white/70 mb-2">Events</h2>

                            <ul className="space-y-3">
                                {[
                                    { icon: Calendar, label: 'See Events', href: '/' },
                                    { icon: Ticket, label: 'My Ticket', href: '/my-ticket' },
                                ].map((item) => (
                                    <motion.li
                                        key={item.label}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                                    >
                                        <Link href={item.href} className="flex items-center gap-2">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                        </div>

                        <div className="border-t border-white/20 pt-4">
                            <h2 className="text-sm text-white/70 mb-2">Account</h2>
                            <ul className="space-y-3">
                                {[
                                    { icon: User, label: 'Edit User Information', href: '#' },
                                    { icon: RefreshCcw, label: 'Switch Role', href: './auth/signup' },
                                ].map((item) => (
                                    <motion.li
                                        key={item.label}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                                    >
                                        <Link href={item.href} className="flex items-center gap-2">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>

                <p className="text-xs text-white/50 text-center">
                    © 2025 myTicket. All Right Reserved.
                </p>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Edit User Information</h2>
                    </div>

                    {/* Basic Information Form */}
                    <form className="bg-white shadow rounded-lg p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Masukkan nama lengkap Anda"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    readOnly
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 text-gray-500 cursor-not-allowed"
                                    value="john.doe@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Nomor Telepon
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Masukkan nomor telepon Anda"
                                />
                            </div>

                            <div>
                                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Foto Profil</label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <img src="/default-avatar.jpg" alt="Avatar" />
                                </span>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="pt-6 text-center">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
