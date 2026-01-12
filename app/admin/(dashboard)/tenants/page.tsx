"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Building2,
    Plus,
    Search,
    Eye,
    Edit2,
    Trash2,
    Shield,
    Calendar,
    Globe
} from 'lucide-react';
import { adminService } from '@/services/adminService';

interface Tenant {
    id: string;
    name: string;
    slug: string;
    status: string;
    createdAt: string;
    brandingSettings?: {
        primaryColor?: string;
        logo?: string;
    };
}

export default function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

    useEffect(() => {
        fetchTenants();
    }, [searchTerm, statusFilter]);

    const fetchTenants = async () => {
        setLoading(true);
        setError(null);
        try {
            const query: any = {};
            if (searchTerm) query.search = searchTerm;
            if (statusFilter !== 'all') query.status = statusFilter;

            const response = await adminService.getAllTenants(query);
            setTenants(response.data || []);
        } catch (error: any) {
            if (error?.response?.status === 403) {
                setError('You do not have permission to view tenants. Platform admin access required.');
            } else {
                console.error("Failed to fetch tenants", error);
                setError('Failed to load tenants. Please try again.');
            }
            setTenants([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTenant = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await adminService.deleteTenant(id);
            fetchTenants();
        } catch (error) {
            console.error('Failed to delete tenant', error);
            alert('Failed to delete tenant');
        }
    };

    // Calculate stats
    const stats = {
        total: tenants.length,
        active: tenants.filter(t => t.status === 'active').length,
        pending: tenants.filter(t => t.status === 'pending').length,
        suspended: tenants.filter(t => t.status === 'suspended').length,
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tenants Management</h1>
                    <p className="text-slate-500 mt-1">Manage and onboard organizations on TicketBD.</p>
                </div>
                <Link
                    href="/admin/tenants/create"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/20"
                >
                    <Plus size={18} />
                    Onboard New Tenant
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Tenants" value={stats.total} color="blue" />
                <StatCard label="Active" value={stats.active} color="emerald" />
                <StatCard label="Pending Review" value={stats.pending} color="amber" />
                <StatCard label="Suspended" value={stats.suspended} color="red" />
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Status Filter Tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-xl">
                        <TabButton
                            active={statusFilter === 'all'}
                            onClick={() => setStatusFilter('all')}
                            label="All"
                        />
                        <TabButton
                            active={statusFilter === 'active'}
                            onClick={() => setStatusFilter('active')}
                            label="Active"
                        />
                        <TabButton
                            active={statusFilter === 'pending'}
                            onClick={() => setStatusFilter('pending')}
                            label="Pending"
                        />
                        <TabButton
                            active={statusFilter === 'suspended'}
                            onClick={() => setStatusFilter('suspended')}
                            label="Suspended"
                        />
                    </div>

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or slug..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* Tenants Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {error && (
                    <div className="px-5 py-4 bg-red-50 border-b border-red-200">
                        <div className="flex items-center gap-2 text-red-700">
                            <Shield size={18} />
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                        <p className="text-xs text-red-600 mt-1">
                            Please log in with platform admin credentials: <strong>admin@platform.com</strong>
                        </p>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-5 py-3 text-left">Organization</th>
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-left">Onboarded</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4"><div className="h-12 w-48 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-5 py-4"><div className="h-6 w-20 bg-slate-100 rounded-full"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 w-24 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"></td>
                                    </tr>
                                ))
                            ) : tenants.length > 0 ? (
                                tenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                                                    style={{ backgroundColor: tenant.brandingSettings?.primaryColor || '#6366f1' }}
                                                >
                                                    {tenant.brandingSettings?.logo ? (
                                                        <img src={tenant.brandingSettings.logo} alt={tenant.name} className="w-8 h-8 rounded-lg" />
                                                    ) : (
                                                        <span className="text-lg">{tenant.name.substring(0, 1).toUpperCase()}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{tenant.name}</div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Globe size={10} />
                                                        @{tenant.slug}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={tenant.status} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                                <Calendar size={12} className="text-slate-400" />
                                                {new Date(tenant.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/tenants/${tenant.id}`}
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="View details"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <Link
                                                    href={`/admin/tenants/${tenant.id}/edit`}
                                                    className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                                                    title="Edit tenant"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteTenant(tenant.id, tenant.name)}
                                                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Delete tenant"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                                        No tenants found for this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
    const colorClasses: Record<string, string> = {
        emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-600 border-emerald-200',
        blue: 'from-blue-500/10 to-blue-600/5 text-blue-600 border-blue-200',
        amber: 'from-amber-500/10 to-amber-600/5 text-amber-600 border-amber-200',
        red: 'from-red-500/10 to-red-600/5 text-red-600 border-red-200',
    };

    return (
        <div className={`rounded-2xl border bg-gradient-to-br ${colorClasses[color]} p-4 shadow-sm`}>
            <div className="text-2xl font-black text-slate-900 mb-1">{value}</div>
            <div className="text-xs font-medium text-slate-600">{label}</div>
        </div>
    );
}

// Tab Button Component
function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${active
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50'
                }`}
        >
            {label}
        </button>
    );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        active: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        suspended: 'bg-red-100 text-red-700',
        inactive: 'bg-slate-100 text-slate-600',
    };
    const style = styles[status?.toLowerCase()] || styles.inactive;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
            {status}
        </span>
    );
}
