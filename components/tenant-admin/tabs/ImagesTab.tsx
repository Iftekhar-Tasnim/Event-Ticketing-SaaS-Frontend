'use client';

import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImagesTabProps {
    eventData: any;
    setEventData: (data: any) => void;
    eventId?: string;
}

export default function ImagesTab({ eventData, setEventData, eventId }: ImagesTabProps) {
    const [uploading, setUploading] = useState(false);

    const handleBannerUpload = async (files: FileList) => {
        if (!eventId) {
            alert('Please save the event first before uploading images');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('images', file);
        });

        try {
            const res = await fetch(`/api/tenant-admin/events/${eventId}/upload-banner`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const updatedEvent = await res.json();
                setEventData(updatedEvent);
            }
        } catch (error) {
            console.error('Error uploading banner:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleGalleryUpload = async (files: FileList) => {
        if (!eventId) {
            alert('Please save the event first before uploading images');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('images', file);
        });

        try {
            const res = await fetch(`/api/tenant-admin/events/${eventId}/upload-gallery`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const updatedEvent = await res.json();
                setEventData(updatedEvent);
            }
        } catch (error) {
            console.error('Error uploading gallery:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (imageUrl: string) => {
        if (!eventId) return;

        try {
            const res = await fetch(
                `/api/tenant-admin/events/${eventId}/images/${encodeURIComponent(imageUrl)}`,
                { method: 'DELETE' }
            );

            if (res.ok) {
                const updatedEvent = await res.json();
                setEventData(updatedEvent);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Banner Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Banner Images</h2>
                <p className="text-sm text-slate-600 mb-4">
                    Upload 1-5 banner images for the hero carousel (recommended: 1920x1080px)
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {eventData.bannerImages?.map((image: string, index: number) => (
                        <div key={index} className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden group">
                            <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                onClick={() => handleDeleteImage(image)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    ))}
                </div>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-600">Click to upload banner images</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleBannerUpload(e.target.files)}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>

            {/* Gallery Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Gallery Images</h2>
                <p className="text-sm text-slate-600 mb-4">
                    Upload additional images for the event gallery
                </p>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {eventData.gallery?.map((image: string, index: number) => (
                        <div key={index} className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group">
                            <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                                onClick={() => handleDeleteImage(image)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    ))}
                </div>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-600">Click to upload gallery images</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>

            {!eventId && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                        💡 Save the event first to enable image uploads
                    </p>
                </div>
            )}
        </div>
    );
}
