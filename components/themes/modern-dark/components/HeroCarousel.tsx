'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
    images: string[];
    eventName: string;
    eventDate: Date;
    venue: string;
    city: string;
}

export default function HeroCarousel({ images, eventName, eventDate, venue, city }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((curr) => (curr - 1 + images.length) % images.length);

    return (
        <section className="relative h-screen">
            {/* Background Image */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img src={image} alt={eventName} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950"></div>
                </div>
            ))}

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center max-w-4xl">
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                        {eventName}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xl text-slate-300 mb-8">
                        <span>{eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{venue}, {city}</span>
                    </div>
                    <button className="btn-primary px-8 py-4 text-lg glow-pulse">
                        Get Tickets
                    </button>
                </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-emerald-500 w-8' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
