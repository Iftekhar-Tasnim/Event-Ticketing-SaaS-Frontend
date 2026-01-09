'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
    faqs: { question: string; answer: string }[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="card-glass">
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="card">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <h4 className="text-white font-semibold pr-4">{faq.question}</h4>
                            <ChevronDown
                                className={`w-5 h-5 text-emerald-500 transition-transform ${openIndex === index ? 'transform rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {openIndex === index && (
                            <div className="mt-4 pt-4 border-t border-slate-700">
                                <p className="text-slate-300">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
