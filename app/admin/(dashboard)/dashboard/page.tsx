"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Building2,
    Users,
    TrendingUp,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    CreditCard,
    RefreshCw,
    DollarSign,
    UserPlus,
    Settings,
    Palette,
    Shield,
    Clock,
    CheckCircle2,
    XCircle,
    Eye
} from 'lucide-react';
import { adminService, ActivityLog } from '@/services/adminService';

export default function AdminDashboard() {
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [tenants, setTenants] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [themes, setThemes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [logsResponse, statsData, tenantsResponse, usersResponse, paymentsResponse, themesResponse] = await Promise.all([
                adminService.getAllActivityLogs().catch((err) => {
                    if (err?.response?.status !== 403) console.error('Activity logs error:', err);
                    return { data: [] };
                }),
                adminService.getDashboardStats().catch((err) => {
                    if (err?.response?.status !== 403) console.error('Stats error:', err);
                    return { activeTenants: 0, totalUsers: 0, totalRevenue: 0, systemHealth: 'Unknown' };
                }),
                adminService.getAllTenants({ limit: 10 }).catch((err) => {
                    if (err?.response?.status !== 403) console.error('Tenants error:', err);
                    return { data: [] };
                }),
                adminService.getAllUsers({ limit: 10 }).catch((err) => {
                    if (err?.response?.status !== 403) console.error('Users error:', err);
                    return { data: [] };
                }),
                adminService.getAllPayments({ limit: 10 }).catch((err) => {
                    if (err?.response?.status !== 403) console.error('Payments error:', err);
                    return { data: [] };
                }),
                adminService.getAllThemes().catch((err) => {
                    if (err?.response?.status !== 403) console.error('Themes error:', err);
                    return { data: [] };
                })
            ]);

            setActivityLogs((logsResponse.data || []).slice(0, 8));
            setStats(statsData);
            setTenants(Array.isArray(tenantsResponse) ? tenantsResponse : tenantsResponse.data || []);
            setUsers(Array.isArray(usersResponse) ? usersResponse : usersResponse.data || []);
            setPayments(Array.isArray(paymentsResponse) ? paymentsResponse : paymentsResponse.data || []);
            setThemes(Array.isArray(themesResponse) ? themesResponse : themesResponse.data || []);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatCurrency = (amount: number | undefined | null) => {
        if (amount === undefined || amount === null || isNaN(amount)) {
            return '৳0';
        }
        return `৳${amount.toLocaleString()}`;
    };

    // Calculate additional stats
    const activeThemes = themes.filter((t: any) => t.status === 'active').length;
    const recentPayments = payments.slice(0, 5);
    const recentUsers = users.slice(0, 5);
    const tenantStatusData = tenants.reduce((acc: any, tenant) => {
        acc[tenant.status] = (acc[tenant.status] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Admin <span className="text-emerald-600">Dashboard</span>
                    </h1>
                    <p className="text-slate-500 mt-1">Monitor platform health, tenants, and revenue streams.</p>
                </div>
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all shadow-lg disabled:opacity-50"
                >
                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    {loading ? "Syncing..." : "Refresh"}
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Building2}
                    label="Active Tenants"
                    value={stats?.activeTenants || 0}
                    trend={12.5}
                    color="blue"
                    loading={loading}
                />
                <StatCard
                    icon={Users}
                    label="Platform Users"
                    value={stats?.totalUsers || 0}
                    trend={8.3}
                    color="purple"
                    loading={loading}
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={formatCurrency(stats?.totalRevenue || 0)}
                    trend={15.7}
                    color="emerald"
                    loading={loading}
                />
                <StatCard
                    icon={Palette}
                    label="Active Themes"
                    value={activeThemes}
                    trend={0}
                    color="amber"
                    loading={loading}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Settings size={20} className="text-emerald-600" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <QuickActionButton href="/admin/tenants" icon={Building2} label="Manage Tenants" />
                    <QuickActionButton href="/admin/users" icon={Users} label="Manage Users" />
                    <QuickActionButton href="/admin/themes" icon={Palette} label="Manage Themes" />
                    <QuickActionButton href="/admin/settings" icon={Settings} label="Settings" />
                </div>
            </div>

            {/* Charts and Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tenant Status Distribution */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Tenant Status</h2>
                    {loading ? (
                        <div className="h-48 flex items-center justify-center text-slate-400">Loading...</div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(tenantStatusData).map(([status, count]: [string, any]) => (
                                <div key={status} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-700 capitalize">{status}</span>
                                            <span className="text-sm font-bold text-slate-900">{count}</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${getTenantStatusColor(status)}`}
                                                style={{ width: `${(count / tenants.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(tenantStatusData).length === 0 && (
                                <p className="text-center text-slate-400 py-8">No tenants yet</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Recent Payments */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Recent Payments</h2>
                        <Link href="/admin/payment" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                            View All
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="h-48 flex items-center justify-center text-slate-400">Loading...</div>
                    ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {recentPayments.map((payment: any) => (
                                <div
                                    key={payment.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900">{payment.provider || 'Payment'}</p>
                                        <p className="text-xs text-slate-500">{new Date(payment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold text-slate-900">{formatCurrency(payment.amount)}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPaymentStatusStyle(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {recentPayments.length === 0 && (
                                <p className="text-center text-slate-400 py-8">No payments yet</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Activity and Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Recent Users</h2>
                        <Link href="/admin/users" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                            View All
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="h-48 flex items-center justify-center text-slate-400">Loading...</div>
                    ) : (
                        <div className="space-y-2">
                            {recentUsers.map((user: any) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
                                            {user.email?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 truncate">{user.email}</p>
                                            <p className="text-xs text-slate-500 capitalize">{user.role || 'user'}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getUserRoleBadge(user.role)}`}>
                                        {user.role || 'user'}
                                    </span>
                                </div>
                            ))}
                            {recentUsers.length === 0 && (
                                <p className="text-center text-slate-400 py-8">No users yet</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Activity Feed */}
                <div className="bg-slate-900 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity size={20} className="text-emerald-400" />
                            System Activity
                        </h2>
                    </div>

                    {loading ? (
                        <div className="h-48 flex items-center justify-center text-slate-400">Loading...</div>
                    ) : (
                        <div className="space-y-3 max-h-80 overflow-y-auto relative z-10">
                            {activityLogs.map((log: any, i: number) => (
                                <div key={log.id} className="relative pl-5 border-l-2 border-slate-700/50">
                                    <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                                    <p className="text-sm font-medium text-slate-300 leading-relaxed">
                                        {log.action}
                                    </p>
                                    <span className="text-xs text-slate-500 mt-0.5 block">
                                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}
                            {activityLogs.length === 0 && (
                                <p className="text-center text-slate-400 py-8">No recent activity</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Tenants Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Recent Tenants</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Latest platform partners onboarded</p>
                    </div>
                    <Link href="/admin/tenants" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                        View All
                        <ArrowUpRight size={14} />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-5 py-3 text-left">Tenant</th>
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-left">Created</th>
                                <th className="px-5 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4"><div className="h-4 w-32 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"><div className="h-6 w-20 bg-slate-100 rounded-full"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 w-24 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"></td>
                                    </tr>
                                ))
                            ) : tenants.slice(0, 5).map((tenant: any) => (
                                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="font-semibold text-slate-900">{tenant.name}</div>
                                        <div className="text-xs text-slate-500">@{tenant.slug}</div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <StatusBadge status={tenant.status} />
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">
                                        {new Date(tenant.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <Link
                                            href={`/admin/tenants/${tenant.id}`}
                                            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center justify-end gap-1"
                                        >
                                            <Eye size={14} />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {!loading && tenants.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">No tenants found</td>
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
type ColorType = 'emerald' | 'blue' | 'amber' | 'purple';

interface StatCardProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string | number;
    trend: number;
    color: ColorType;
    loading: boolean;
}

function StatCard({ icon: Icon, label, value, trend, color, loading }: StatCardProps) {
    const colorClasses: Record<ColorType, string> = {
        emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-600 border-emerald-200',
        blue: 'from-blue-500/10 to-blue-600/5 text-blue-600 border-blue-200',
        amber: 'from-amber-500/10 to-amber-600/5 text-amber-600 border-amber-200',
        purple: 'from-purple-500/10 to-purple-600/5 text-purple-600 border-purple-200',
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colorClasses[color]} p-5 shadow-sm hover:shadow-md transition-all`}>
            {loading ? (
                <div className="animate-pulse space-y-3">
                    <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
                    <div className="h-8 w-20 bg-slate-200 rounded"></div>
                    <div className="h-4 w-24 bg-slate-200 rounded"></div>
                </div>
            ) : (
                <>
                    <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-white/80 ${colorClasses[color].split(' ')[2]}`}>
                            <Icon size={20} />
                        </div>
                        {trend !== 0 && (
                            <div className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {trend > 0 ? <TrendingUp size={14} /> : <ArrowDownRight size={14} />}
                                {Math.abs(trend)}%
                            </div>
                        )}
                    </div>
                    <div className="text-2xl font-black text-slate-900 mb-1">{value}</div>
                    <div className="text-xs font-medium text-slate-600">{label}</div>
                </>
            )}
        </div>
    );
}

// Quick Action Button Component
function QuickActionButton({ href, icon: Icon, label }: any) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
        >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                <Icon size={20} className="text-slate-600 group-hover:text-emerald-600 transition-colors" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors text-center">
                {label}
            </span>
        </Link>
    );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        active: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        suspended: 'bg-red-100 text-red-700',
        inactive: 'bg-slate-100 text-slate-700',
    };
    const style = styles[status?.toLowerCase()] || 'bg-slate-100 text-slate-700';

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${style}`}>
            {status}
        </span>
    );
}

// Helper functions
function getTenantStatusColor(status: string) {
    const colors: Record<string, string> = {
        active: 'bg-emerald-500',
        pending: 'bg-amber-500',
        suspended: 'bg-red-500',
        inactive: 'bg-slate-400',
    };
    return colors[status.toLowerCase()] || 'bg-slate-400';
}

function getPaymentStatusStyle(status: string) {
    const styles: Record<string, string> = {
        completed: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        failed: 'bg-red-100 text-red-700',
        refunded: 'bg-purple-100 text-purple-700',
    };
    return styles[status?.toLowerCase()] || 'bg-slate-100 text-slate-700';
}

function getUserRoleBadge(role: string) {
    const badges: Record<string, string> = {
        admin: 'bg-purple-100 text-purple-700',
        'tenant-admin': 'bg-blue-100 text-blue-700',
        staff: 'bg-emerald-100 text-emerald-700',
        user: 'bg-slate-100 text-slate-700',
    };
    return badges[role?.toLowerCase()] || 'bg-slate-100 text-slate-700';
}
