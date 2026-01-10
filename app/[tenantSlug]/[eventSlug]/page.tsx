import { notFound } from 'next/navigation';
import ModernDarkEventPage from '@/components/themes/modern-dark/components/EventLandingPage';
import VibrantFestivalEventPage from '@/components/themes/vibrant-festival/components/EventLandingPage';
import ProfessionalCorporateEventPage from '@/components/themes/professional-corporate/components/EventLandingPage';

interface PageProps {
    params: Promise<{
        tenantSlug: string;
        eventSlug: string;
    }>;
}

async function getEventData(tenantSlug: string, eventSlug: string) {
    try {
        const res = await fetch(
            `http://localhost:7000/public/${tenantSlug}/${eventSlug}`,
            { cache: 'no-store' }
        );

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

async function getTickets(eventId: string) {
    try {
        const res = await fetch(
            `http://localhost:7000/tickets/event/${eventId}`,
            { cache: 'no-store' }
        );

        if (!res.ok) {
            return [];
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return [];
    }
}

export default async function PublicEventPage({ params }: PageProps) {
    // Await params to unwrap the Promise (Next.js 15+)
    const { tenantSlug, eventSlug } = await params;

    const data = await getEventData(tenantSlug, eventSlug);

    if (!data || !data.event) {
        notFound();
    }

    const { event } = data;
    const tickets = await getTickets(event.id);

    // Dynamically load theme based on event.theme.name
    const themeName = event.theme?.name || 'Modern Dark';
    const tenantName = event.tenant?.name || tenantSlug;

    const themeComponents: Record<string, any> = {
        'Modern Dark': ModernDarkEventPage,
        'Vibrant Festival': VibrantFestivalEventPage,
        'Professional Corporate': ProfessionalCorporateEventPage,
    };

    const ThemeComponent = themeComponents[themeName] || ModernDarkEventPage;

    return (
        <ThemeComponent
            event={event}
            tickets={tickets}
            tenantName={tenantName}
        />
    );
}
