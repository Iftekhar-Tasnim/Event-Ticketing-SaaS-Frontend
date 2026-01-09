'use client';

import EventLandingPage from '@/components/themes/vibrant-festival/components/EventLandingPage';

export default function VibrantFestivalPreview() {
    const sampleEvent = {
        id: '2',
        slug: 'color-fest-2026',
        name: 'Color Fest 2026',
        description: 'The most colorful festival of the year!',
        fullDescription: 'Get ready for an explosion of colors, music, and joy at Color Fest 2026! This outdoor celebration brings together thousands of people for a day of vibrant fun, live performances, and unforgettable memories.\n\nWhat to Expect:\n🎨 Color Powder Stations\n🎵 Live DJ Performances\n🍔 Food & Beverage Stalls\n📸 Instagram-Worthy Moments\n🎉 Dance Competitions\n🎁 Exciting Prizes',
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920',
        startAt: new Date('2026-08-20T14:00:00'),
        endAt: new Date('2026-08-20T22:00:00'),
        venue: 'Hatirjheel Amphitheatre',
        city: 'Dhaka',
        country: 'Bangladesh',
        price: 1500,
        status: 'published',
        capacity: 15000,
        soldCount: 8000,
        bannerImages: [
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
        ],
        schedule: [
            { time: '14:00', activity: 'Gates Open', description: 'Registration and entry' },
            { time: '15:00', activity: 'Color Throw #1', description: 'First color explosion!' },
            { time: '17:00', activity: 'Live Performances', description: 'Top artists take the stage' },
            { time: '19:00', activity: 'Color Throw #2', description: 'Grand finale color party' },
        ],
        faq: [
            { question: 'What should I wear?', answer: 'Wear white clothes! We provide color powder, and white shows the colors best.' },
            { question: 'Is it safe for kids?', answer: 'Absolutely! Our color powder is 100% organic and safe for all ages.' },
            { question: 'Can I bring my camera?', answer: 'Yes, but we recommend waterproof cases as the powder can get everywhere!' },
        ],
        themeCustomization: {
            primaryColor: '#f97316',
            secondaryColor: '#8b5cf6',
        },
    };

    const sampleTickets = [
        {
            id: 't1',
            eventId: '2',
            name: 'Regular Entry',
            description: 'Access to all color zones and performances',
            price: 1500,
            quantity: 10000,
            soldCount: 6000,
            status: 'available',
        },
        {
            id: 't2',
            eventId: '2',
            name: 'VIP Experience',
            description: 'Premium zone, extra color powder, and exclusive merchandise',
            price: 3500,
            quantity: 2000,
            soldCount: 1500,
            status: 'available',
        },
    ];

    return (
        <EventLandingPage
            event={sampleEvent as any}
            tickets={sampleTickets as any}
            tenantName="TicketBD"
        />
    );
}
