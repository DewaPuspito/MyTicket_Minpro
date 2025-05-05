'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/components/atomics/button';
import { User, Ticket, CalendarPlus, Settings, LogOut, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfileDropdownProps {
    onLogout: () => void;
}

function UserProfileDropdown({ onLogout }: UserProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

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
                    <div className="space-y-1">
                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Link href="components/molecules/profile/detail" className="w-full flex items-center text-sm text-gray-700 hover:bg-gray-100">
                            <Info className="w-4 h-4 mr-3" />
                            Information
                        </Link>
                        </button>
                        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Ticket className="w-4 h-4 mr-3" />
                            My Ticket
                        </button>
                        <Link href="/settings" className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Settings className="w-4 h-4 mr-3" />
                            Settings
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
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setUserRole(role || '');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserRole('');
        router.push('/');
    };


    return (
        <header className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg sticky top-0 z-50">
            <Link href="/">
                <Image
                    src="/logo-transparent.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="object-contain mr-2 cursor-pointer"
                />
            </Link>

            <div className="flex items-center gap-3">
            {!isLoggedIn ? (
                    <>
                        <Link href="/auth/signup">
                            <Button className="border border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full px-6">
                                Register
                            </Button>
                        </Link>
                        <Link href="/auth/signin">
                            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-lg rounded-full px-6">
                                Login
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        {userRole === 'EVENT_ORGANIZER' && (
                            <Link href="components/molecules/event/create_event">
                                <Button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg rounded-full px-6">
                                    <CalendarPlus className="w-5 h-5" />
                                    Create Event
                                </Button>
                            </Link>
                        )}
                        <UserProfileDropdown onLogout={handleLogout} />
                    </>
                )}
            </div>
        </header>
    );
}
