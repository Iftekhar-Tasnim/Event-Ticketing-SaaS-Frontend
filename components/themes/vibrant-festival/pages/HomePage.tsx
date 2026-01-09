'use client';

import { ArrowRight, Calendar, Music, Ticket } from 'lucide-react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { Event } from '../../types';
import '../styles/theme.css';

interface HomePageProps {
    tenantName: string;
    featuredEvents: Event[];
    upcomingEvents: Event[];
}

export default function HomePage({ tenantName, featuredEvents, upcomingEvents }: HomePageProps) {
    return (
        <div className="vibrant-festival">
            <Header tenantName={tenantName} />

            {/* Hero Section */}
            <section className="relative py-20 px-4" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)' }}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white shadow-md">
                        <span className="bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent font-bold">
                            ✨ Live Events & Festivals
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black mb-6">
                        Experience the
                        <br />
                        <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                            Magic of Live Events
                        </span>
                    </h1>

                    <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
                        Discover amazing festivals, concerts, and cultural events happening near you
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary px-8 py-4 text-lg">
                            Explore Events
                            <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </button>
                        <button className="btn-outline px-8 py-4 text-lg">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Category Pills */}
            <section className="py-8 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {['Music', 'Food & Drink', 'Arts', 'Sports', 'Cultural', 'Family'].map((category) => (
                            <button key={category} className="badge-primary whitespace-nowrap">
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">🎉 Featured Events</h2>
                            <p className="text-stone-600">Don't miss these amazing experiences</p>
                        </div>
                        <a href="/events" className="text-orange-500 hover:text-orange-600 font-bold flex items-center">
                            View All
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>

                    <div className="grid-3 bounce-in">
                        {featuredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-violet-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-10 text-center">🎪 Upcoming Events</h2>

                    <div className="grid-3">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card-gradient p-12">
                        <h2 className="text-3xl font-bold mb-4">🎊 Join the Party!</h2>
                        <p className="text-stone-600 mb-8">
                            Get exclusive access to early bird tickets and special offers
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input type="email" placeholder="Enter your email" className="flex-1" />
                            <button className="btn-primary px-8 py-3">Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t-2 border-orange-100 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-stone-600">© {new Date().getFullYear()} {tenantName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
