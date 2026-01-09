'use client';

import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import '../styles/theme.css';

interface FooterProps {
    tenantName: string;
}

export default function Footer({ tenantName }: FooterProps) {
    return (
        <footer className="modern-dark" style={{ background: '#0f172a', borderTop: '1px solid #1e293b' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold text-white mb-4">{tenantName}</h3>
                        <p className="text-slate-400 text-sm">
                            Your premier destination for unforgettable events and experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/events" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">Browse Events</a></li>
                            <li><a href="/about" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">About Us</a></li>
                            <li><a href="/contact" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="/help" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">Help Center</a></li>
                            <li><a href="/terms" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="/privacy" className="text-slate-400 hover:text-emerald-500 transition-colors text-sm">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} {tenantName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
