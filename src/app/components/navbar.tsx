'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { CalendarPlus, User, Ticket, Settings, LogOut, Info } from 'lucide-react';
import { useState } from 'react';

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

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
            <p className="font-medium">john.doe@email.com</p>
            <p className="text-xs text-green-800">Customer</p>
          </div>
          <hr className="my-1" />
          <div className="space-y-1">
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Info className="w-4 h-4 mr-3" />
              Information
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
            <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
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
  const [search, setSearch] = useState('');

  return (
    <header className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center mb-4 md:mb-0">
        <Image
          src="/logo-transparent.png"
          alt="Logo"
          width={80}
          height={80}
          className="object-contain mr-2"
        />
      </div>

      <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/20 text-white placeholder:text-gray-200 border-none rounded-full pl-10 pr-4 py-2"
        />
        <div className="absolute left-3 top-2.5 text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/create_event">
          <Button className="flex items-center gap-x-2 border border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full px-6">
            <CalendarPlus className="w-4 h-4" />
            Create Event
          </Button>
        </Link>
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
        <UserProfileDropdown />
      </div>
    </header>
  );
}
