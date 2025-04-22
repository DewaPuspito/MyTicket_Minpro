"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-05-12",
    description: "Explore the future of technology at this year's biggest tech event.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Art & Design Expo",
    date: "2025-06-20",
    description: "A showcase of the most creative works in design and fine art.",
    image: "https://images.unsplash.com/photo-1743119638006-a01d4625745d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    date: "2025-07-05",
    description: "Watch startups pitch their innovative ideas to investors.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Music Festival Summer Vibes",
    date: "2025-08-15",
    description: "Join thousands for an unforgettable music experience.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Culinary Food Fair",
    date: "2025-09-10",
    description: "Taste dishes from the best chefs around the world. feel it",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Health & Wellness Retreat",
    date: "2025-10-01",
    description: "Relax, recharge, and learn about holistic wellness. feel it",
    image: "https://media.istockphoto.com/id/2178386158/photo/homemade-natural-cosmetics-organic-beauty-products.webp?a=1&b=1&s=612x612&w=0&k=20&c=2BiNDoCzRz6mcDSFSk0yMUwAoAcmzczbEXw4q1GvZsQ=",
  },
];

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Eventify (Event Organizer)</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search Events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button className="border border-green-700 text-gray-700 bg-green-500 hover:bg-green-600">Login</Button>
          <Button className="border border-blue-700 text-gray-700 bg-blue-500 hover:bg-blue-600">Register</Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.length ? (
            filteredEvents.map(event => (
              <Card key={event.id} className="rounded-2xl shadow p-4">
                <CardContent>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold text-red-500">{event.title}</h2>
                  <p className="text-sm text-green-500">{event.date}</p>
                  <p className="mt-2 text-sm text-blue-500">{event.description}</p>
                  <Link href={`/event/${event.id}`}>
                    <Button className="mt-4 w-full bg-blue-500 hover:bg-green-600 text-white transition">
                      View Details
                    </Button>
                  </Link>

                </CardContent>

              </Card>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">No events found.</p>
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500 border-t">
        &copy; 2025 Eventify. About | Contact | Terms
      </footer>
    </div>
  );
}
