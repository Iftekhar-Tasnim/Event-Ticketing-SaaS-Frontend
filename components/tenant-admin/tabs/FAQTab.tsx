'use client';

import { Plus, Trash2 } from 'lucide-react';

interface FAQTabProps {
    eventData: any;
    setEventData: (data: any) => void;
}

export default function FAQTab({ eventData, setEventData }: FAQTabProps) {
    const addFAQItem = () => {
        const newFAQ = [
            ...(eventData.faq || []),
            { question: '', answer: '' },
        ];
        setEventData({ ...eventData, faq: newFAQ });
    };

    const updateFAQItem = (index: number, field: string, value: string) => {
        const newFAQ = [...eventData.faq];
        newFAQ[index] = { ...newFAQ[index], [field]: value };
        setEventData({ ...eventData, faq: newFAQ });
    };

    const deleteFAQItem = (index: number) => {
        const newFAQ = eventData.faq.filter((_: any, i: number) => i !== index);
        setEventData({ ...eventData, faq: newFAQ });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Help attendees by answering common questions
                        </p>
                    </div>
                    <button
                        onClick={addFAQItem}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add FAQ
                    </button>
                </div>

                <div className="space-y-4">
                    {eventData.faq?.map((item: any, index: number) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Question
                                        </label>
                                        <input
                                            type="text"
                                            value={item.question}
                                            onChange={(e) => updateFAQItem(index, 'question', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                            placeholder="What time does the event start?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Answer
                                        </label>
                                        <textarea
                                            value={item.answer}
                                            onChange={(e) => updateFAQItem(index, 'answer', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                            rows={3}
                                            placeholder="The event starts at 6:00 PM. Doors open at 5:30 PM."
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteFAQItem(index)}
                                    className="mt-2 p-2 hover:bg-red-50 rounded transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {(!eventData.faq || eventData.faq.length === 0) && (
                        <div className="text-center py-8 text-slate-500">
                            No FAQ items yet. Add questions and answers to help your attendees.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
