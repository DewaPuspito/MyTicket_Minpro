"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/atomics/button";
import { Card, CardContent } from "@/app/components/atomics/card";
import { Input } from "@/app/components/atomics/input";
import Image from "next/image";
import Navbar from "@/app/components/atomics/navbar";
import api from "@/app/utils/api/myticket.api";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  TicketIcon,
  CalendarIcon,
  MapPinIcon,
} from "@/app/components/atomics/icons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  start_date: string;
  location: string;
  imageURL: string;
}

const carouselImages = ["/event_3.jpg", "/event_business.png", "/event_2.jpeg"];

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Load saved search from localStorage on mount
  useEffect(() => {
    const savedSearch = localStorage.getItem("search");
    if (savedSearch) {
      setSearch(savedSearch);
    }
  }, []);

  // Save search to localStorage when updated
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  // Remove search when token is gone (logout)
  useEffect(() => {
    const checkLogout = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("search");
        setSearch("");
      }
    };

    window.addEventListener("storage", checkLogout);
    return () => window.removeEventListener("storage", checkLogout);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/event", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.data) {
          setEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase())
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleDashboardRedirect = () => {
    const role = localStorage.getItem("role");
    if (role === "CUSTOMER") {
      router.push("/dashboard_cust");
    } else if (role === "EVENT_ORGANIZER") {
      router.push("/dashboard");
    } else {
      console.warn("Unknown role or not logged in.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {carouselImages.map((img, index) => (
              <div className="embla__slide relative flex-[0_0_100%]" key={index}>
                <Image
                  src={img}
                  alt={`Event ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto text-center text-white px-6">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Discover Your Next
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Unforgettable Experience
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Explore curated events ranging from electrifying concerts to
              inspiring conferences.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleDashboardRedirect}
                className="group flex items-center gap-2 border-2 border-blue-400 text-blue-100 bg-blue-900/30 hover:bg-blue-400/20 px-8 py-4 text-lg rounded-xl font-semibold transition-all"
              >
                <TicketIcon className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                Your Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-white w-8" : "bg-white/50 w-3"}`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={scrollPrev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="w-6 h-6 text-white">←</span>
              </button>
              <button
                onClick={scrollNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="w-6 h-6 text-white">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Upcoming Events</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find events that match your interests and passions
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Input
            type="text"
            placeholder="Search events, categories, or Descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl bg-white text-gray-800 border-2 border-gray-200 rounded-xl pl-12 pr-6 py-4 shadow-sm focus:border-blue-500 focus:ring-0 text-lg"
          />
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <div className="inline-block p-6 bg-blue-50 rounded-2xl">
              <SearchIcon className="w-16 h-16 text-blue-500" />
            </div>
            <h3 className="text-2xl font-medium text-gray-800">No events found</h3>
            <p className="text-gray-600">Try different keywords or check back later!</p>
            <Button
              onClick={() => {
                setSearch("");
                localStorage.removeItem("search");
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-3 text-lg"
            >
              Reset Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={event.imageURL}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600/95 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                    {event.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5">
                    <div className="space-y-1.5 text-white">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <p className="font-medium">
                          {new Date(event.start_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4" />
                        <p className="font-medium truncate">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  <Link href={`components/molecules/event/${event.id}`} className="block">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 text-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                      <TicketIcon className="w-5 h-5" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
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