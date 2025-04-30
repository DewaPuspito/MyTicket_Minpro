"use client";

import { useParams, useRouter } from "next/navigation";
import { events } from "@/data/event";
import { Button } from "@/app/components/atomics/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Clock, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/app/utils/motion";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const event = events.find((event) => event.id === Number(id));

  if (!event) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center p-6"
      >
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! 😢</h1>
          <p className="text-lg text-gray-600 mb-8">
            The event you're looking for has either ended or moved to another universe.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl transition-transform hover:scale-105"
          >
            Beam Me Home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-6"
    >
      {/* Back Button */}
      {/* <motion.div variants={fadeIn('right', 'tween', 0.2, 1)} className="mb-8">
        <Button
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md text-gray-600 hover:text-gray-900 rounded-xl px-6 py-3 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Button>
      </motion.div> */}

      {/* Event Detail Card */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-shadow hover:shadow-3xl"
        >
          {/* Image Section with Gradient Overlay */}
          <div className="relative h-96 w-full group">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h1
                variants={fadeIn('up', 'tween', 0.5, 1)}
                className="text-4xl font-bold mb-4 drop-shadow-2xl"
              >
                {event.title}
              </motion.h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <motion.div
            variants={staggerContainer()}
            className="p-8 space-y-8"
          >
            <motion.div variants={fadeIn('up', 'tween', 0.3, 1)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Event Details */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center text-lg text-gray-600">
                  <Clock className="w-6 h-6 mr-3 text-indigo-600" />
                  <span>
                    {event.time}
                  </span>
                </div>

                <div className="prose prose-lg text-gray-600">
                  {event.description}
                </div>
              </div>

              {/* Ticket Card */}
              <motion.div
                variants={fadeIn('left', 'tween', 0.5, 1)}
                className="bg-indigo-50 p-6 rounded-xl h-fit sticky top-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-8 h-8 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-900">Tickets</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">General Admission</span>
                      <span className="font-bold text-gray-900">
                        {event.price ? `Rp. ${event.price}` : 'FREE'}
                      </span>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl transition-all hover:shadow-lg"
                      onClick={() => router.push(`/event/${id}/ticket`)}
                    >
                      Get Tickets Now
                    </Button>

                    <div className="text-sm text-center text-gray-500 mt-2">
                      {event.remainingTickets ?
                        `${event.remainingTickets} seats remaining` :
                        'Limited availability'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Additional Actions */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/" className="flex-1 md:flex-none">
                <Button className="w-full bg-blue-500 hover:bg-gray-400 text-gray-600 rounded-xl py-6 transition-all">
                  Explore More Events
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}