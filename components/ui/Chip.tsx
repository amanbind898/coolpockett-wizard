'use client';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function Chip({ label, selected, onClick }: ChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-150
        ${selected
                    ? 'border-gray-900 bg-gray-50 text-gray-900 font-semibold'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
        >
            {label}
        </button>
    );
}
