'use client';

import EventEditor from '@/components/tenant-admin/EventEditor';

export default function EditEventPage({ params }: { params: { id: string } }) {
    return <EventEditor eventId={params.id} isEdit={true} />;
}
