'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Info } from 'lucide-react';

interface UserProfileDropdownProps {
    onLogout: () => void;
}

export default function UserProfileDropdown({ onLogout }: UserProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const updateUsername = () => {
            setUsername(localStorage.getItem('username') || '');
        };
        window.addEventListener('profileUpdated', updateUsername);
        return () => window.removeEventListener('profileUpdated', updateUsername);
    }, []);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-white/60 transition"
            >
                <User className="w-6 h-6 text-white" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border z-50">
                    <div className="px-4 py-2 text-sm text-gray-700">
                        <p className="font-medium">{username}</p>
                        <p className="text-xs text-green-800">{role === 'EVENT_ORGANIZER' ? 'Event Organizer' : 'Customer'}</p>
                    </div>
                    <hr className="my-1" />
                    <Link href="/components/molecules/profile/detail" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Info className="inline-block w-4 h-4 mr-2" />
                        Information
                    </Link>
                    <hr className="my-1" />
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}
