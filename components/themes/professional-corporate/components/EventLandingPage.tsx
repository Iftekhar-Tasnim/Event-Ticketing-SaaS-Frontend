'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Share2, Download, ChevronDown, Plus, Minus, X, FileText } from 'lucide-react';
import { Event, Ticket } from '../../types';
import '../styles/theme.css';

interface EventLandingPageProps {
    event: Event & {
        bannerImages?: string[];
        gallery?: string[];
        fullDescription?: string;
        schedule?: { time: string; activity: string; description?: string }[];
        faq?: { question: string; answer: string }[];
        themeCustomization?: {
            primaryColor?: string;
            secondaryColor?: string;
            logo?: string;
        };
    };
    tickets: Ticket[];
    tenantName: string;
}

export default function EventLandingPage({ event, tickets, tenantName }: EventLandingPageProps) {
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const eventDate = new Date(event.startAt);
    const totalPrice = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
        const ticket = tickets.find(t => t.id === ticketId);
        return sum + (ticket ? ticket.price * qty : 0);
    }, 0);

    const customColors = event.themeCustomization || {};
    const primaryColor = customColors.primaryColor || '#2563eb';
    const secondaryColor = customColors.secondaryColor || '#64748b';

    return (
        <div className="professional-corporate min-h-screen bg-slate-50" style={{
            '--custom-primary': primaryColor,
            '--custom-secondary': secondaryColor,
        } as React.CSSProperties}>

            {/* Hero Banner */}
            <section className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800">
                {event.bannerImages && event.bannerImages[0] && (
                    <>
                        <img src={event.bannerImages[0]} alt={event.name} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
                    </>
                )}

                <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
                            {eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            {event.name}
                        </h1>
                        <p className="text-xl text-blue-100 mb-6">{event.venue}, {event.city}</p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                                Register Now
                            </button>
                            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                                <p className="text-xs text-slate-500 uppercase tracking-wide">Date</p>
                                <p className="font-semibold text-slate-900">
                                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                                <p className="text-xs text-slate-500 uppercase tracking-wide">Time</p>
                                <p className="font-semibold text-slate-900">
                                    {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                                <p className="text-xs text-slate-500 uppercase tracking-wide">Venue</p>
                                <p className="font-semibold text-slate-900">{event.venue}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg p-6 border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Event</h2>
                            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                                {event.fullDescription || event.description}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share Event
                                </button>
                                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Add to Calendar
                                </button>
                            </div>
                        </div>

                        {/* Schedule Table */}
                        {event.schedule && event.schedule.length > 0 && (
                            <div className="bg-white rounded-lg p-6 border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Event Agenda</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">Time</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">Activity</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 uppercase tracking-wide">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {event.schedule.map((item, index) => (
                                                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                                    <td className="py-3 px-4 font-semibold text-blue-600">{item.time}</td>
                                                    <td className="py-3 px-4 font-medium text-slate-900">{item.activity}</td>
                                                    <td className="py-3 px-4 text-slate-600 text-sm">{item.description || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* FAQ */}
                        {event.faq && event.faq.length > 0 && (
                            <div className="bg-white rounded-lg p-6 border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                                <div className="space-y-2">
                                    {event.faq.map((faq, index) => (
                                        <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <h4 className="font-semibold text-slate-900 text-left">{faq.question}</h4>
                                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openFAQ === index && (
                                                <div className="px-4 pb-4 text-slate-700 border-t border-slate-100">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Registration */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 border border-slate-200 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Registration</h3>

                            <div className="space-y-3 mb-6">
                                {tickets.map((ticket) => {
                                    const available = ticket.quantity - ticket.soldCount;
                                    const quantity = selectedTickets[ticket.id] || 0;

                                    return (
                                        <div key={ticket.id} className="border border-slate-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{ticket.name}</h4>
                                                    {ticket.description && (
                                                        <p className="text-xs text-slate-600 mt-1">{ticket.description}</p>
                                                    )}
                                                </div>
                                                <p className="text-lg font-bold text-blue-600">৳{ticket.price}</p>
                                            </div>

                                            {available > 0 ? (
                                                <div className="flex items-center justify-between mt-3">
                                                    <p className="text-xs text-slate-500">{available} seats available</p>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedTickets(prev => ({ ...prev, [ticket.id]: Math.max(0, quantity - 1) }))}
                                                            disabled={quantity === 0}
                                                            className="w-8 h-8 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-50 flex items-center justify-center"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-semibold">{quantity}</span>
                                                        <button
                                                            onClick={() => setSelectedTickets(prev => ({ ...prev, [ticket.id]: Math.min(available, quantity + 1) }))}
                                                            disabled={quantity >= available}
                                                            className="w-8 h-8 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-red-600 font-semibold">Sold Out</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-600">Total Amount</span>
                                    <span className="text-2xl font-bold text-blue-600">৳{totalPrice.toFixed(2)}</span>
                                </div>

                                <button
                                    disabled={totalPrice === 0}
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Complete Registration
                                </button>

                                <p className="text-xs text-slate-500 text-center mt-3">
                                    Secure payment processing
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 py-8 px-4 mt-12">
                <div className="max-w-7xl mx-auto text-center text-slate-400">
                    <p>© {new Date().getFullYear()} {tenantName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
