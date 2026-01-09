'use client';

import { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/theme.css';

interface AuthPageProps {
    tenantName: string;
    mode?: 'login' | 'register';
}

export default function AuthPage({ tenantName, mode = 'login' }: AuthPageProps) {
    const [isLogin, setIsLogin] = useState(mode === 'login');

    return (
        <div className="modern-dark min-h-screen">
            <Header tenantName={tenantName} />

            <section className="py-20 px-4">
                <div className="max-w-md mx-auto">
                    <div className="card-glass p-8">
                        {/* Tabs */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isLogin
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isLogin
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        {/* Login Form */}
                        {isLogin ? (
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center text-slate-400">
                                        <input type="checkbox" className="mr-2" />
                                        Remember me
                                    </label>
                                    <a href="#" className="text-emerald-500 hover:text-emerald-400">
                                        Forgot password?
                                    </a>
                                </div>

                                <button type="submit" className="btn-primary w-full py-3">
                                    Sign In
                                </button>
                            </form>
                        ) : (
                            /* Register Form */
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            placeholder="+880 1234567890"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-12"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-start text-slate-400 text-sm">
                                    <input type="checkbox" className="mr-2 mt-1" />
                                    <span>I agree to the Terms of Service and Privacy Policy</span>
                                </label>

                                <button type="submit" className="btn-primary w-full py-3">
                                    Create Account
                                </button>
                            </form>
                        )}

                        {/* Social Login */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900 text-slate-400">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <button className="btn-outline py-3">
                                    Google
                                </button>
                                <button className="btn-outline py-3">
                                    Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer tenantName={tenantName} />
        </div>
    );
}
