'use client';
import { Calendar, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react';

// This component will eventually handle multiple themes
// For now, it implements the "Midnight Pro" design
export default function ThemeRenderer({ tenant, config, theme, events }: any) {

    // Default Colors (Midnight Pro) if not overridden
    const colors = {
        primary: config.styleOverrides?.colors?.primary || theme?.defaultProperties?.colors?.primary || '#10b981', // Emerald 500
        secondary: config.styleOverrides?.colors?.secondary || theme?.defaultProperties?.colors?.secondary || '#f59e0b', // Amber 500
        background: config.styleOverrides?.colors?.background || theme?.defaultProperties?.colors?.background || '#020617', // Slate 950
        text: config.styleOverrides?.colors?.text || theme?.defaultProperties?.colors?.text || '#ffffff',
    };

    // Format events for display
    const displayEvents = events?.map((e: any) => ({
        id: e.id,
        name: e.name || e.title,
        date: new Date(e.startAt || e.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
        image: e.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000', // Fallback
        location: e.venue ? `${e.venue}, ${e.city}` : e.location,
        price: e.price > 0 ? e.price : 'TBA',
        month: new Date(e.startAt || e.date).toLocaleString('default', { month: 'short' }),
        day: new Date(e.startAt || e.date).getDate()
    })) || [];

    // Determine if theme is light based on background color (simple check)
    // In production, we'd use a robust color utility or theme.type
    // For now, assuming if background is white-ish (#fff...), it's light mode
    const isLightMode = colors.background.toLowerCase().startsWith('#ff') || colors.background.toLowerCase().startsWith('#f9') || colors.background.toLowerCase().startsWith('#f8');

    const mutedTextColor = isLightMode ? 'text-slate-600' : 'text-slate-400';
    const borderColor = isLightMode ? 'border-slate-200' : 'border-white/5';
    const cardBg = isLightMode ? 'bg-white' : 'bg-[#0F1424]';
    const glassBg = isLightMode ? 'bg-white/70 shadow-sm' : 'bg-black/20';

    return (
        <div className="min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>

            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-all ${borderColor} ${glassBg}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {config.assets?.logoUrl ? (
                            <img src={config.assets.logoUrl} alt={tenant.name} className="h-10" />
                        ) : (
                            <div className={`p-2 rounded-xl border ${borderColor} ${isLightMode ? 'bg-slate-100' : 'bg-white/10'}`}>
                                <TicketIcon className="text-emerald-500" />
                            </div>
                        )}
                        <span className="text-xl font-bold tracking-tight">{tenant.name}</span>
                    </div>
                    <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${mutedTextColor}`}>
                        <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: colors.text }}>Upcoming Events</a>
                        <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: colors.text }}>About</a>
                        <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: colors.text }}>Contact</a>
                    </div>
                    <button className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                {/* Dynamic Background Image or Glows */}
                {config.assets?.heroBannerUrl ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <img src={config.assets.heroBannerUrl} className="w-full h-full object-cover opacity-100" alt="Hero Banner" />
                            <div className="absolute inset-0 bg-gradient-to-t" style={{ '--tw-gradient-from': colors.background, '--tw-gradient-to': 'transparent', '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)' } as any}></div>
                            <div className="absolute inset-0 bg-gradient-to-b" style={{ '--tw-gradient-from': colors.background, '--tw-gradient-to': 'transparent', '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)', opacity: 0.9 } as any}></div>
                        </div>
                    </>
                ) : (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/20 to-transparent rounded-[100%] blur-[120px] pointer-events-none opacity-50" style={{ '--tw-gradient-from': colors.primary } as any}></div>
                )}

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className={`inline-block py-1 px-3 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ${borderColor} ${isLightMode ? 'bg-slate-100' : 'bg-white/5'}`} style={{ color: colors.secondary }}>
                        Official Ticket Portal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100" style={{ color: colors.text }}>
                        {config.siteInfo?.title || <span>Discover & Book <br /> Extraordinary Experiences.</span>}
                    </h1>
                    <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 ${mutedTextColor}`}>
                        {config.siteInfo?.description || `Welcome to ${tenant.name}. Find your next favorite concert, conference, or workshop and secure your spot instantly.`}
                    </p>

                    {/* Search Mock */}
                    <div className={`max-w-2xl mx-auto p-2 rounded-full border flex items-center gap-4 animate-in fade-in zoom-in duration-700 delay-300 ${borderColor} ${glassBg}`}>
                        <input
                            type="text"
                            placeholder="Search events..."
                            className={`flex-1 bg-transparent border-none focus:ring-0 px-6 py-3 placeholder-slate-500`}
                            style={{ color: colors.text }}
                        />
                        <button className="px-8 py-3 rounded-full text-white font-bold transition-all shadow-lg" style={{ backgroundColor: colors.primary }}>
                            Search
                        </button>
                    </div>
                </div>
            </header>

            {/* Events Grid */}
            <section className="py-20 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Upcoming Events</h2>
                        <div className="flex gap-2">
                            <button className={`p-3 rounded-full border hover:opacity-80 transition-opacity ${borderColor}`}><MapPin size={20} /></button>
                            <button className={`p-3 rounded-full border hover:opacity-80 transition-opacity ${borderColor}`}><Calendar size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayEvents.length === 0 && (
                            <div className="col-span-full text-center py-20 text-slate-400">
                                <TicketIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No upcoming events at the moment.</p>
                            </div>
                        )}
                        {displayEvents.map((event: any) => (
                            <div key={event.id} className={`group relative rounded-3xl border overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ${cardBg} ${borderColor}`}>
                                {/* Image */}
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-center">
                                        <span className="block text-xl font-bold text-white">{event.day}</span>
                                        <span className="block text-xs font-bold text-emerald-400 uppercase">{event.month}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.secondary }}>
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.secondary }}></div>
                                        Selling Fast
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 transition-colors" style={{ color: colors.text }}>{event.name}</h3>

                                    <div className={`flex flex-col gap-3 mb-6 text-sm ${mutedTextColor}`}>
                                        <div className="flex items-center gap-3">
                                            <MapPin size={16} />
                                            {event.location}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={16} />
                                            {event.date}
                                        </div>
                                    </div>

                                    <div className={`flex items-center justify-between pt-6 border-t ${borderColor}`}>
                                        <div className="flex flex-col">
                                            <span className={`text-xs font-medium uppercase ${mutedTextColor}`}>Starting from</span>
                                            <span className="text-xl font-bold" style={{ color: colors.text }}>৳ {event.price}</span>
                                        </div>
                                        <button className="px-6 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.primary }}>
                                            Get Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className={`border-t py-12 px-6 ${borderColor}`} style={{ backgroundColor: colors.background }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <p className={`text-sm ${mutedTextColor}`}>© 2024 {tenant.name}. Powered by TicketBD.</p>
                        {config.siteInfo?.contactEmail && (
                            <p className={`text-sm ${mutedTextColor}`}>Contact: {config.siteInfo.contactEmail}</p>
                        )}
                    </div>

                    <div className={`flex gap-6 text-sm font-medium items-center ${mutedTextColor}`}>
                        {/* Social Links */}
                        {config.siteInfo?.socialLinks && (
                            <div className={`flex gap-4 mr-6 border-r pr-6 ${isLightMode ? 'border-slate-300' : 'border-slate-800'}`}>
                                {config.siteInfo.socialLinks.facebook && <a href={config.siteInfo.socialLinks.facebook} className="hover:opacity-100" style={{ color: colors.text }}>Facebook</a>}
                                {config.siteInfo.socialLinks.twitter && <a href={config.siteInfo.socialLinks.twitter} className="hover:opacity-100" style={{ color: colors.text }}>Twitter</a>}
                                {config.siteInfo.socialLinks.instagram && <a href={config.siteInfo.socialLinks.instagram} className="hover:opacity-100" style={{ color: colors.text }}>Instagram</a>}
                            </div>
                        )}

                        <a href="#" className="hover:opacity-100 transition-colors" style={{ color: colors.text }}>Privacy Policy</a>
                        <a href="#" className="hover:opacity-100 transition-colors" style={{ color: colors.text }}>Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
