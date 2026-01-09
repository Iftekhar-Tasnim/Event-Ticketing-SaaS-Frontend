'use client';

import { ArrowRight, Calendar, Users, Award } from 'lucide-react';
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
        <div className="professional-corporate">
            <Header tenantName={tenantName} />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            Professional Events Platform
                        </div>

                        <h1 className="text-5xl font-bold text-slate-900 mb-6">
                            Elevate Your Professional
                            <br />
                            <span className="text-blue-600">Development Journey</span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-8">
                            Discover conferences, seminars, and networking events designed for professionals and businesses.
                        </p>

                        <div className="flex gap-4">
                            <button className="btn-primary px-6 py-3">
                                Browse Events
                                <ArrowRight className="inline-block ml-2 w-5 h-5" />
                            </button>
                            <button className="btn-outline px-6 py-3">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 px-4 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-slate-900">500+</div>
                            <div className="text-slate-600">Events Hosted</div>
                        </div>
                        <div className="text-center">
                            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-slate-900">50K+</div>
                            <div className="text-slate-600">Professionals</div>
                        </div>
                        <div className="text-center">
                            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-slate-900">98%</div>
                            <div className="text-slate-600">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Events</h2>
                            <p className="text-slate-600">Handpicked professional development opportunities</p>
                        </div>
                        <a href="/events" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                            View All
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>

                    <div className="space-y-4">
                        {featuredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Upcoming Events</h2>

                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 px-4 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Informed</h2>
                    <p className="text-blue-100 mb-8">
                        Get updates on upcoming professional events and exclusive early access
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white"
                        />
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-800 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p>© {new Date().getFullYear()} {tenantName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
