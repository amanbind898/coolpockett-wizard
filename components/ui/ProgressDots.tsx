'use client';

interface ProgressDotsProps {
    current: number; // 1-based
    total?: number;
}

export default function ProgressDots({ current, total = 4 }: ProgressDotsProps) {
    return (
        <ol
            role="list"
            aria-label="Form progress"
            className="flex items-center justify-center gap-2 py-4 list-none m-0 p-0"
        >
            {Array.from({ length: total }, (_, i) => {
                const step = i + 1;
                const isActive = step === current;
                const isDone = step < current;

                return (
                    <li
                        key={step}
                        aria-label={`Step ${step}${isActive ? ' (current)' : isDone ? ' (completed)' : ''}`}
                        aria-current={isActive ? 'step' : undefined}
                        className={`rounded-full transition-all duration-300 ${isActive
                            ? 'w-5 h-2.5 bg-gray-900'
                            : isDone
                                ? 'w-2.5 h-2.5 bg-gray-400'
                                : 'w-2.5 h-2.5 bg-gray-200'
                            }`}
                    />
                );
            })}
        </ol>
    );
}
