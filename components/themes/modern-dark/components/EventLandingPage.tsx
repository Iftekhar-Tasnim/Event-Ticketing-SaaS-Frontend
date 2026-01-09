'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Share2, Heart } from 'lucide-react';
import HeroCarousel from './HeroCarousel';
import TicketSidebar from './TicketSidebar';
import ImageGallery from './ImageGallery';
import ScheduleTimeline from './ScheduleTimeline';
import FAQAccordion from './FAQAccordion';
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

    const eventDate = new Date(event.startAt);
    const totalPrice = Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
        const ticket = tickets.find(t => t.id === ticketId);
        return sum + (ticket ? ticket.price * qty : 0);
    }, 0);

    // Apply theme customization
    const customColors = event.themeCustomization || {};
    const primaryColor = customColors.primaryColor || '#10b981';
    const secondaryColor = customColors.secondaryColor || '#f59e0b';

    return (
        <div className="modern-dark" style={{
            '--custom-primary': primaryColor,
            '--custom-secondary': secondaryColor,
        } as React.CSSProperties}>

            {/* Hero Carousel */}
            <HeroCarousel
                images={event.bannerImages || [event.imageUrl]}
                eventName={event.name}
                eventDate={eventDate}
                venue={event.venue}
                city={event.city}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="card">
                                <Calendar className="w-6 h-6 text-emerald-500 mb-2" />
                                <p className="text-slate-400 text-sm">Date</p>
                                <p className="text-white font-semibold">
                                    {eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="card">
                                <Clock className="w-6 h-6 text-emerald-500 mb-2" />
                                <p className="text-slate-400 text-sm">Time</p>
                                <p className="text-white font-semibold">
                                    {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="card">
                                <MapPin className="w-6 h-6 text-emerald-500 mb-2" />
                                <p className="text-slate-400 text-sm">Venue</p>
                                <p className="text-white font-semibold">{event.venue}</p>
                                <p className="text-slate-400 text-xs">{event.city}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="card-glass">
                            <h2 className="text-3xl font-bold text-white mb-4">About This Event</h2>
                            <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {event.fullDescription || event.description}
                            </div>

                            {/* Share Buttons */}
                            <div className="mt-6 flex items-center gap-4">
                                <button className="btn-outline flex items-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share Event
                                </button>
                                <button className="btn-outline flex items-center gap-2">
                                    <Heart className="w-4 h-4" />
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {event.gallery && event.gallery.length > 0 && (
                            <ImageGallery images={event.gallery} />
                        )}

                        {/* Schedule */}
                        {event.schedule && event.schedule.length > 0 && (
                            <ScheduleTimeline schedule={event.schedule} />
                        )}

                        {/* FAQ */}
                        {event.faq && event.faq.length > 0 && (
                            <FAQAccordion faqs={event.faq} />
                        )}
                    </div>

                    {/* Right Column - Ticket Sidebar */}
                    <div className="lg:col-span-1">
                        <TicketSidebar
                            tickets={tickets}
                            selectedTickets={selectedTickets}
                            onUpdateQuantity={(ticketId, quantity) => {
                                setSelectedTickets(prev => {
                                    if (quantity === 0) {
                                        const { [ticketId]: _, ...rest } = prev;
                                        return rest;
                                    }
                                    return { ...prev, [ticketId]: quantity };
                                });
                            }}
                            totalPrice={totalPrice}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4">
                <div className="max-w-7xl mx-auto text-center text-slate-400">
                    <p>© {new Date().getFullYear()} {tenantName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
