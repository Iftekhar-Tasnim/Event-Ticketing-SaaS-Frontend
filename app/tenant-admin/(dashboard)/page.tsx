'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Calendar,
    ShoppingCart,
    DollarSign,
    Ticket,
    Plus,
    Settings,
    TrendingUp,
    TrendingDown,
    Clock,
    MapPin,
    Eye,
    Edit,
    ArrowRight,
    Activity
} from 'lucide-react';
import { tenantAdminService } from '@/services/tenantAdminService';

interface DashboardStats {
    totalEvents: number;
    totalOrders: number;
    totalRevenue: number;
    activeTickets: number;
    eventsTrend: number;
    ordersTrend: number;
    revenueTrend: number;
}

export default function TenantAdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalEvents: 0,
        totalOrders: 0,
        totalRevenue: 0,
        activeTickets: 0,
        eventsTrend: 0,
        ordersTrend: 0,
        revenueTrend: 0,
    });
    const [events, setEvents] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [eventsData, ordersData] = await Promise.all([
                tenantAdminService.getAllEvents(),
                tenantAdminService.getOrders(),
            ]);

            const eventsArray = Array.isArray(eventsData) ? eventsData : eventsData.data || [];
            const ordersArray = Array.isArray(ordersData) ? ordersData : ordersData.data || [];

            setEvents(eventsArray);
            setOrders(ordersArray);

            // Calculate stats
            const totalRevenue = ordersArray
                .filter((o: any) => o.status === 'completed')
                .reduce((sum: number, o: any) => sum + (Number(o.total_taka) || 0), 0);

            const activeTickets = ordersArray
                .filter((o: any) => o.status === 'completed')
                .reduce((sum: number, o: any) => sum + (Number(o.ticket_count) || 1), 0);

            setStats({
                totalEvents: eventsArray.length,
                totalOrders: ordersArray.length,
                totalRevenue,
                activeTickets,
                eventsTrend: 12.5,
                ordersTrend: 8.3,
                revenueTrend: 15.7,
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const upcomingEvents = events
        .filter((e) => new Date(e.start_at) > new Date())
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
        .slice(0, 5);

    const recentOrders = orders
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 8);

    const eventStatusData = events.reduce((acc: any, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your events.</p>
                </div>
                <Link
                    href="/tenant-admin/events/create"
                    className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-900/20"
                >
                    <Plus size={18} />
                    Create Event
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Calendar}
                    label="Total Events"
                    value={stats.totalEvents}
                    trend={stats.eventsTrend}
                    color="emerald"
                    loading={loading}
                />
                <StatCard
                    icon={ShoppingCart}
                    label="Total Orders"
                    value={stats.totalOrders}
                    trend={stats.ordersTrend}
                    color="blue"
                    loading={loading}
                />
                <StatCard
                    icon={DollarSign}
                    label="Revenue"
                    value={`৳${stats.totalRevenue.toLocaleString()}`}
                    trend={stats.revenueTrend}
                    color="amber"
                    loading={loading}
                />
                <StatCard
                    icon={Ticket}
                    label="Active Tickets"
                    value={stats.activeTickets}
                    trend={0}
                    color="purple"
                    loading={loading}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-emerald-600" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <QuickActionButton href="/tenant-admin/events/create" icon={Plus} label="Create Event" />
                    <QuickActionButton href="/tenant-admin/orders" icon={ShoppingCart} label="View Orders" />
                    <QuickActionButton href="/tenant-admin/tickets" icon={Ticket} label="Manage Tickets" />
                    <QuickActionButton href="/tenant-admin/settings" icon={Settings} label="Settings" />
                </div>
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Event Status Distribution */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Event Status</h2>
                    {loading ? (
                        <div className="h-48 flex items-center justify-center text-slate-400">Loading...</div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(eventStatusData).map(([status, count]: [string, any]) => (
                                <div key={status} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-slate-700 capitalize">{status}</span>
                                            <span className="text-sm font-bold text-slate-900">{count}</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${getStatusColor(status)}`}
                                                style={{ width: `${(count / events.length) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(eventStatusData).length === 0 && (
                                <p className="text-center text-slate-400 py-8">No events yet</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                        <Link href="/tenant-admin/orders" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                            View All
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="h-48 flex items-center justify-center text-slate-400">Loading...</div>
                    ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {recentOrders.map((order: any) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{order.buyer_name}</p>
                                        <p className="text-xs text-slate-500">{order.buyer_email}</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-sm font-bold text-slate-900">৳{Number(order.total_taka).toLocaleString()}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getOrderStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {recentOrders.length === 0 && (
                                <p className="text-center text-slate-400 py-8">No orders yet</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Upcoming Events</h2>
                    <Link href="/tenant-admin/events" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                        View All
                        <ArrowRight size={14} />
                    </Link>
                </div>
                {loading ? (
                    <div className="h-32 flex items-center justify-center text-slate-400">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {upcomingEvents.map((event: any) => (
                            <Link
                                key={event.id}
                                href={`/tenant-admin/events/${event.id}`}
                                className="group p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-slate-50"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                                        {event.name}
                                    </h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadge(event.status)}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="space-y-1 text-xs text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        <span>{new Date(event.start_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={12} />
                                        <span className="truncate">{event.venue}, {event.city}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {upcomingEvents.length === 0 && (
                            <div className="col-span-full text-center text-slate-400 py-8">
                                No upcoming events
                            </div>
                        )}
                    </div>
                )}
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
                                {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
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

// Helper functions
function getStatusColor(status: string) {
    const colors: Record<string, string> = {
        draft: 'bg-slate-400',
        published: 'bg-emerald-500',
        scheduled: 'bg-blue-500',
        active: 'bg-green-500',
        cancelled: 'bg-red-500',
        completed: 'bg-purple-500',
    };
    return colors[status.toLowerCase()] || 'bg-slate-400';
}

function getStatusBadge(status: string) {
    const badges: Record<string, string> = {
        draft: 'bg-slate-100 text-slate-700',
        published: 'bg-emerald-100 text-emerald-700',
        scheduled: 'bg-blue-100 text-blue-700',
        active: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
        completed: 'bg-purple-100 text-purple-700',
    };
    return badges[status.toLowerCase()] || 'bg-slate-100 text-slate-700';
}

function getOrderStatusStyle(status: string) {
    const styles: Record<string, string> = {
        pending: 'bg-amber-100 text-amber-700',
        completed: 'bg-emerald-100 text-emerald-700',
        failed: 'bg-red-100 text-red-700',
        cancelled: 'bg-slate-100 text-slate-700',
        refunded: 'bg-purple-100 text-purple-700',
    };
    return styles[status.toLowerCase()] || 'bg-slate-100 text-slate-700';
}
