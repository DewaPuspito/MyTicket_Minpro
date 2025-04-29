// app/signup/page.tsx
'use client'

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SigninPage() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#002459] to-[#0d1e4a] flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
                {/* Header Section */}
                <div className="mb-10 flex flex-col items-center justify-center text-center space-y-3">
                     <Image
                                src="/myticket.png"
                                alt="Eventify Logo"
                                width={80}
                                height={80}
                                className="object-contain mr-2"
                              />
                    <p className="text-white/80 text-center text-lg">
                        Welcome to Your Account
                    </p>
                </div>

                {/* Form Section */}
                <form className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90">Email</label>
                        <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 
                            focus-within:border-blue-400 transition-colors">
                            <Mail className="text-white/60" size={20} />
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full bg-transparent text-white placeholder-white/60 
                                    focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/90">Password</label>
                        <div className="flex items-center bg-white/5 border border-white/20 rounded-lg px-4 py-3 gap-2 
                            focus-within:border-blue-400 transition-colors">
                            <Mail className="text-white/60" size={20} />
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="w-full bg-transparent text-white placeholder-white/60 
                                    focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                            py-3 rounded-lg font-semibold shadow-lg transition-all"
                    >
                        Login
                    </motion.button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-white/80">
                    Don't Have an Account?{" "}
                    <a href="./signup" className="text-white font-semibold underline hover:text-blue-300">
                        Register
                    </a>
                </div>

                {/* Footer Text */}
                <div className="mt-16 text-center space-y-2">
                    <div className="h-px bg-white/20 w-full mb-4" />
                    <p className="text-white/70 text-sm">
                    Never miss your favorite events again.
                    </p>
                    <p className="text-white/60 text-sm">
                    Join and experience the ease of transactions
                    and event management with myTicket.
                    </p>
                </div>
            </div>
        </div>
    );
}