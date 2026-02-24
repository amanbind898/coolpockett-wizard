'use client';

interface SelectCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function SelectCard({ label, selected, onClick }: SelectCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full py-4 px-5 rounded-xl border-2 text-sm font-medium transition-all duration-150
        ${selected
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                }`}
        >
            {label}
        </button>
    );
}
