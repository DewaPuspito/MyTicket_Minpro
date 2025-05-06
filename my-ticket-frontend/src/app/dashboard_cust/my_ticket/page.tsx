'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'react-feather';
import { useState } from 'react';

interface Ticket {
    id: string;
    event: string;
    date: string; // format: 'YYYY-MM-DD'
    location: string;
    status: 'Active' | 'Inactive';
}

const TicketsContent = ({ tickets }: { tickets: Ticket[] }) => {
    const [reviews, setReviews] = useState<Record<string, { review: string; rating: number }>>({});

    const today = new Date();

    const isEligibleForReview = (ticket: Ticket) => {
        const eventDate = new Date(ticket.date);
        return ticket.status === 'Inactive' && eventDate < today;
    };

    const handleReviewChange = (ticketId: string, review: string) => {
        setReviews((prev) => ({ ...prev, [ticketId]: { ...prev[ticketId], review } }));
    };

    const handleRatingChange = (ticketId: string, rating: number) => {
        setReviews((prev) => ({ ...prev, [ticketId]: { ...prev[ticketId], rating } }));
    };

    const handleSubmit = (ticketId: string) => {
        const data = reviews[ticketId];
        if (!data?.review || !data.rating) {
            alert("Please enter both review and rating.");
            return;
        }
        // Simulasi kirim review ke server
        console.log(`Review submitted for ticket ${ticketId}:`, data);
        alert("Thank you for your feedback!");
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">My Tickets</h3>
            <div className="grid grid-cols-1 gap-6">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-100 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm">
                        <div className="flex justify-between">
                            <div className="w-full">
                                <h4 className="text-lg font-semibold">{ticket.event}</h4>
                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                    <span className="flex items-center gap-2">
                                        <Calendar size={14} className="text-purple-500" />
                                        {ticket.date}
                                    </span>
                                    <span>{ticket.location}</span>
                                    <span className={`px-2 py-1 rounded-full ${ticket.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {ticket.status}
                                    </span>
                                </div>

                                {isEligibleForReview(ticket) && (
                                    <div className="mt-4 space-y-2">
                                        <textarea
                                            className="w-full p-2 border rounded-lg"
                                            rows={2}
                                            placeholder="Write a review..."
                                            value={reviews[ticket.id]?.review || ''}
                                            onChange={(e) => handleReviewChange(ticket.id, e.target.value)}
                                        />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-700">Rating:</label>
                                            <select
                                                value={reviews[ticket.id]?.rating || 0}
                                                onChange={(e) => handleRatingChange(ticket.id, parseInt(e.target.value))}
                                                className="border rounded px-2 py-1 text-sm"
                                            >
                                                <option value={0}>Choose...</option>
                                                {[1, 2, 3, 4, 5].map((val) => (
                                                    <option key={val} value={val}>
                                                        {val} ⭐
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleSubmit(ticket.id)}
                                                className="ml-auto bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
                                            >
                                                Submit Review
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!isEligibleForReview(ticket) && (
                                    <p className="mt-4 text-sm italic text-gray-400">
                                        Review available after attending the event.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default TicketsContent;
