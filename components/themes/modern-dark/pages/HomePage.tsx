'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
        <div className="modern-dark">
            <Header tenantName={tenantName} />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="/hero-concert.jpg"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <div className="flex items-center justify-center mb-6">
                        <Sparkles className="w-8 h-8 text-emerald-500 mr-2" />
                        <span className="text-emerald-500 font-semibold uppercase tracking-wider text-sm">
                            Live Events & Experiences
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                        Unforgettable
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                            Moments Await
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Discover and book tickets to the hottest concerts, festivals, and nightlife events in your city.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary px-8 py-4 text-lg glow-pulse">
                            Explore Events
                            <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </button>
                        <button className="btn-outline px-8 py-4 text-lg">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-emerald-500 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">Featured Events</h2>
                            <p className="text-slate-400">Don't miss out on these incredible experiences</p>
                        </div>
                        <a href="/events" className="text-emerald-500 hover:text-emerald-400 font-semibold flex items-center">
                            View All
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>

                    <div className="grid-3 fade-in">
                        {featuredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-20 px-4" style={{ background: '#0f172a' }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center">Upcoming Events</h2>

                    <div className="grid-3">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card-glass p-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
                        <p className="text-slate-400 mb-8">
                            Get notified about the latest events, exclusive offers, and early bird tickets.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1"
                            />
                            <button className="btn-primary px-8 py-3">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer tenantName={tenantName} />
        </div>
    );
}
