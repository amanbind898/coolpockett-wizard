'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function Input({ label, error, id, className = '', ...rest }: InputProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={inputId}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={inputId}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all
          placeholder:text-gray-400
          ${error
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                    } ${className}`}
                {...rest}
            />
            {error && (
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
            )}
        </div>
    );
}
