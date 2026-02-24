'use client';

interface ProgressDotsProps {
    current: number; // 1-based
    total?: number;
}

export default function ProgressDots({ current, total = 4 }: ProgressDotsProps) {
    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {Array.from({ length: total }, (_, i) => {
                const step = i + 1;
                const isActive = step === current;
                const isDone = step < current;

                return (
                    <span
                        key={step}
                        aria-label={`Step ${step}${isActive ? ' (current)' : ''}`}
                        className={`rounded-full transition-all duration-300 ${isActive
                                ? 'w-5 h-2.5 bg-gray-900'           // active: pill shape
                                : isDone
                                    ? 'w-2.5 h-2.5 bg-gray-400'          // done: filled circle
                                    : 'w-2.5 h-2.5 bg-gray-200'           // future: light circle
                            }`}
                    />
                );
            })}
        </div>
    );
}
