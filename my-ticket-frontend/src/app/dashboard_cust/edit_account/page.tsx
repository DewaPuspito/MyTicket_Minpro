import { Camera, Key as KeyIcon } from 'lucide-react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface EditAccountContentProps {
    fullName: string;
    setFullName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
}

const EditAccountContent: React.FC<EditAccountContentProps> = ({ fullName, setFullName, email, setEmail }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div className="max-w-3xl mx-auto space-y-8">
            <h3 className="text-2xl font-bold text-gray-800">Account Settings</h3>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative group">
                    <img
                        src="/default-avatar.png"
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover hover:border-purple-100 transition-all"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john.doe@mail.com"
                            className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <button className="self-start px-5 py-2.5 text-sm font-medium bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        Change Photo
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3 text-gray-800">
                    <KeyIcon className="w-6 h-6 text-purple-600" />
                    <h4 className="text-lg font-semibold">Password Settings</h4>
                </div>
                <div className="grid gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="mt-4 px-8 py-2.5 text-sm font-medium bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
                    <ArrowUpTrayIcon className="w-4 h-4" />
                    Save Changes
                </button>
            </div>
        </div>
    </motion.div>
);

export default EditAccountContent;
