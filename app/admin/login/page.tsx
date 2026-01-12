"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Mail, Lock, AlertCircle, CheckCircle2, Eye, EyeOff, Terminal } from 'lucide-react';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setStatus({ type: 'loading', message: 'Authenticating...' });

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await authService.login(email, password);
            setStatus({ type: 'success', message: 'Access granted' });
            setTimeout(() => router.push('/admin/dashboard'), 800);
        } catch (error: any) {
            console.error("Login failed", error);
            const errorMessage = error.response?.data?.message || 'Invalid credentials';
            setStatus({ type: 'error', message: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 mb-6 shadow-2xl shadow-emerald-500/10 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
                        <Shield className="text-emerald-500 relative z-10" size={36} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Platform Administrator</h1>
                    <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                        <Terminal size={14} />
                        Authorized Access Only
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/50 relative">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none"></div>

                    <div className="relative z-10">
                        {/* Status Messages */}
                        {status.type !== 'idle' && (
                            <div className={`mb-6 p-3.5 rounded-xl flex items-center gap-3 text-sm font-medium backdrop-blur-sm ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' :
                                status.type === 'loading' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10' :
                                    'bg-red-500/10 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10'
                                }`}>
                                {status.type === 'success' && <CheckCircle2 size={18} />}
                                {status.type === 'error' && <AlertCircle size={18} />}
                                {status.type === 'loading' && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                                <span>{status.message}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form className="space-y-5" action={handleSubmit}>
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="admin@platform.com"
                                        className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-11 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 focus:ring-2 transition-all cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm text-slate-400 hover:text-emerald-500 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                {status.type === 'loading' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Authenticating...
                                    </span>
                                ) : (
                                    'Sign In to Dashboard'
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
                            <p className="text-sm text-slate-500">
                                Contact your system administrator for access
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                        <Shield size={12} />
                        <span>Secured with enterprise-grade encryption</span>
                    </div>
                    <p className="text-xs text-slate-700">
                        © {new Date().getFullYear()} TicketBD • Platform Control Center
                    </p>
                </div>
            </div>
        </div>
    );
}
