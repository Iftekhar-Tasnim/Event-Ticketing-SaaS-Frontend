"use client";

import React, { useEffect, useState } from 'react';
import {
    Users,
    Shield,
    Search,
    Plus,
    Mail,
    Building2,
    Edit2,
    Trash2,
    MoreVertical
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';

export default function UsersPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'platform_admin' | 'tenant_admin'>('all');
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        fetchUsers();
    }, [activeTab, searchTerm]);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (activeTab === 'tenant_admin') {
                response = await adminService.getAllTenantUsers({
                    role: 'TenantAdmin',
                    search: searchTerm
                });
                setUsers(response.data.map((tu: any) => ({
                    id: tu.id,
                    fullName: tu.user.fullName,
                    email: tu.user.email,
                    role: 'Tenant Admin',
                    tenantName: tu.tenant.name,
                    status: tu.status,
                    createdAt: tu.createdAt
                })));
            } else {
                const query: any = { search: searchTerm };
                if (activeTab === 'platform_admin') {
                    query.isPlatformAdmin = true;
                }
                response = await adminService.getAllUsers(query);
                setUsers(response.data.map((u: any) => ({
                    id: u.id,
                    fullName: u.fullName,
                    email: u.email,
                    role: u.isPlatformAdmin ? 'Platform Admin' : 'User',
                    status: 'active',
                    createdAt: u.createdAt
                })));
            }
        } catch (error: any) {
            if (error?.response?.status === 403) {
                setError('You do not have permission to view users. Platform admin access required.');
            } else {
                console.error("Failed to fetch users", error);
                setError('Failed to load users. Please try again.');
            }
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user: any) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteClick = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            await adminService.deleteUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user', error);
            alert('Failed to delete user');
        }
    };

    // Calculate stats
    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === 'Platform Admin').length,
        tenantAdmins: users.filter(u => u.role === 'Tenant Admin').length,
        regular: users.filter(u => u.role === 'User').length,
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-slate-500 mt-1">Manage platform admins, tenant admins, and users.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/20"
                >
                    <Plus size={18} />
                    Add New User
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Users" value={stats.total} color="blue" />
                <StatCard label="Platform Admins" value={stats.admins} color="purple" />
                <StatCard label="Tenant Admins" value={stats.tenantAdmins} color="amber" />
                <StatCard label="Regular Users" value={stats.regular} color="emerald" />
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-xl">
                        <TabButton
                            active={activeTab === 'all'}
                            onClick={() => setActiveTab('all')}
                            label="All Users"
                        />
                        <TabButton
                            active={activeTab === 'platform_admin'}
                            onClick={() => setActiveTab('platform_admin')}
                            label="Platform Admins"
                        />
                        <TabButton
                            active={activeTab === 'tenant_admin'}
                            onClick={() => setActiveTab('tenant_admin')}
                            label="Tenant Admins"
                        />
                    </div>

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
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
                                <th className="px-5 py-3 text-left">User</th>
                                <th className="px-5 py-3 text-left">Role</th>
                                {activeTab === 'tenant_admin' && <th className="px-5 py-3 text-left">Tenant</th>}
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-left">Joined</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-5 py-4"><div className="h-10 w-48 bg-slate-100 rounded-lg"></div></td>
                                        <td className="px-5 py-4"><div className="h-6 w-24 bg-slate-100 rounded-full"></div></td>
                                        {activeTab === 'tenant_admin' && <td className="px-5 py-4"><div className="h-4 w-32 bg-slate-100 rounded"></div></td>}
                                        <td className="px-5 py-4"><div className="h-6 w-16 bg-slate-100 rounded-full"></div></td>
                                        <td className="px-5 py-4"><div className="h-4 w-24 bg-slate-100 rounded"></div></td>
                                        <td className="px-5 py-4"></td>
                                    </tr>
                                ))
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                    {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">{user.fullName || 'Unknown'}</div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Mail size={10} />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <RoleBadge role={user.role} />
                                        </td>
                                        {activeTab === 'tenant_admin' && (
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                                    <Building2 size={12} className="text-slate-400" />
                                                    {user.tenantName}
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-5 py-4">
                                            <StatusBadge status={user.status} />
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                                                    title="Edit user"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user.id)}
                                                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Delete user"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={activeTab === 'tenant_admin' ? 6 : 5} className="px-5 py-12 text-center text-slate-400">
                                        No users found for this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <CreateUserModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={fetchUsers}
            />
            <EditUserModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSuccess={fetchUsers}
                user={selectedUser}
            />
        </div>
    );
}

// Stat Card Component
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
    const colorClasses: Record<string, string> = {
        emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-600 border-emerald-200',
        blue: 'from-blue-500/10 to-blue-600/5 text-blue-600 border-blue-200',
        amber: 'from-amber-500/10 to-amber-600/5 text-amber-600 border-amber-200',
        purple: 'from-purple-500/10 to-purple-600/5 text-purple-600 border-purple-200',
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

// Role Badge Component
function RoleBadge({ role }: { role: string }) {
    if (role === 'Platform Admin') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                <Shield size={12} />
                Admin
            </span>
        );
    }
    if (role === 'Tenant Admin') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                <Building2 size={12} />
                Tenant
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            User
        </span>
    );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        active: 'bg-emerald-100 text-emerald-700',
        inactive: 'bg-slate-100 text-slate-500',
        suspended: 'bg-red-100 text-red-700',
    };
    const style = styles[status?.toLowerCase()] || styles.active;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
            {status}
        </span>
    );
}
