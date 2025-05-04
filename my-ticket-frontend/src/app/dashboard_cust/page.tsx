'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tag, Clock, Edit, User, Bell, Calendar } from 'react-feather';
import { ArrowUpTrayIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { Camera, Key as KeyIcon } from 'lucide-react'; // Add KeyIcon here

const CustomerDashboard = () => {
    const router = useRouter();
    
    // Initialize activeTab with localStorage or default to 'tickets'
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeTab') || 'tickets';
        }
        return 'tickets';
    });

    useEffect(() => {
        // Update localStorage when activeTab changes
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeTab', activeTab);
        }
    }, [activeTab]);

    const tickets = [
        { id: 1, event: 'Heart2Heart Concert', date: '2025-05-15', location: 'Jakarta Convention Center', qrCode: 'VIP-1234-5678', status: 'Active' },
        { id: 2, event: 'Tech Summit 2025', date: '2025-06-20', location: 'Bandung Hall', qrCode: 'REG-9876-5432', status: 'Used' }
    ];

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    // Track if the component has mounted to avoid SSR mismatches
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Avoid rendering until client-side
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl border-r border-white/10">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                        My Event Space
                    </h2>
                    <nav className="space-y-1">
                        {[{ id: 'tickets', icon: <Tag size={16} className="text-blue-400" />, label: 'My Tickets' },
                          { id: 'history', icon: <Clock size={16} className="text-green-400" />, label: 'Purchase History' },
                        { id: 'see-another-events', icon: <Tag size={16} className="text-pink-400" />, label: 'See Another Events', isExternal: true },
                          { id: 'edit account', icon: <Edit size={16} className="text-yellow-400" />, label: 'Edit Account' }].map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => {
                                    if (item.isExternal) {
                                        router.push('/');
                                    } else {
                                        setActiveTab(item.id);
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                                className={`flex items-center w-full p-3.5 rounded-xl transition-all ${activeTab === item.id && !item.isExternal
                                    ? 'bg-white/10 text-white shadow-inner'
                                    : 'text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </motion.button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4 ml-auto">
                        <button className="relative text-gray-600 hover:text-purple-600 p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-600/30 flex items-center justify-center shadow-sm hover:shadow-md">
                            <User className="text-purple-600" size={20} />
                        </div>
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="space-y-8">
                    {activeTab === 'tickets' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Active Tickets</h3>
                            <div className="grid grid-cols-1 gap-6">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="border border-gray-100 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm">
                                        <div className="flex justify-between">
                                            <div className="w-4/5">
                                                <h4 className="text-lg font-semibold">{ticket.event}</h4>
                                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                                    <span className="flex items-center gap-2">
                                                        <Calendar size={14} className="text-purple-500" />
                                                        {ticket.date}
                                                    </span>
                                                    <span>{ticket.location}</span>
                                                    <span className={`px-2 py-1 rounded-full ${ticket.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* QR Code on the right */}
                                            <div className="w-1/5 flex justify-center items-center">
                                                {/* <QRCode value={`https://example.com/ticket/${ticket.qrCode}`} size={128} level="H" includeMargin={true} /> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Account Edit Section */}
                    {activeTab === 'edit account' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
                        >
                            <div className="max-w-3xl mx-auto space-y-8">
                                <h3 className="text-2xl font-bold text-gray-800">Account Settings</h3>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="relative group">
                                        <img
                                            src="/default-avatar.png"
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover hover:border-purple-100 transition-all"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Your full name"
                                                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                value={email}
                                                readOnly
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="john.doe@mail.com"
                                                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <button className="self-start px-5 py-2.5 text-sm font-medium bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
                                            <ArrowUpTrayIcon className="w-4 h-4" />
                                            Change Photo
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-gray-800">
                                        <KeyIcon className="w-6 h-6 text-purple-600" />
                                        <h4 className="text-lg font-semibold">Password Settings</h4>
                                    </div>
                                    <div className="grid gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-5 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-4 px-8 py-2.5 text-sm font-medium bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
                                        <ArrowUpTrayIcon className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
