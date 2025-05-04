import { motion } from 'framer-motion';
import { Tag, Clock, Edit } from 'react-feather';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const router = useRouter();

    const navItems = [
        { id: 'tickets', icon: <Tag size={16} className="text-blue-400" />, label: 'My Tickets' },
        { id: 'history', icon: <Clock size={16} className="text-green-400" />, label: 'Purchase History' },
        { id: 'see-another-events', icon: <Tag size={16} className="text-pink-400" />, label: 'See Another Events', isExternal: true },
        { id: 'edit account', icon: <Edit size={16} className="text-yellow-400" />, label: 'Edit Account' }
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl border-r border-white/10">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                    My Event Space
                </h2>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            onClick={() => {
                                if (item.isExternal) {
                                    router.push('/');
                                } else {
                                    setActiveTab(item.id);
                                }
                            }}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center w-full p-3.5 rounded-xl transition-all ${activeTab === item.id && !item.isExternal
                                ? 'bg-white/10 text-white shadow-inner'
                                : 'text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
