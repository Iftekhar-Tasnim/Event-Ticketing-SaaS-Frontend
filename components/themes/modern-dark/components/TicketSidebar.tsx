'use client';

import { Plus, Minus } from 'lucide-react';
import { Ticket } from '../../types';

interface TicketSidebarProps {
    tickets: Ticket[];
    selectedTickets: Record<string, number>;
    onUpdateQuantity: (ticketId: string, quantity: number) => void;
    totalPrice: number;
}

export default function TicketSidebar({ tickets, selectedTickets, onUpdateQuantity, totalPrice }: TicketSidebarProps) {
    return (
        <div className="card-glass sticky top-24">
            <h3 className="text-2xl font-bold text-white mb-6">Select Tickets</h3>

            <div className="space-y-4 mb-6">
                {tickets.map((ticket) => {
                    const available = ticket.quantity - ticket.soldCount;
                    const quantity = selectedTickets[ticket.id] || 0;

                    return (
                        <div key={ticket.id} className="card">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-white font-semibold">{ticket.name}</h4>
                                    {ticket.description && (
                                        <p className="text-slate-400 text-sm mt-1">{ticket.description}</p>
                                    )}
                                </div>
                                <p className="text-emerald-500 font-bold text-lg">৳{ticket.price}</p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <p className="text-slate-400 text-sm">
                                    {available} available
                                </p>

                                {available > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onUpdateQuantity(ticket.id, Math.max(0, quantity - 1))}
                                            disabled={quantity === 0}
                                            className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                        >
                                            <Minus className="w-4 h-4 text-white" />
                                        </button>
                                        <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(ticket.id, Math.min(available, quantity + 1))}
                                            disabled={quantity >= available}
                                            className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                        >
                                            <Plus className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-amber-500 font-semibold text-sm">Sold Out</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total and Checkout */}
            <div className="border-t border-slate-700 pt-6">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400">Total</span>
                    <span className="text-3xl font-bold text-emerald-500">৳{totalPrice.toFixed(2)}</span>
                </div>

                <button
                    disabled={totalPrice === 0}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed glow-pulse"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
