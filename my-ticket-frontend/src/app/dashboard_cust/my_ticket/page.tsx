import { motion } from 'framer-motion';
import { Calendar } from 'react-feather';

interface Ticket {
    id: string;
    event: string;
    date: string;
    location: string;
    status: 'Active' | 'Inactive';
}

const TicketsContent = ({ tickets }: { tickets: Ticket[] }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Active Tickets</h3>
        <div className="grid grid-cols-1 gap-6">
            {tickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-100 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm">
                    <div className="flex justify-between">
                        <div className="w-4/5">
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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

export default TicketsContent;
