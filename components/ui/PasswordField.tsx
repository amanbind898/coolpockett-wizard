'use client';

import React, { useState } from 'react';
import { getPasswordStrength } from '@/utils/validators';
import type { PasswordStrength } from '@/utils/validators';

interface PasswordFieldProps {
    label?: string;
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

const strengthMeta: Record<PasswordStrength, { color: string; width: string }> = {
    Weak: { color: 'bg-red-400', width: 'w-1/4' },
    Fair: { color: 'bg-yellow-400', width: 'w-2/4' },
    Strong: { color: 'bg-blue-500', width: 'w-3/4' },
    'Very Strong': { color: 'bg-green-500', width: 'w-full' },
};

export default function PasswordField({
    label = 'Password',
    value,
    onChange,
    error,
}: PasswordFieldProps) {
    const [show, setShow] = useState(false);
    const strength = getPasswordStrength(value);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                {label}
            </label>

            {/* Input row */}
            <div className="relative">
                <input
                    id="password"
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter password"
                    className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm outline-none transition-all
            placeholder:text-gray-400
            ${error
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-gray-200 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                    {show ? (
                        // Eye-off icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={2}>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    ) : (
                        // Eye icon
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={2}>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Strength bar */}
            {value && strength && (
                <div className="mt-1">
                    <div className="h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${strengthMeta[strength].color} ${strengthMeta[strength].width}`}
                        />
                    </div>
                    <p className={`text-xs mt-1 font-medium ${strength === 'Weak' ? 'text-red-500' :
                            strength === 'Fair' ? 'text-yellow-600' :
                                strength === 'Strong' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                        {strength}
                    </p>
                </div>
            )}

            {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
        </div>
    );
}
