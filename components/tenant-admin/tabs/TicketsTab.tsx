'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

interface TicketsTabProps {
    eventId?: string;
}

export default function TicketsTab({ eventId }: TicketsTabProps) {
    const [tickets, setTickets] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTicket, setEditingTicket] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 100,
        status: 'available',
    });

    useEffect(() => {
        if (eventId) {
            fetchTickets();
        }
    }, [eventId]);

    const fetchTickets = async () => {
        try {
            const res = await fetch(`/api/tickets/event/${eventId}`);
            if (res.ok) {
                const data = await res.json();
                setTickets(data);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!eventId) {
            alert('Please save the event first');
            return;
        }

        try {
            const endpoint = editingTicket
                ? `/api/tickets/${editingTicket.id}`
                : `/api/tickets/event/${eventId}`;

            const method = editingTicket ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchTickets();
                setShowForm(false);
                setEditingTicket(null);
                setFormData({ name: '', description: '', price: 0, quantity: 100, status: 'available' });
            }
        } catch (error) {
            console.error('Error saving ticket:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this ticket type?')) return;

        try {
            const res = await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchTickets();
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    const handleEdit = (ticket: any) => {
        setEditingTicket(ticket);
        setFormData({
            name: ticket.name,
            description: ticket.description || '',
            price: ticket.price,
            quantity: ticket.quantity,
            status: ticket.status,
        });
        setShowForm(true);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900">Ticket Types</h2>
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setEditingTicket(null);
                            setFormData({ name: '', description: '', price: 0, quantity: 100, status: 'available' });
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Ticket Type
                    </button>
                </div>

                {/* Tickets List */}
                <div className="space-y-3">
                    {tickets.map((ticket: any) => (
                        <div key={ticket.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900">{ticket.name}</h3>
                                    {ticket.description && (
                                        <p className="text-sm text-slate-600 mt-1">{ticket.description}</p>
                                    )}
                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                        <span className="text-blue-600 font-semibold">৳{ticket.price}</span>
                                        <span className="text-slate-600">
                                            {ticket.quantity - ticket.soldCount} / {ticket.quantity} available
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${ticket.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(ticket)}
                                        className="p-2 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <Edit className="w-4 h-4 text-slate-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ticket.id)}
                                        className="p-2 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {tickets.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                            No ticket types yet. Add your first ticket type to get started.
                        </div>
                    )}
                </div>

                {/* Ticket Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                {editingTicket ? 'Edit Ticket Type' : 'Add Ticket Type'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Ticket Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                        placeholder="VIP, General Admission, Early Bird"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                        rows={2}
                                        placeholder="Ticket benefits and details"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Price (৳) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingTicket(null);
                                        }}
                                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        {editingTicket ? 'Update' : 'Create'} Ticket
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {!eventId && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                        💡 Save the event first to manage tickets
                    </p>
                </div>
            )}
        </div>
    );
}
