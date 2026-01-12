"use client";

import React, { useEffect, useState } from 'react';
import {
    CreditCard,
    DollarSign,
    TrendingUp,
    Download,
    Search,
    Shield,
    Calendar,
    ExternalLink,
    CheckCircle2,
    Clock,
    XCircle
} from 'lucide-react';
import { adminService } from '@/services/adminService';

interface Payment {
    id: string;
    amountCents: number;
    currency: string;
    status: string;
    provider: string;
    createdAt: string;
    orderId?: string;
    providerReference?: string;
}

export default function PaymentPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

    useEffect(() => {
        fetchPayments();
    }, [searchTerm, statusFilter]);

    const fetchPayments = async () => {
        setLoading(true);
        setError(null);
        try {
            const query: any = {};
            if (statusFilter !== 'all') query.status = statusFilter;

            const response = await adminService.getAllPayments(query);
            let paymentsData = response.data || [];

            // Filter by search term on frontend
            if (searchTerm) {
                paymentsData = paymentsData.filter((p: Payment) =>
                    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.provider.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setPayments(paymentsData);
        } catch (error: any) {
            if (error?.response?.status === 403) {
                setError('You do not have permission to view payments. Platform admin access required.');
            } else {
                console.error("Failed to fetch payments", error);
                setError('Failed to load payments. Please try again.');
            }
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats
    const totalRevenueCents = payments.reduce((acc, curr) =>
        acc + (['completed', 'succeeded'].includes(curr.status) ? Number(curr.amountCents) : 0), 0);
    const totalTransactions = payments.length;
    const completedCount = payments.filter(p => ['completed', 'succeeded'].includes(p.status)).length;
    const pendingCount = payments.filter(p => p.status === 'pending').length;
    const failedCount = payments.filter(p => p.status === 'failed').length;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Management</h1>
                    <p className="text-slate-500 mt-1">Monitor transactions and financial activity across the platform.</p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-lg"
                >
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Revenue"
                    value={`৳${(totalRevenueCents / 100).toLocaleString()}`}
                    color="emerald"
                    icon={DollarSign}
                />
                <StatCard
                    label="Transactions"
                    value={totalTransactions}
                    color="blue"
                    icon={CreditCard}
                />
                <StatCard
                    label="Completed"
                    value={completedCount}
                    color="green"
                    icon={CheckCircle2}
                />
                <StatCard
                    label="Pending"
                    value={pendingCount}
                    color="amber"
                    icon={Clock}
                />
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
                            active={statusFilter === 'completed'}
                            onClick={() => setStatusFilter('completed')}
                            label="Completed"
                        />
                        <TabButton
                            active={statusFilter === 'pending'}
                            onClick={() => setStatusFilter('pending')}
                            label="Pending"
                        />
                        <TabButton
                            active={statusFilter === 'failed'}
                            onClick={() => setStatusFilter('failed')}
                            label="Failed"
                        />
                    </div>

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by transaction ID, order ID, or provider..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* Payments Table */}
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
                                <th className="px-5 py-3 text-left">Transaction</th>
                                <th className="px-5 py-3 text-left">Provider</th>
                                <th className="px-5 py-3 text-left">Order ID</th>
                                <th className="px-5 py-3 text-left">Amount</th>
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4"><div className="h-10 w-32 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-5 py-4"><div className="h-6 w-20 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 w-24 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"><div className="h-6 w-20 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"><div className="h-6 w-20 bg-slate-100 rounded-full"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 w-24 bg-slate-100 rounded"></div></td>
                                    </tr>
                                ))
                            ) : payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div>
                                                <div className="font-semibold text-slate-900 font-mono text-xs">
                                                    {payment.id.substring(0, 12)}...
                                                </div>
                                                {payment.providerReference && (
                                                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <ExternalLink size={10} />
                                                        {payment.providerReference.substring(0, 16)}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold uppercase">
                                                {payment.provider}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-slate-600 font-mono text-xs">
                                                {payment.orderId ? payment.orderId.substring(0, 12) + '...' : '-'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="font-bold text-slate-900">
                                                ৳{(Number(payment.amountCents) / 100).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                                <Calendar size={12} className="text-slate-400" />
                                                {new Date(payment.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                                        No payments found for this filter.
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
function StatCard({ label, value, color, icon: Icon }: { label: string; value: string | number; color: string; icon: any }) {
    const colorClasses: Record<string, string> = {
        emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-600 border-emerald-200',
        blue: 'from-blue-500/10 to-blue-600/5 text-blue-600 border-blue-200',
        amber: 'from-amber-500/10 to-amber-600/5 text-amber-600 border-amber-200',
        green: 'from-green-500/10 to-green-600/5 text-green-600 border-green-200',
    };

    return (
        <div className={`rounded-2xl border bg-gradient-to-br ${colorClasses[color]} p-4 shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
                <Icon size={20} />
            </div>
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
    const styles: Record<string, { bg: string; icon: any }> = {
        completed: { bg: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
        succeeded: { bg: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
        pending: { bg: 'bg-amber-100 text-amber-700', icon: Clock },
        failed: { bg: 'bg-red-100 text-red-700', icon: XCircle },
    };
    const style = styles[status?.toLowerCase()] || { bg: 'bg-slate-100 text-slate-600', icon: Clock };
    const StatusIcon = style.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg}`}>
            <StatusIcon size={12} />
            {status}
        </span>
    );
}
