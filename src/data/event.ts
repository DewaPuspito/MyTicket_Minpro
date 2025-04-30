export const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    startDate: "2025-05-12",
    endDate: "2025-05-12",
    time: "09:00 - 17:00 WIB",
    location: "Jakarta Convention Center",
    description: "Explore the future of technology at this year's biggest tech event.",
    price: 1000000,
    remainingTickets: 1500, // Tambahan
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3",
    organizer: {
      name: "TechWorld Inc.",
      logo: "https://ui-avatars.com/api/?name=TechWorld+Inc&background=random",
    },
  },
  {
    id: 2,
    title: "Art & Design Expo",
    startDate: "2025-06-20",
    endDate: "2025-06-22",
    time: "10:00 - 18:00 WIB",
    location: "Balai Kartini, Jakarta",
    description: "A showcase of the most creative works in design and fine art.",
    price: 1000000,
    remainingTickets: 420, // Tambahan
    image: "https://images.unsplash.com/photo-1743119638006-a01d4625745d?q=80&w=2070&auto=format&fit=crop",
    organizer: {
      name: "CreativeHub",
      logo: "https://ui-avatars.com/api/?name=CreativeHub&background=random",
    },
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    startDate: "2025-07-05",
    endDate: "2025-07-05",
    time: "18:00 - 21:00 WIB",
    location: "GoWork Pacific Place, Jakarta",
    description: "Watch startups pitch their innovative ideas to investors.",
    price: 1000000,
    remainingTickets: 50, // Tambahan (event terbatas)
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    organizer: {
      name: "StartupNation",
      logo: "https://ui-avatars.com/api/?name=StartupNation&background=random",
    },
  },
  {
    id: 4,
    title: "Music Festival Summer Vibes",
    startDate: "2025-08-15",
    endDate: "2025-08-16",
    time: "14:00 - 23:00 WIB",
    location: "Beach City International Stadium, Ancol",
    description: "Join thousands for an unforgettable music experience.",
    price: 1000000,
    remainingTickets: 5000, // Tambahan (event besar)
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    organizer: {
      name: "VibeNation",
      logo: "https://ui-avatars.com/api/?name=VibeNation&background=random",
    },
  },
  {
    id: 5,
    title: "Culinary Food Fair",
    startDate: "2025-09-10",
    endDate: "2025-09-13",
    time: "11:00 - 20:00 WIB",
    location: "ICE BSD City",
    description: "Taste dishes from the best chefs around the world. Feel it.",
    price: 1000000,
    remainingTickets: 780, // Tambahan
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
    organizer: {
      name: "Foodies United",
      logo: "https://ui-avatars.com/api/?name=Foodies+United&background=random",
    },
  },
  {
    id: 6,
    title: "Health & Wellness Retreat",
    startDate: "2025-10-01",
    endDate: "2025-10-03",
    time: "08:00 - 16:00 WIB",
    location: "Ubud, Bali",
    description: "Relax, recharge, and learn about holistic wellness.",
    price: 1000000,
    remainingTickets: 30, // Tambahan (event eksklusif)
    image: "https://media.istockphoto.com/id/2178386158/photo/homemade-natural-cosmetics-organic-beauty-products.webp?a=1&b=1&s=612x612&w=0&k=20&c=2BiNDoCzRz6mcDSFSk0yMUwAoAcmzczbEXw4q1GvZsQ=",
    organizer: {
      name: "Wellness World",
      logo: "https://ui-avatars.com/api/?name=Wellness+World&background=random",
    },
  },
];

export const formattedEvents = events.map(event => ({
  ...event,
  price: isNaN(Number(event.price)) ? 0 : Number(event.price),  // Konversi harga string ke number
}));