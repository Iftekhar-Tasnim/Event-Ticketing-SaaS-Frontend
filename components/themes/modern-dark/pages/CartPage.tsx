'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartItem } from '../../types';
import '../styles/theme.css';

interface CartPageProps {
    tenantName: string;
    cartItems: CartItem[];
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onRemoveItem: (itemId: string) => void;
}

export default function CartPage({ tenantName, cartItems, onUpdateQuantity, onRemoveItem }: CartPageProps) {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.ticket.price * item.quantity), 0);
    const serviceFee = subtotal * 0.05; // 5% service fee
    const total = subtotal + serviceFee;

    return (
        <div className="modern-dark min-h-screen">
            <Header tenantName={tenantName} cartItemCount={cartItems.length} />

            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-black text-white mb-8">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="card text-center py-16">
                            <p className="text-slate-400 text-lg mb-6">Your cart is empty</p>
                            <a href="/events" className="btn-primary inline-block">
                                Browse Events
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="card">
                                        <div className="flex gap-4">
                                            {/* Event Image */}
                                            <img
                                                src={item.event.imageUrl || '/placeholder-event.jpg'}
                                                alt={item.event.name}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />

                                            {/* Item Details */}
                                            <div className="flex-1">
                                                <h3 className="text-white font-semibold mb-1">{item.event.name}</h3>
                                                <p className="text-slate-400 text-sm mb-2">{item.ticket.name}</p>
                                                <p className="text-emerald-500 font-bold">৳{item.ticket.price.toFixed(2)}</p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex flex-col items-end justify-between">
                                                <button
                                                    onClick={() => onRemoveItem(item.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                                                    >
                                                        <Minus className="w-4 h-4 text-white" />
                                                    </button>
                                                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center"
                                                    >
                                                        <Plus className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="card-glass sticky top-24">
                                    <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-slate-400">
                                            <span>Subtotal</span>
                                            <span>৳{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Service Fee</span>
                                            <span>৳{serviceFee.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-slate-700 pt-3 flex justify-between">
                                            <span className="text-white font-bold">Total</span>
                                            <span className="text-2xl font-bold text-emerald-500">৳{total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button className="btn-primary w-full py-4 glow-pulse">
                                        Proceed to Checkout
                                    </button>

                                    <a href="/events" className="block text-center text-slate-400 hover:text-emerald-500 mt-4">
                                        Continue Shopping
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer tenantName={tenantName} />
        </div>
    );
}
