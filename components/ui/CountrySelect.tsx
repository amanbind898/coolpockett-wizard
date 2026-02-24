'use client';

interface CountrySelectProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export const COUNTRIES = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'KE', name: 'Kenya' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' },
    { code: 'JP', name: 'Japan' },
    { code: 'OTHER', name: 'Other' },
];

export default function CountrySelect({ value, onChange, error }: CountrySelectProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-sm font-medium text-gray-700">
                Country of residency
            </label>
            <select
                id="country"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 text-sm bg-white outline-none transition-all appearance-none
          ${value === '' ? 'text-gray-400' : 'text-gray-900'}
          ${error
                        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                    }`}
            >
                <option value="" disabled>Select country</option>
                {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
        </div>
    );
}
