'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import '../styles/theme.css';

interface HeaderProps {
    tenantName: string;
    cartItemCount?: number;
}

export default function Header({ tenantName, cartItemCount = 0 }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="modern-dark sticky top-0 z-50" style={{ background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e293b' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{tenantName.charAt(0)}</span>
                        </div>
                        <span className="text-xl font-bold text-white">{tenantName}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/events" className="text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            Events
                        </Link>
                        <Link href="/auth/login" className="text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            Login
                        </Link>
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="w-6 h-6 text-slate-300 hover:text-emerald-500 transition-colors" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <Link href="/" className="block text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/events" className="block text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            Events
                        </Link>
                        <Link href="/auth/login" className="block text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            Login
                        </Link>
                        <Link href="/cart" className="flex items-center space-x-2 text-slate-300 hover:text-emerald-500 transition-colors font-medium">
                            <ShoppingCart className="w-5 h-5" />
                            <span>Cart {cartItemCount > 0 && `(${cartItemCount})`}</span>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
