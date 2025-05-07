'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Mail, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const CLOUDINARY_UPLOAD_PRESET = 'your_unsigned_preset';
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';

const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
    }
};

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        profile_pic: '',
        role: '',
        refferal_code_owned: '',
        points: 0,
    });

    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newProfilePic, setNewProfilePic] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!token || !userId) return;

                const response = await fetch(`http://localhost:8000/api/profile/show_profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (result.data) {
                    setProfile(result.data);
                    setNewName(result.data.name);
                    setNewProfilePic(result.data.profile_pic || '');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token || !userId) return;

        try {
            const response = await fetch(`http://localhost:8000/api/profile/update_profile/${userId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                    profile_pic: newProfilePic,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Profile updated successfully!');
                localStorage.setItem('username', newName); // Update localStorage
                window.dispatchEvent(new Event('profileUpdated')); // Trigger event
                setEditMode(false);
                setProfile({ ...profile, name: newName, profile_pic: newProfilePic });
            } else {
                alert('Update failed: ' + result.message);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#002459] to-[#0d1e4a] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="flex flex-col items-center text-center space-y-3 mb-8">
                    <Image src="/logo-transparent.png" alt="Logo" width={80} height={80} />
                    <p className="text-white/90 text-xl font-semibold">Your Profile</p>
                </div>

                <div className="space-y-5">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                                <Image
                                    src={newProfilePic || '/default-avatar.png'}
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-white/90 font-medium">Full Name</label>
                        <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2">
                            <User className="text-white/60" size={20} />
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full bg-transparent text-white focus:outline-none"
                                readOnly={!editMode}
                            />
                        </div>
                    </div>

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

                    {editMode && (
                        <div className="space-y-1">
                            <label className="text-sm text-white/90 font-medium">Upload Profile Photo</label>
                            <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2">
                                <Upload className="text-white/60" size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const imageUrl = await uploadImageToCloudinary(file);
                                            if (imageUrl) setNewProfilePic(imageUrl);
                                            else alert('Failed to upload image');
                                        }
                                    }}
                                    className="text-white"
                                />
                            </div>
                        </div>
                    )}

                    {profile.role?.toUpperCase() === 'CUSTOMER' && (
                        <>
                            <div className="space-y-1">
                                <label className="text-sm text-white/90 font-medium">Referral Code</label>
                                <input
                                    type="text"
                                    value={profile.refferal_code_owned || 'No referral code'}
                                    readOnly
                                    className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none cursor-default"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-white/90 font-medium">Points</label>
                                <input
                                    type="text"
                                    value={`${profile.points || 0} points`}
                                    readOnly
                                    className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none cursor-default"
                                />
                            </div>
                        </>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={editMode ? handleUpdateProfile : () => setEditMode(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
                    >
                        {editMode ? 'Save Changes' : 'Edit Profile'}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
