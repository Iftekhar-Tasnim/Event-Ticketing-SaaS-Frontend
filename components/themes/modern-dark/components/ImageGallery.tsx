'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImage(index);
        setLightboxOpen(true);
    };

    return (
        <div className="card-glass">
            <h2 className="text-3xl font-bold text-white mb-6">Event Gallery</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    >
                        <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <img
                        src={images[currentImage]}
                        alt={`Gallery ${currentImage + 1}`}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
}
