'use client';

import { Clock } from 'lucide-react';

interface ScheduleTimelineProps {
    schedule: { time: string; activity: string; description?: string }[];
}

export default function ScheduleTimeline({ schedule }: ScheduleTimelineProps) {
    return (
        <div className="card-glass">
            <h2 className="text-3xl font-bold text-white mb-6">Event Schedule</h2>

            <div className="space-y-6">
                {schedule.map((item, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-emerald-500" />
                            </div>
                            {index < schedule.length - 1 && (
                                <div className="w-0.5 h-full bg-slate-700 mt-2"></div>
                            )}
                        </div>

                        <div className="flex-1 pb-6">
                            <p className="text-emerald-500 font-semibold mb-1">{item.time}</p>
                            <h4 className="text-white font-bold text-lg mb-2">{item.activity}</h4>
                            {item.description && (
                                <p className="text-slate-400">{item.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
