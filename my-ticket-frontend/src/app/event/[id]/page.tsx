import { notFound } from "next/navigation";
import Image from "next/image";
import { events } from "../event";

type Props = {
  params: { id: string };
};

export default async function EventDetailPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return notFound();

  const event = events.find((e) => e.id === id);
  if (!event) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-6 items-start">
      {/* Gambar */}
      <div className="col-span-2 rounded-2xl overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={1200}
          height={800}
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>

      {/* Info Event */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
        <h1 className="text-xl font-semibold">{event.title}</h1>

        <p className="text-gray-600 text-sm">{event.description}</p>

        <div className="text-sm space-y-1 text-gray-700">
          <p>📅 {event.startDate} - {event.endDate}</p>
          <p>🕒 {event.time}</p>
          <p>📍 {event.location}</p>
        </div>

        <hr />

        <div>
          <p className="text-sm text-gray-500 mb-1">Diselenggarakan oleh</p>
          <div className="flex items-center gap-3">
            <Image
              src={event.organizer.logo}
              alt={event.organizer.name}
              width={40}
              height={40}
              className="rounded-full bg-white"
            />
            <span className="font-medium">{event.organizer.name}</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          Beli Tiket
        </button>
      </div>
    </div>
  );
}
