'use client';

import { CheckCircle, Download, Calendar, Share2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Order } from '../../types';
import '../styles/theme.css';

interface ConfirmationPageProps {
    tenantName: string;
    order: Order;
}

export default function ConfirmationPage({ tenantName, order }: ConfirmationPageProps) {
    return (
        <div className="modern-dark min-h-screen">
            <Header tenantName={tenantName} />

            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Success Animation */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-4">
                            <CheckCircle className="w-16 h-16 text-emerald-500" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2">Order Confirmed!</h1>
                        <p className="text-slate-400 text-lg">
                            Your tickets have been sent to your email
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="card-glass p-8 text-left mb-8">
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-700">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Order Number</p>
                                <p className="text-white font-bold text-xl">{order.orderNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-sm mb-1">Total Amount</p>
                                <p className="text-emerald-500 font-bold text-2xl">৳{order.totalAmount.toFixed(2)}</p>
                            </div>
                        </div>

                        <h3 className="text-white font-bold mb-4">Order Items</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <div>
                                        <p className="text-white font-semibold">{item.event.name}</p>
                                        <p className="text-slate-400 text-sm">{item.ticket.name} × {item.quantity}</p>
                                    </div>
                                    <p className="text-white font-semibold">৳{item.subtotal.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button className="btn-primary py-4">
                            <Download className="inline-block mr-2 w-5 h-5" />
                            Download Tickets
                        </button>
                        <button className="btn-outline py-4">
                            <Calendar className="inline-block mr-2 w-5 h-5" />
                            Add to Calendar
                        </button>
                        <button className="btn-outline py-4">
                            <Share2 className="inline-block mr-2 w-5 h-5" />
                            Share
                        </button>
                    </div>

                    <a href="/dashboard" className="block text-emerald-500 hover:text-emerald-400 mt-8">
                        View Order in Dashboard →
                    </a>
                </div>
            </section>

            <Footer tenantName={tenantName} />
        </div>
    );
}
