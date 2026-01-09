'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, Briefcase } from 'lucide-react';
import { useState } from 'react';
import '../styles/theme.css';

interface HeaderProps {
    tenantName: string;
    cartItemCount?: number;
}

export default function Header({ tenantName, cartItemCount = 0 }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="professional-corporate sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-semibold text-slate-900">{tenantName}</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">Home</Link>
                        <Link href="/events" className="text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">Events</Link>
                        <Link href="/auth/login" className="text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">Login</Link>
                        <Link href="/cart" className="relative ml-4">
                            <ShoppingCart className="w-5 h-5 text-slate-700 hover:text-blue-600 transition-colors" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </nav>

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-700">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-slate-200">
                        <Link href="/" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">Home</Link>
                        <Link href="/events" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">Events</Link>
                        <Link href="/auth/login" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">Login</Link>
                        <Link href="/cart" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Cart {cartItemCount > 0 && `(${cartItemCount})`}</span>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
