'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import BasicInfoTab from './tabs/BasicInfoTab';
import ThemeSelectionTab from './tabs/ThemeSelectionTab';
import ImagesTab from './tabs/ImagesTab';
import TicketsTab from './tabs/TicketsTab';
import ScheduleTab from './tabs/ScheduleTab';
import FAQTab from './tabs/FAQTab';

interface EventEditorProps {
    eventId?: string;
    isEdit?: boolean;
}

export default function EventEditor({ eventId, isEdit = false }: EventEditorProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('basic');
    const [saving, setSaving] = useState(false);
    const [eventData, setEventData] = useState({
        name: '',
        slug: '',
        description: '',
        fullDescription: '',
        startAt: '',
        endAt: '',
        venue: '',
        city: '',
        country: 'Bangladesh',
        imageUrl: '',
        price: 0,
        capacity: 100,
        status: 'draft',
        themeId: '',
        bannerImages: [] as string[],
        gallery: [] as string[],
        schedule: [] as { time: string; activity: string; description?: string }[],
        faq: [] as { question: string; answer: string }[],
        themeCustomization: {
            primaryColor: '',
            secondaryColor: '',
            logo: '',
        },
    });

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: '📝' },
        { id: 'theme', label: 'Theme', icon: '🎨' },
        { id: 'images', label: 'Images', icon: '🖼️' },
        { id: 'tickets', label: 'Tickets', icon: '🎫' },
        { id: 'schedule', label: 'Schedule', icon: '📅' },
        { id: 'faq', label: 'FAQ', icon: '❓' },
    ];

    useEffect(() => {
        if (isEdit && eventId) {
            fetchEventData();
        }
    }, [eventId, isEdit]);

    const fetchEventData = async () => {
        try {
            const res = await fetch(`/api/tenant-admin/events/${eventId}`);
            if (res.ok) {
                const data = await res.json();
                setEventData(data);
            }
        } catch (error) {
            console.error('Error fetching event:', error);
        }
    };

    const handleSave = async (publish = false) => {
        setSaving(true);
        try {
            const endpoint = isEdit
                ? `/api/tenant-admin/events/${eventId}`
                : '/api/tenant-admin/events';

            const method = isEdit ? 'PUT' : 'POST';

            const payload = {
                ...eventData,
                status: publish ? 'published' : eventData.status,
            };

            console.log('Saving event:', payload);

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                alert(publish ? 'Event published successfully!' : 'Event saved as draft!');
                router.push('/tenant-admin/events');
            } else {
                // Show actual error from backend
                const errorMessage = data.message || data.error || 'Error saving event';
                console.error('Backend error:', data);
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Network error: Could not connect to server');
        } finally {
            setSaving(false);
        }
    };

    const handlePreview = () => {
        if (eventData.slug) {
            window.open(`/preview/${eventData.slug}`, '_blank');
        } else {
            alert('Please set an event name to generate a preview');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/tenant-admin/events')}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-bold text-slate-900">
                                {isEdit ? 'Edit Event' : 'Create New Event'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handlePreview}
                                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                Preview
                            </button>
                            <button
                                onClick={() => handleSave(false)}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                Save Draft
                            </button>
                            <button
                                onClick={() => handleSave(true)}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                Publish
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600 font-semibold'
                                    : 'border-transparent text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'basic' && (
                    <BasicInfoTab eventData={eventData} setEventData={setEventData} />
                )}
                {activeTab === 'theme' && (
                    <ThemeSelectionTab eventData={eventData} setEventData={setEventData} />
                )}
                {activeTab === 'images' && (
                    <ImagesTab eventData={eventData} setEventData={setEventData} eventId={eventId} />
                )}
                {activeTab === 'tickets' && (
                    <TicketsTab eventId={eventId} />
                )}
                {activeTab === 'schedule' && (
                    <ScheduleTab eventData={eventData} setEventData={setEventData} />
                )}
                {activeTab === 'faq' && (
                    <FAQTab eventData={eventData} setEventData={setEventData} />
                )}
            </div>
        </div>
    );
}
