'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface ThemeSelectionTabProps {
    eventData: any;
    setEventData: (data: any) => void;
}

export default function ThemeSelectionTab({ eventData, setEventData }: ThemeSelectionTabProps) {
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        try {
            const res = await fetch('/api/admin/themes');
            if (res.ok) {
                const data = await res.json();
                setThemes(data);
            }
        } catch (error) {
            console.error('Error fetching themes:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Select Theme</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {themes.map((theme: any) => (
                        <div
                            key={theme.id}
                            onClick={() => setEventData({ ...eventData, themeId: theme.id })}
                            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${eventData.themeId === theme.id
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            {eventData.themeId === theme.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}

                            <div className="aspect-video bg-slate-100 rounded mb-3 overflow-hidden">
                                {theme.thumbnailUrl ? (
                                    <img src={theme.thumbnailUrl} alt={theme.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        No preview
                                    </div>
                                )}
                            </div>

                            <h3 className="font-semibold text-slate-900 mb-1">{theme.name}</h3>
                            <p className="text-sm text-slate-600 mb-2">{theme.description}</p>

                            {theme.isPremium && (
                                <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                                    Premium - ৳{theme.price}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <h2 className="text-lg font-semibold text-slate-900 mb-4">Customize Colors (Optional)</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Primary Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={eventData.themeCustomization?.primaryColor || '#10b981'}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        themeCustomization: {
                                            ...eventData.themeCustomization,
                                            primaryColor: e.target.value,
                                        },
                                    })
                                }
                                className="w-16 h-10 rounded border border-slate-300"
                            />
                            <input
                                type="text"
                                value={eventData.themeCustomization?.primaryColor || ''}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        themeCustomization: {
                                            ...eventData.themeCustomization,
                                            primaryColor: e.target.value,
                                        },
                                    })
                                }
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
                                placeholder="#10b981"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Secondary Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={eventData.themeCustomization?.secondaryColor || '#f59e0b'}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        themeCustomization: {
                                            ...eventData.themeCustomization,
                                            secondaryColor: e.target.value,
                                        },
                                    })
                                }
                                className="w-16 h-10 rounded border border-slate-300"
                            />
                            <input
                                type="text"
                                value={eventData.themeCustomization?.secondaryColor || ''}
                                onChange={(e) =>
                                    setEventData({
                                        ...eventData,
                                        themeCustomization: {
                                            ...eventData.themeCustomization,
                                            secondaryColor: e.target.value,
                                        },
                                    })
                                }
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg"
                                placeholder="#f59e0b"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
