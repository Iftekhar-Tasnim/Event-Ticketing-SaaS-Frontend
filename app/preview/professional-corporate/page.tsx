'use client';

import EventLandingPage from '@/components/themes/professional-corporate/components/EventLandingPage';

export default function ProfessionalCorporatePreview() {
    const sampleEvent = {
        id: '3',
        slug: 'tech-summit-2026',
        name: 'Bangladesh Tech Summit 2026',
        description: 'Leading technology conference for innovators and entrepreneurs',
        fullDescription: 'Join us for the premier technology conference in Bangladesh. The Tech Summit 2026 brings together industry leaders, innovators, and entrepreneurs for two days of insightful keynotes, panel discussions, and networking opportunities.\n\nConference Highlights:\n• 30+ Expert Speakers\n• Industry-Leading Keynotes\n• Interactive Workshops\n• Startup Pitch Competition\n• Networking Sessions\n• Exhibition Hall with 50+ Booths\n• Certificate of Participation',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920',
        startAt: new Date('2026-09-10T09:00:00'),
        endAt: new Date('2026-09-11T18:00:00'),
        venue: 'International Convention City Bashundhara',
        city: 'Dhaka',
        country: 'Bangladesh',
        price: 5000,
        status: 'published',
        capacity: 2000,
        soldCount: 1500,
        bannerImages: [
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920',
            'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920',
        ],
        gallery: [
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
            'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
        ],
        schedule: [
            { time: '09:00', activity: 'Registration & Breakfast', description: 'Check-in and networking breakfast' },
            { time: '10:00', activity: 'Opening Keynote', description: 'Future of Technology in Bangladesh' },
            { time: '11:30', activity: 'Panel Discussion', description: 'AI & Machine Learning Applications' },
            { time: '13:00', activity: 'Lunch Break', description: 'Networking lunch' },
            { time: '14:30', activity: 'Workshop Sessions', description: 'Hands-on technical workshops' },
            { time: '16:00', activity: 'Startup Pitches', description: 'Emerging startups present their ideas' },
            { time: '17:30', activity: 'Closing Remarks', description: 'Summary and networking' },
        ],
        faq: [
            { question: 'Who should attend?', answer: 'Tech professionals, entrepreneurs, students, and anyone interested in technology and innovation.' },
            { question: 'Will there be certificates?', answer: 'Yes, all attendees will receive a certificate of participation.' },
            { question: 'Is lunch included?', answer: 'Yes, lunch and refreshments are included in the ticket price.' },
            { question: 'Can I get a refund?', answer: 'Refunds are available up to 7 days before the event.' },
        ],
        themeCustomization: {
            primaryColor: '#2563eb',
            secondaryColor: '#64748b',
        },
    };

    const sampleTickets = [
        {
            id: 't1',
            eventId: '3',
            name: 'Standard Pass',
            description: 'Access to all sessions, lunch, and networking events',
            price: 5000,
            quantity: 1500,
            soldCount: 1000,
            status: 'available',
        },
        {
            id: 't2',
            eventId: '3',
            name: 'VIP Pass',
            description: 'Front-row seating, exclusive networking lounge, and event materials',
            price: 12000,
            quantity: 300,
            soldCount: 250,
            status: 'available',
        },
        {
            id: 't3',
            eventId: '3',
            name: 'Student Pass',
            description: 'Discounted rate for students (ID required)',
            price: 2500,
            quantity: 200,
            soldCount: 150,
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
