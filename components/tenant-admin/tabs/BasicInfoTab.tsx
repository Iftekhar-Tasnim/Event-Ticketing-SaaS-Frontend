'use client';

interface BasicInfoTabProps {
    eventData: any;
    setEventData: (data: any) => void;
}

export default function BasicInfoTab({ eventData, setEventData }: BasicInfoTabProps) {
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (name: string) => {
        setEventData({
            ...eventData,
            name,
            slug: generateSlug(name),
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Event Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Event Name *
                        </label>
                        <input
                            type="text"
                            value={eventData.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Summer Music Festival 2026"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Slug (URL)
                        </label>
                        <input
                            type="text"
                            value={eventData.slug}
                            onChange={(e) => setEventData({ ...eventData, slug: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50"
                            placeholder="summer-music-festival-2026"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Auto-generated from event name. Customize if needed.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Short Description
                        </label>
                        <textarea
                            value={eventData.description}
                            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Brief description for event cards and listings"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Description
                        </label>
                        <textarea
                            value={eventData.fullDescription}
                            onChange={(e) => setEventData({ ...eventData, fullDescription: e.target.value })}
                            rows={8}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Detailed description for the event landing page..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Start Date & Time *
                        </label>
                        <input
                            type="datetime-local"
                            value={eventData.startAt}
                            onChange={(e) => setEventData({ ...eventData, startAt: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            End Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={eventData.endAt}
                            onChange={(e) => setEventData({ ...eventData, endAt: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Venue Name *
                        </label>
                        <input
                            type="text"
                            value={eventData.venue}
                            onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="National Stadium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            City *
                        </label>
                        <input
                            type="text"
                            value={eventData.city}
                            onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Dhaka"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Capacity
                        </label>
                        <input
                            type="number"
                            value={eventData.capacity}
                            onChange={(e) => setEventData({ ...eventData, capacity: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Base Price (৳)
                        </label>
                        <input
                            type="number"
                            value={eventData.price}
                            onChange={(e) => setEventData({ ...eventData, price: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
