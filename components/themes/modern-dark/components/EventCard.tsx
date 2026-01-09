'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../types';
import '../styles/theme.css';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const eventDate = new Date(event.startAt);
    const availableTickets = event.capacity - event.soldCount;
    const percentageSold = (event.soldCount / event.capacity) * 100;

    return (
        <Link href={`/events/${event.slug}`}>
            <div className="modern-dark card group cursor-pointer overflow-hidden">
                {/* Image */}
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                        src={event.imageUrl || '/placeholder-event.jpg'}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {percentageSold > 80 && (
                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Almost Sold Out!
                        </div>
                    )}
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors">
                        {event.name}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                        {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-slate-400 text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                            {eventDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center text-slate-400 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                            {event.venue}, {event.city}
                        </div>
                        <div className="flex items-center text-slate-400 text-sm">
                            <Users className="w-4 h-4 mr-2 text-emerald-500" />
                            {availableTickets} tickets available
                        </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-slate-400 text-xs">Starting from</span>
                            <div className="text-2xl font-bold text-emerald-500">
                                ৳{event.price.toFixed(2)}
                            </div>
                        </div>
                        <button className="btn-primary px-6 py-2 text-sm">
                            Get Tickets
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
