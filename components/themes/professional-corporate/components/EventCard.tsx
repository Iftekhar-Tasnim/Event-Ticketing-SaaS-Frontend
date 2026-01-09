'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Event } from '../../types';
import '../styles/theme.css';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const eventDate = new Date(event.startAt);

    return (
        <Link href={`/events/${event.slug}`}>
            <div className="professional-corporate card group cursor-pointer">
                <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={event.imageUrl || '/placeholder-event.jpg'}
                            alt={event.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                            {event.name}
                        </h3>

                        <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-2">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                                {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                                {event.city}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">From <span className="text-lg font-semibold text-blue-600">৳{event.price}</span></span>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
