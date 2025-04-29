"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import { User, Ticket, Settings, LogOut, Info } from "lucide-react";
import { CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation"; 
import  { motion } from "framer-motion";
import { events } from "@/data/event";



// const events = [
//   {
//     id: 1,
//     title: "Tech Conference 2025",
//     date: "2025-05-12",
//     description: "Explore the future of technology at this year's biggest tech event.",
//     image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },
//   {
//     id: 2,
//     title: "Art & Design Expo",
//     date: "2025-06-20",
//     description: "A showcase of the most creative works in design and fine art.",
//     image: "https://images.unsplash.com/photo-1743119638006-a01d4625745d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3,
//     title: "Startup Pitch Night",
//     date: "2025-07-05",
//     description: "Watch startups pitch their innovative ideas to investors.",
//     image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Music Festival Summer",
//     date: "2025-08-15",
//     description: "Join thousands for an unforgettable music experience.",
//     image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 5,
//     title: "Culinary Food Fair",
//     date: "2025-09-10",
//     description: "Taste dishes from the best chefs around the world. feel it",
//     image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 6,
//     title: "Health & Wellness Retreat",
//     date: "2025-10-01",
//     description: "Relax, recharge, and learn about holistic wellness. feel it",
//     image: "https://media.istockphoto.com/id/2178386158/photo/homemade-natural-cosmetics-organic-beauty-products.webp?a=1&b=1&s=612x612&w=0&k=20&c=2BiNDoCzRz6mcDSFSk0yMUwAoAcmzczbEXw4q1GvZsQ=",
//   },
// ];

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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border">
          <div className="px-4 py-2 text-sm text-gray-700">
            <p className="font-medium">john.doe@email.com</p>
            <p className="text-xs text-green-800">Promotor</p>
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
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  );
  const [isModalOpen, setIsModalOpen] = useState(false);




  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center mb-4 md:mb-0">
          <Image
            src="/myticket.png"
            alt="Eventify Logo"
            width={80}
            height={80}
            className="object-contain mr-2"
          />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            myTicket
          </h1>
        </div>

        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <Input
            placeholder="Search events by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/20 text-white placeholder:text-gray-200 border-none rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-300 transition-all"
          />
          <div className="absolute left-3 top-2.5 text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="#">
            <Button className="flex items-center gap-x-2 border border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 transition-all rounded-full px-6">
              <CalendarPlus className="w-4 h-4" />
              Create Event
            </Button>
          </Link>
          <Link href="./auth/signup">
            <Button className="border border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 transition-all rounded-full px-6">
              Register
            </Button>
          </Link>
          <Link href="./auth/signin">
            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-lg rounded-full px-6 transition-all transform hover:scale-105">
              Login
            </Button>
          </Link>
          <UserProfileDropdown />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Discover Amazing Events Near You</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Find, book, and enjoy the best events in town. From concerts to conferences, we've got you covered.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full font-semibold transition-all">
              Browse Events
            </Button>
            <Button className="border-2 border-white text-white bg-transparent hover:bg-white/10 px-8 py-6 text-lg rounded-full font-semibold transition-all">
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Upcoming Events</h2>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">😕</div>
            <h3 className="text-xl font-medium text-gray-600">No events found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search query</p>
            <Button
              onClick={() => setSearch('')}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <Card
                key={event.id}
                className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">{new Date(event.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  <Link href={`/event/${event.id}`} className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg py-2 transition-all transform hover:scale-[1.02]">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-[#002459] to-[#0d1e4a] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <Image
                src="/myticket.png"
                alt="Eventify Logo"
                width={40}
                height={40}
                className="object-contain mr-2"
              />
              myTicket
            </h4>
            <p className="text-blue-100">
              Your one-stop platform for discovering and booking the best events.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Home</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Events</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Categories</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Featured</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Company</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-100 hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Contact</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Terms</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Cookies</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition">Licenses</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-blue-800 text-center text-blue-200">
          &copy; {new Date().getFullYear()} myTicket. All rights reserved.
        </div>
      </footer>
    </div>
  );
}