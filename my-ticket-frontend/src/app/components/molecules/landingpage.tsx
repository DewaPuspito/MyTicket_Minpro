"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/atomics/button";
import { Card, CardContent } from "@/app/components/atomics/card";
import {Input} from "@/app/components/atomics/input";
import Image from "next/image";
import { events } from "@/data/event";
import Navbar from "@/app/components/atomics/navbar";


export default function LandingPage() {
  const [search, setSearch] = useState("");
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <Navbar />
      
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

        {/* Search bar */}
        <div className="flex justify-center mb-10">
           <Input
             type="text"
             placeholder="Search event title or description..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full max-w-xl bg-white text-gray-800 border border-gray-300 rounded-full px-6 py-3 shadow-sm focus:ring-2 focus:ring-blue-500"
           />
         </div>

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
                  <Link href={`event/${event.id}`} className="block">
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
                src="/logo-transparent.png"
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