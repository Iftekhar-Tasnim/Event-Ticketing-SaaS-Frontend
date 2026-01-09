'use client';

import EventLandingPage from '@/components/themes/modern-dark/components/EventLandingPage';

export default function ModernDarkPreview() {
    const sampleEvent = {
        id: '1',
        slug: 'summer-music-festival-2026',
        name: 'Summer Music Festival 2026',
        description: 'Join us for the biggest music festival of the year!',
        fullDescription: 'Experience three days of non-stop music, food, and fun at the Summer Music Festival 2026. Featuring top artists from around the world, multiple stages, food trucks, and camping options. This is the event you don\'t want to miss!\n\nHighlights:\n• 50+ International Artists\n• 5 Stages with Different Genres\n• Gourmet Food Court\n• VIP Lounge Access\n• Camping & Glamping Options\n• Art Installations & Workshops',
        imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920',
        startAt: new Date('2026-07-15T18:00:00'),
        endAt: new Date('2026-07-17T23:00:00'),
        venue: 'National Stadium',
        city: 'Dhaka',
        country: 'Bangladesh',
        price: 2500,
        status: 'published',
        capacity: 50000,
        soldCount: 35000,
        bannerImages: [
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        ],
        schedule: [
            { time: '18:00', activity: 'Gates Open', description: 'Entry and registration begins' },
            { time: '19:00', activity: 'Opening Act', description: 'Local bands kick off the festival' },
            { time: '21:00', activity: 'Main Stage Headliner', description: 'International superstar performance' },
            { time: '23:00', activity: 'DJ Set', description: 'Electronic music until late' },
        ],
        faq: [
            { question: 'What time does the event start?', answer: 'Gates open at 6:00 PM. The first performance starts at 7:00 PM.' },
            { question: 'Is food available at the venue?', answer: 'Yes! We have a gourmet food court with 20+ food trucks offering diverse cuisines.' },
            { question: 'Can I bring my own food and drinks?', answer: 'Outside food and beverages are not permitted. We have plenty of options inside.' },
            { question: 'Is there parking available?', answer: 'Yes, free parking is available at the stadium. Shuttle services also run from major points.' },
        ],
        themeCustomization: {
            primaryColor: '#10b981',
            secondaryColor: '#f59e0b',
        },
    };

    const sampleTickets = [
        {
            id: 't1',
            eventId: '1',
            name: 'General Admission',
            description: 'Access to all stages and general seating areas',
            price: 2500,
            quantity: 30000,
            soldCount: 20000,
            status: 'available',
        },
        {
            id: 't2',
            eventId: '1',
            name: 'VIP Pass',
            description: 'VIP seating, backstage access, and exclusive lounge',
            price: 7500,
            quantity: 5000,
            soldCount: 4500,
            status: 'available',
        },
        {
            id: 't3',
            eventId: '1',
            name: 'Early Bird',
            description: 'Discounted early bird tickets (limited availability)',
            price: 1999,
            quantity: 10000,
            soldCount: 10000,
            status: 'sold_out',
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
