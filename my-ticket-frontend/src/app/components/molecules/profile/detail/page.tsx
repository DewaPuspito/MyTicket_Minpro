'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        profile_pic: '',
        role: '',
        refferal_code_owned: '',
        points: 0
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!token || !userId) {
                    console.error('Token or userId not found');
                    return;
                }

                const response = await fetch(`http://localhost:8000/api/profile/show_profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.data) {
                    setProfile(result.data);
                }

            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

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
                    <p className="text-white/90 text-xl font-semibold">Your Profile</p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                                <Image
                                    src={profile.profile_pic || '/default-avatar.png'}
                                    alt="Profile Picture"
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-sm text-white/90 font-medium">Full Name</label>
                        <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2">
                            <User className="text-white/60" size={20} />
                            <input
                                type="text"
                                value={profile.name}
                                readOnly
                                className="w-full bg-transparent text-white focus:outline-none cursor-default"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm text-white/90 font-medium">Email</label>
                        <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2">
                            <Mail className="text-white/60" size={20} />
                            <input
                                type="email"
                                value={profile.email}
                                readOnly
                                className="w-full bg-transparent text-white focus:outline-none cursor-default"
                            />
                        </div>
                    </div>

                    {/* Referral Code */}
                    {(profile.role?.toUpperCase() === 'CUSTOMER' || profile.role === 'Customer') && (
                        <div className="space-y-1">
                            <label className="text-sm text-white/90 font-medium">Your Referral Code</label>
                            <input
                                type="text"
                                value={profile.refferal_code_owned || 'No referral code'}
                                readOnly
                                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none cursor-default"
                            />
                        </div>
                    )}

                    {/* Points */}
                    {(profile.role?.toUpperCase() === 'CUSTOMER' || profile.role === 'Customer') && (
                        <div className="space-y-1">
                            <label className="text-sm text-white/90 font-medium">Your Points</label>
                            <input
                                type="text"
                                value={`${profile.points || 0} points`}
                                readOnly
                                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none cursor-default"
                            />
                        </div>
                    )}

                    {/* Update Profile Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
                    >
                        Update Profile
                    </motion.button>
                </div>
            </div>
        </div>
    );
}