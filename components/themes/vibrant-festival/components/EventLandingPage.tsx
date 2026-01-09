'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Share2, Heart, ChevronLeft, ChevronRight, Plus, Minus, ChevronDown, X } from 'lucide-react';
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
    const [currentBanner, setCurrentBanner] = useState(0);
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [lightboxImage, setLightboxImage] = useState<number | null>(null);

    const banners = event.bannerImages || [event.imageUrl];
    const eventDate = new Date(event.startAt);
    const totalPrice = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
        const ticket = tickets.find(t => t.id === ticketId);
        return sum + (ticket ? ticket.price * qty : 0);
    }, 0);

    const customColors = event.themeCustomization || {};
    const primaryColor = customColors.primaryColor || '#f97316';
    const secondaryColor = customColors.secondaryColor || '#8b5cf6';

    return (
        <div className="vibrant-festival min-h-screen" style={{
            '--custom-primary': primaryColor,
            '--custom-secondary': secondaryColor,
        } as React.CSSProperties}>

            {/* Hero Carousel */}
            <section className="relative h-screen overflow-hidden">
                {banners.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                            }`}
                    >
                        <img src={image} alt={event.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/20 to-orange-50"></div>
                    </div>
                ))}

                <div className="relative z-10 h-full flex items-center justify-center px-4 text-center">
                    <div className="max-w-4xl animate-bounce-in">
                        <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-violet-500 rounded-full text-white font-bold mb-6 animate-pulse">
                            🎉 {eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 leading-tight drop-shadow-lg">
                            {event.name}
                        </h1>
                        <p className="text-2xl text-slate-700 mb-8">{event.venue}, {event.city}</p>
                        <button className="btn-primary px-10 py-5 text-xl font-bold shadow-2xl hover:scale-110 transition-transform">
                            🎫 Get Your Tickets Now!
                        </button>
                    </div>
                </div>

                {banners.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentBanner((currentBanner - 1 + banners.length) % banners.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                        >
                            <ChevronLeft className="w-6 h-6 text-orange-500" />
                        </button>
                        <button
                            onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                        >
                            <ChevronRight className="w-6 h-6 text-orange-500" />
                        </button>
                    </>
                )}
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="card-colorful bg-gradient-to-br from-orange-400 to-pink-500">
                                <Calendar className="w-8 h-8 text-white mb-2" />
                                <p className="text-white/80 text-sm font-semibold">Date</p>
                                <p className="text-white font-bold text-lg">
                                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="card-colorful bg-gradient-to-br from-violet-400 to-purple-500">
                                <Clock className="w-8 h-8 text-white mb-2" />
                                <p className="text-white/80 text-sm font-semibold">Time</p>
                                <p className="text-white font-bold text-lg">
                                    {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="card-colorful bg-gradient-to-br from-blue-400 to-cyan-500">
                                <MapPin className="w-8 h-8 text-white mb-2" />
                                <p className="text-white/80 text-sm font-semibold">Venue</p>
                                <p className="text-white font-bold text-lg">{event.venue}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="card">
                            <h2 className="text-4xl font-black text-slate-900 mb-4 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                About This Event
                            </h2>
                            <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                                {event.fullDescription || event.description}
                            </div>

                            <div className="mt-6 flex gap-4">
                                <button className="btn-outline flex items-center gap-2">
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                                <button className="btn-outline flex items-center gap-2">
                                    <Heart className="w-5 h-5" />
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Gallery */}
                        {event.gallery && event.gallery.length > 0 && (
                            <div className="card">
                                <h2 className="text-4xl font-black text-slate-900 mb-6 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                    Event Gallery
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {event.gallery.map((image, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setLightboxImage(index)}
                                            className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group hover:scale-105 transition-transform"
                                        >
                                            <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Schedule */}
                        {event.schedule && event.schedule.length > 0 && (
                            <div className="card">
                                <h2 className="text-4xl font-black text-slate-900 mb-6 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                    Event Schedule
                                </h2>
                                <div className="space-y-4">
                                    {event.schedule.map((item, index) => (
                                        <div key={index} className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-violet-50 hover:shadow-lg transition-shadow">
                                            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-violet-500 flex items-center justify-center text-white font-bold">
                                                {item.time}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg text-slate-900">{item.activity}</h4>
                                                {item.description && <p className="text-slate-600 mt-1">{item.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQ */}
                        {event.faq && event.faq.length > 0 && (
                            <div className="card">
                                <h2 className="text-4xl font-black text-slate-900 mb-6 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                    FAQ
                                </h2>
                                <div className="space-y-3">
                                    {event.faq.map((faq, index) => (
                                        <div key={index} className="rounded-2xl overflow-hidden border-2 border-orange-200">
                                            <button
                                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                                className="w-full flex items-center justify-between p-4 bg-white hover:bg-orange-50 transition-colors"
                                            >
                                                <h4 className="font-bold text-slate-900 text-left">{faq.question}</h4>
                                                <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openFAQ === index && (
                                                <div className="p-4 bg-orange-50 border-t-2 border-orange-200">
                                                    <p className="text-slate-700">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Tickets */}
                    <div className="lg:col-span-1">
                        <div className="card sticky top-24">
                            <h3 className="text-3xl font-black text-slate-900 mb-6 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                Get Tickets
                            </h3>

                            <div className="space-y-4 mb-6">
                                {tickets.map((ticket) => {
                                    const available = ticket.quantity - ticket.soldCount;
                                    const quantity = selectedTickets[ticket.id] || 0;

                                    return (
                                        <div key={ticket.id} className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-violet-50 border-2 border-orange-200">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{ticket.name}</h4>
                                                    {ticket.description && <p className="text-sm text-slate-600 mt-1">{ticket.description}</p>}
                                                </div>
                                                <p className="text-2xl font-black bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                                    ৳{ticket.price}
                                                </p>
                                            </div>

                                            {available > 0 ? (
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-slate-600">{available} left</p>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setSelectedTickets(prev => ({ ...prev, [ticket.id]: Math.max(0, quantity - 1) }))}
                                                            disabled={quantity === 0}
                                                            className="w-10 h-10 rounded-full bg-white border-2 border-orange-300 hover:bg-orange-50 disabled:opacity-50 flex items-center justify-center"
                                                        >
                                                            <Minus className="w-4 h-4 text-orange-500" />
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-slate-900">{quantity}</span>
                                                        <button
                                                            onClick={() => setSelectedTickets(prev => ({ ...prev, [ticket.id]: Math.min(available, quantity + 1) }))}
                                                            disabled={quantity >= available}
                                                            className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-violet-500 hover:shadow-lg disabled:opacity-50 flex items-center justify-center"
                                                        >
                                                            <Plus className="w-4 h-4 text-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-red-500 font-bold">Sold Out</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t-2 border-orange-200 pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-600 font-semibold">Total</span>
                                    <span className="text-4xl font-black bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                                        ৳{totalPrice.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    disabled={totalPrice === 0}
                                    className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-orange-400 to-violet-500 text-white hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    🎉 Checkout Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxImage !== null && event.gallery && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <img
                        src={event.gallery[lightboxImage]}
                        alt={`Gallery ${lightboxImage + 1}`}
                        className="max-w-full max-h-full object-contain rounded-2xl"
                    />
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gradient-to-r from-orange-500 to-violet-500 py-8 px-4">
                <div className="max-w-7xl mx-auto text-center text-white">
                    <p className="font-bold">© {new Date().getFullYear()} {tenantName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
