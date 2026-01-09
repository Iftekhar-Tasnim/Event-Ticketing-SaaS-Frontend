'use client';

import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ScheduleTabProps {
    eventData: any;
    setEventData: (data: any) => void;
}

export default function ScheduleTab({ eventData, setEventData }: ScheduleTabProps) {
    const addScheduleItem = () => {
        const newSchedule = [
            ...(eventData.schedule || []),
            { time: '', activity: '', description: '' },
        ];
        setEventData({ ...eventData, schedule: newSchedule });
    };

    const updateScheduleItem = (index: number, field: string, value: string) => {
        const newSchedule = [...eventData.schedule];
        newSchedule[index] = { ...newSchedule[index], [field]: value };
        setEventData({ ...eventData, schedule: newSchedule });
    };

    const deleteScheduleItem = (index: number) => {
        const newSchedule = eventData.schedule.filter((_: any, i: number) => i !== index);
        setEventData({ ...eventData, schedule: newSchedule });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Event Schedule</h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Add timeline of activities for your event
                        </p>
                    </div>
                    <button
                        onClick={addScheduleItem}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </button>
                </div>

                <div className="space-y-4">
                    {eventData.schedule?.map((item: any, index: number) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-2 cursor-move">
                                    <GripVertical className="w-5 h-5 text-slate-400" />
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            value={item.time}
                                            onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Activity
                                        </label>
                                        <input
                                            type="text"
                                            value={item.activity}
                                            onChange={(e) => updateScheduleItem(index, 'activity', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                            placeholder="Registration Opens"
                                        />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">
                                            Description (Optional)
                                        </label>
                                        <textarea
                                            value={item.description || ''}
                                            onChange={(e) => updateScheduleItem(index, 'description', e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                            rows={2}
                                            placeholder="Additional details about this activity"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteScheduleItem(index)}
                                    className="mt-2 p-2 hover:bg-red-50 rounded transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {(!eventData.schedule || eventData.schedule.length === 0) && (
                        <div className="text-center py-8 text-slate-500">
                            No schedule items yet. Add items to create your event timeline.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
