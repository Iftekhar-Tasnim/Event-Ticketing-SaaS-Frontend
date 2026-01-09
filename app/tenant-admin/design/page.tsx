'use client';
import { useState, useEffect } from 'react';
import { Palette, Upload, Layout, Globe, Save, CheckCircle, Smartphone, Monitor, Loader2, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { adminService } from '@/services/adminService';
import { authService } from '@/services/authService';

export default function TenantDesignPage() {
    const [activeTab, setActiveTab] = useState('theme'); // theme, customization, content
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [themes, setThemes] = useState<any[]>([]);
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [tenantSlug, setTenantSlug] = useState<string>('');

    // Design State
    const [selectedThemeId, setSelectedThemeId] = useState('default');
    const [colors, setColors] = useState({
        primary: '#10b981',
        secondary: '#f59e0b',
        background: '#020617',
        text: '#ffffff'
    });
    const [assets, setAssets] = useState({
        logoUrl: '',
        bannerUrl: ''
    });
    const [siteInfo, setSiteInfo] = useState({
        title: '',
        description: '',
        socialLinks: { facebook: '', twitter: '', instagram: '' }
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const auth = await authService.checkAuth();
            if (auth.tenantId) {
                setTenantId(auth.tenantId);

                const [configData, themesData] = await Promise.all([
                    adminService.getTenantConfig(auth.tenantId),
                    adminService.getAllThemes({}),
                ]);

                setThemes(themesData.data);

                // Set slug from config relation (safely)
                if (configData.tenant?.slug) {
                    setTenantSlug(configData.tenant.slug);
                }

                // Initialize State from Config
                if (configData.themeId) setSelectedThemeId(configData.themeId);
                if (configData.styleOverrides?.colors) {
                    setColors(prev => ({ ...prev, ...configData.styleOverrides.colors }));
                }
                if (configData.assets) {
                    setAssets(prev => ({ ...prev, ...configData.assets }));
                }
                if (configData.siteInfo) {
                    setSiteInfo(prev => ({ ...prev, ...configData.siteInfo }));
                }
            }
        } catch (error) {
            console.error("Failed to load design data", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        if (!tenantId) return;
        setSaving(true);
        try {
            await adminService.updateTenantConfig(tenantId, {
                themeId: selectedThemeId,
                styleOverrides: { colors },
                assets,
                siteInfo
            });
            alert('Design saved successfully!');
        } catch (error) {
            console.error("Failed to save", error);
            alert('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={32} /></div>;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Site Design</h1>
                    <p className="text-slate-500 mt-2">Customize how your event portal looks to your attendees.</p>
                </div>
                <div className="flex items-center gap-2">
                    {tenantSlug && (
                        <a
                            href={`/events/${tenantSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            <Globe size={18} />
                            View Live Site
                        </a>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 w-fit">
                {['theme', 'customization', 'content'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all capitalize ${activeTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                    >
                        {tab === 'theme' && <Layout size={18} />}
                        {tab === 'customization' && <Palette size={18} />}
                        {tab === 'content' && <Upload size={18} />}
                        {tab === 'theme' ? 'Theme Selection' : tab === 'customization' ? 'Branding & Colors' : 'Assets & Content'}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Area */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'theme' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {themes.map(theme => (
                                <div key={theme.id} onClick={() => setSelectedThemeId(theme.id)} className={`group relative rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${selectedThemeId === theme.id ? 'border-emerald-500 shadow-xl ring-4 ring-emerald-500/10' : 'border-slate-200 hover:border-slate-300'}`}>
                                    <div className="aspect-video bg-slate-100 relative">
                                        {theme.thumbnailUrl ? (
                                            <img src={theme.thumbnailUrl} alt={theme.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">No Preview</div>
                                        )}
                                        {selectedThemeId === theme.id && (
                                            <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                                                <div className="bg-emerald-500 text-white p-2 rounded-full shadow-xl">
                                                    <CheckCircle size={24} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-slate-900">{theme.name}</h3>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{theme.description}</p>
                                            </div>
                                            {theme.isPremium && theme.price > 0 ? (
                                                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-lg">${theme.price}</span>
                                            ) : (
                                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg">FREE</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'customization' && (
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
                            <div>
                                <h2 className="font-bold text-lg text-slate-900 mb-1">Color Palette</h2>
                                <p className="text-sm text-slate-500 mb-6">Customize the primary and secondary colors of your public site.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary Color</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="color"
                                                value={colors.primary}
                                                onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                                                className="h-12 w-20 rounded-xl cursor-pointer border-0 p-1 bg-slate-100"
                                            />
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-slate-900 uppercase">{colors.primary}</div>
                                                <div className="text-xs text-slate-500">Main Brand Color</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Secondary Color</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="color"
                                                value={colors.secondary}
                                                onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                                                className="h-12 w-20 rounded-xl cursor-pointer border-0 p-1 bg-slate-100"
                                            />
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-slate-900 uppercase">{colors.secondary}</div>
                                                <div className="text-xs text-slate-500">Accents & Highlights</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Background Color</label>
                                        <div className="flex gap-3">
                                            <input
                                                type="color"
                                                value={colors.background}
                                                onChange={(e) => setColors({ ...colors, background: e.target.value })}
                                                className="h-12 w-20 rounded-xl cursor-pointer border-0 p-1 bg-slate-100"
                                            />
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-slate-900 uppercase">{colors.background}</div>
                                                <div className="text-xs text-slate-500">Page Background</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                <h2 className="font-bold text-lg text-slate-900 mb-6">Brand Assets</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Logo URL</label>
                                        <input
                                            type="text"
                                            value={assets.logoUrl}
                                            onChange={(e) => setAssets({ ...assets, logoUrl: e.target.value })}
                                            placeholder="https://example.com/logo.png"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                        />
                                        <p className="text-xs text-slate-400">Recommended height: 40px (Transparent PNG)</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Banner / Hero Image URL</label>
                                        <input
                                            type="text"
                                            value={assets.bannerUrl}
                                            onChange={(e) => setAssets({ ...assets, bannerUrl: e.target.value })}
                                            placeholder="https://example.com/banner.jpg"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                <h2 className="font-bold text-lg text-slate-900 mb-6">Site Information</h2>
                                <div className="space-y-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Site Title</label>
                                            <input
                                                type="text"
                                                value={siteInfo.title}
                                                onChange={(e) => setSiteInfo({ ...siteInfo, title: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Site Description</label>
                                            <textarea
                                                value={siteInfo.description}
                                                onChange={(e) => setSiteInfo({ ...siteInfo, description: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 h-24 resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Email</label>
                                            <input
                                                type="email"
                                                value={(siteInfo as any).contactEmail || ''}
                                                onChange={(e) => setSiteInfo({ ...siteInfo, contactEmail: e.target.value } as any)}
                                                placeholder="support@yourdomain.com"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-900 mb-4">Social Media Links</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Facebook</label>
                                                    <input
                                                        type="text"
                                                        value={siteInfo.socialLinks?.facebook || ''}
                                                        onChange={(e) => setSiteInfo({ ...siteInfo, socialLinks: { ...siteInfo.socialLinks, facebook: e.target.value } })}
                                                        placeholder="URL"
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Twitter / X</label>
                                                    <input
                                                        type="text"
                                                        value={siteInfo.socialLinks?.twitter || ''}
                                                        onChange={(e) => setSiteInfo({ ...siteInfo, socialLinks: { ...siteInfo.socialLinks, twitter: e.target.value } })}
                                                        placeholder="URL"
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Instagram</label>
                                                    <input
                                                        type="text"
                                                        value={siteInfo.socialLinks?.instagram || ''}
                                                        onChange={(e) => setSiteInfo({ ...siteInfo, socialLinks: { ...siteInfo.socialLinks, instagram: e.target.value } })}
                                                        placeholder="URL"
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Preview Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <h3 className="font-bold text-slate-900">Live Preview</h3>
                            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                                <button className="p-1.5 rounded bg-white shadow text-slate-900"><Monitor size={14} /></button>
                                <button className="p-1.5 rounded text-slate-400 hover:text-slate-600"><Smartphone size={14} /></button>
                            </div>
                        </div>

                        {/* Dynamic Preview Frame */}
                        <div className="border-[8px] border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[9/19] relative transition-colors duration-300" style={{ backgroundColor: colors.background }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-slate-900 rounded-b-xl z-20"></div>

                            <div className="h-full w-full overflow-y-auto relative custom-scrollbar">
                                {/* Navbar Mock */}
                                <div className="p-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-black/10">
                                    {assets.logoUrl ? (
                                        <img src={assets.logoUrl} className="h-6 object-contain" alt="Logo" />
                                    ) : (
                                        <div className="w-8 h-8 rounded bg-white/10"></div>
                                    )}
                                    <div className="w-6 h-6 rounded-full bg-white/20"></div>
                                </div>

                                {/* Hero Mock */}
                                <div className="px-4 py-8 text-center relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] rounded-full blur-[60px] opacity-30 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }}></div>
                                    <h2 className="text-xl font-black mb-2 leading-tight" style={{ color: colors.text }}>
                                        {siteInfo.title || "Your Event Title"}
                                    </h2>
                                    <p className="text-[10px] opacity-60 mb-6 line-clamp-2" style={{ color: colors.text }}>
                                        {siteInfo.description || "Event description goes here looking premium and nice."}
                                    </p>
                                    <div className="inline-block px-6 py-2 rounded-full text-xs font-bold text-white shadow-lg shadow-white/10" style={{ backgroundColor: colors.primary }}>
                                        Get Tickets
                                    </div>
                                </div>

                                {/* Cards Mock */}
                                <div className="px-4 pb-4 space-y-3">
                                    {[1, 2].map(i => (
                                        <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-3 overflow-hidden">
                                            <div className="h-24 rounded-xl bg-white/5 mb-3"></div>
                                            <div className="h-3 w-2/3 rounded bg-white/10 mb-2"></div>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="h-2 w-1/3 rounded bg-white/10"></div>
                                                <div className="px-3 py-1 rounded-lg text-[10px] font-bold text-white" style={{ backgroundColor: colors.primary }}>Buy</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
