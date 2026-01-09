'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle } from 'lucide-react';
import ThemeRenderer from '@/components/themes/ThemeRenderer';
import { useParams } from 'next/navigation';

export default function TenantPublicPage() { // Remove props
    const params = useParams(); // Use the hook
    const slug = params?.slug as string;

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:7000';

    useEffect(() => {
        if (slug) {
            fetchTenantData(slug);
        }
    }, [slug]);

    async function fetchTenantData(slug: string) {
        try {
            const res = await axios.get(`${API_URL}/public/tenant/${slug}`);
            setData(res.data);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to load event page');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">Loading Experience...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="text-red-500 w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
                    <p className="text-slate-400 mb-6">{error || "The event page you are looking for does not exist."}</p>
                    <a href="/" className="inline-block px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors">Return Home</a>
                </div>
            </div>
        );
    }

    // Render the theme
    return <ThemeRenderer tenant={data.tenant} config={data.config} theme={data.theme} events={data.events} />;
}
