'use client';

import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { Event } from '../../types';
import '../styles/theme.css';

interface EventsPageProps {
    tenantName: string;
    events: Event[];
}

export default function EventsPage({ tenantName, events }: EventsPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const cities = ['all', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'];

    return (
        <div className="modern-dark min-h-screen">
            <Header tenantName={tenantName} />

            {/* Page Header */}
            <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)' }}>
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-black text-white mb-4">Discover Events</h1>
                    <p className="text-xl text-slate-400">Find your next unforgettable experience</p>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="py-8 px-4 sticky top-16 z-40" style={{ background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #1e293b' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12"
                            />
                        </div>

                        {/* City Filter */}
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="pl-12 pr-8 min-w-[200px]"
                            >
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city === 'all' ? 'All Cities' : city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="pl-12 pr-8 min-w-[200px]"
                            >
                                <option value="all">All Prices</option>
                                <option value="free">Free</option>
                                <option value="0-1000">৳0 - ৳1,000</option>
                                <option value="1000-5000">৳1,000 - ৳5,000</option>
                                <option value="5000+">৳5,000+</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-12 pr-8 min-w-[200px]"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-slate-400">
                            Showing <span className="text-white font-semibold">{events.length}</span> events
                        </p>
                        <button className="text-emerald-500 hover:text-emerald-400 font-semibold flex items-center">
                            <Filter className="w-4 h-4 mr-2" />
                            More Filters
                        </button>
                    </div>

                    <div className="grid-3">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12 flex justify-center gap-2">
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg">1</button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">2</button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">3</button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </section>

            <Footer tenantName={tenantName} />
        </div>
    );
}
