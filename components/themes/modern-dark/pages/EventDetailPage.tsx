'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Share2, Heart, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Event, Ticket } from '../../types';
import '../styles/theme.css';

interface EventDetailPageProps {
    tenantName: string;
    event: Event;
    tickets: Ticket[];
}

export default function EventDetailPage({ tenantName, event, tickets }: EventDetailPageProps) {
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

    const eventDate = new Date(event.startAt);
    const totalPrice = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
        const ticket = tickets.find(t => t.id === ticketId);
        return sum + (ticket ? ticket.price * qty : 0);
    }, 0);

    const updateQuantity = (ticketId: string, delta: number) => {
        setSelectedTickets(prev => {
            const current = prev[ticketId] || 0;
            const newQty = Math.max(0, current + delta);
            if (newQty === 0) {
                const { [ticketId]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [ticketId]: newQty };
        });
    };

    return (
        <div className="modern-dark min-h-screen">
            <Header tenantName={tenantName} />

            {/* Hero Image */}
            <section className="relative h-96">
                <img
                    src={event.imageUrl || '/placeholder-event.jpg'}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            </section>

            {/* Event Details */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Title and Actions */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-5xl font-black text-white mb-4">{event.name}</h1>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Heart className="w-5 h-5" />
                                            <span>Save</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Share2 className="w-5 h-5" />
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Event Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="card">
                                    <Calendar className="w-6 h-6 text-emerald-500 mb-2" />
                                    <p className="text-slate-400 text-sm">Date & Time</p>
                                    <p className="text-white font-semibold">
                                        {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                <div className="card">
                                    <MapPin className="w-6 h-6 text-emerald-500 mb-2" />
                                    <p className="text-slate-400 text-sm">Location</p>
                                    <p className="text-white font-semibold">{event.venue}</p>
                                    <p className="text-slate-400 text-sm">{event.city}, Bangladesh</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="card mb-8">
                                <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            {/* Venue Map Placeholder */}
                            <div className="card">
                                <h2 className="text-2xl font-bold text-white mb-4">Venue Location</h2>
                                <div className="bg-slate-800 rounded-lg h-64 flex items-center justify-center">
                                    <p className="text-slate-400">Map integration coming soon</p>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Selection Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="card-glass sticky top-24">
                                <h3 className="text-2xl font-bold text-white mb-6">Select Tickets</h3>

                                <div className="space-y-4 mb-6">
                                    {tickets.map((ticket) => {
                                        const available = ticket.quantity - ticket.soldCount;
                                        const quantity = selectedTickets[ticket.id] || 0;

                                        return (
                                            <div key={ticket.id} className="card">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-white font-semibold">{ticket.name}</h4>
                                                        {ticket.description && (
                                                            <p className="text-slate-400 text-sm">{ticket.description}</p>
                                                        )}
                                                    </div>
                                                    <p className="text-emerald-500 font-bold text-lg">৳{ticket.price}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <p className="text-slate-400 text-sm">
                                                        {available} available
                                                    </p>

                                                    {available > 0 ? (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(ticket.id, -1)}
                                                                disabled={quantity === 0}
                                                                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                                            >
                                                                <Minus className="w-4 h-4 text-white" />
                                                            </button>
                                                            <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(ticket.id, 1)}
                                                                disabled={quantity >= available}
                                                                className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                                            >
                                                                <Plus className="w-4 h-4 text-white" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-amber-500 font-semibold text-sm">Sold Out</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Total and Checkout */}
                                <div className="border-t border-slate-700 pt-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-slate-400">Total</span>
                                        <span className="text-3xl font-bold text-emerald-500">৳{totalPrice.toFixed(2)}</span>
                                    </div>

                                    <button
                                        disabled={totalPrice === 0}
                                        className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer tenantName={tenantName} />
        </div>
    );
}
