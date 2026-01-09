'use client';

import Link from 'next/link';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { Event } from '../../types';
import '../styles/theme.css';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const eventDate = new Date(event.startAt);
    const percentageSold = (event.soldCount / event.capacity) * 100;

    return (
        <Link href={`/events/${event.slug}`}>
            <div className="vibrant-festival card group cursor-pointer">
                <div className="relative h-56 mb-4 rounded-2xl overflow-hidden">
                    <img
                        src={event.imageUrl || '/placeholder-event.jpg'}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-5 h-5 text-orange-500" />
                    </button>
                    {percentageSold > 80 && (
                        <div className="absolute top-4 left-4 badge-secondary">
                            🔥 Hot!
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <span className="badge-primary text-xs">
                        {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {event.name}
                </h3>

                <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center text-stone-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                        {event.city}
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-stone-500">From</div>
                        <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                            ৳{event.price}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
