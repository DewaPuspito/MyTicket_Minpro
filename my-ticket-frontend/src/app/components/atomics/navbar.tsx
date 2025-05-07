'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/components/atomics/button';
import { CalendarPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileDropdown from '@/app/components/atomics/userprofile';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        const updateProfileInfo = () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            setIsLoggedIn(!!token);
            setUserRole(role || '');
        };

        updateProfileInfo();
        window.addEventListener('profileUpdated', updateProfileInfo);

        return () => {
            window.removeEventListener('profileUpdated', updateProfileInfo);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
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
