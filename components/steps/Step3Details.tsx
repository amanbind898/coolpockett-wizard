'use client';

import { useRef, useEffect } from 'react';
import { useWizard } from '@/context/WizardContext';
import type { StepErrors, Step3Data, IdType } from '@/types/wizard';
import Input from '@/components/ui/Input';
import { COUNTRIES } from '@/components/ui/CountrySelect';

interface Props {
    errors: StepErrors<Step3Data>;
}

const ID_TYPES: IdType[] = ['Passport', 'Driving License', 'National ID'];

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function Step3Details({ errors }: Props) {
    const { state, updateStep3 } = useWizard();
    const { step2, step3, step1 } = state;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Bug fix: clear stale country-specific fields when country changes
    // (e.g. user fills US fields, goes back, switches to India — old SSN/state would persist)
    useEffect(() => {
        updateStep3({ state: '', ssnLast4: '', pan: '', nationalId: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step1.country]);

    const isIndividual = step2.accountType === 'Individual';
    const isBusiness = step2.accountType === 'Business';
    const country = step1.country;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) updateStep3({ uploadedFileName: file.name });
    };

    const countryLabel = COUNTRIES.find(c => c.code === country)?.name ?? country;

    return (
        <div className="flex flex-col gap-5">
            {/* Context banner */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                <p className="text-xs text-gray-500">
                    Based on: <span className="font-semibold text-gray-800">
                        {step2.accountType || '—'} · {countryLabel || '—'}
                    </span>
                </p>
            </div>

            {/* ── Individual path ────────────────────────────── */}
            {isIndividual && (
                <>
                    <Input
                        label="Date of birth"
                        id="dob"
                        type="date"
                        value={step3.dob}
                        onChange={(e) => updateStep3({ dob: e.target.value })}
                        error={errors.dob}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    <Input
                        label="Address line 1"
                        id="address"
                        placeholder="Enter address"
                        value={step3.address}
                        onChange={(e) => updateStep3({ address: e.target.value })}
                        error={errors.address}
                        autoComplete="street-address"
                    />
                    {/* ID type select */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="idType" className="text-sm font-medium text-gray-700">
                            ID type
                        </label>
                        <select
                            id="idType"
                            value={step3.idType}
                            onChange={(e) => updateStep3({ idType: e.target.value as IdType })}
                            className={`w-full rounded-lg border px-4 py-3 text-sm bg-white outline-none transition-all appearance-none
                ${step3.idType === '' ? 'text-gray-400' : 'text-gray-900'}
                ${errors.idType
                                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                                    : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                                }`}
                        >
                            <option value="" disabled>Select ID type</option>
                            {ID_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.idType && <p className="text-xs text-red-500">{errors.idType}</p>}
                    </div>
                    <Input
                        label="ID number"
                        id="idNumber"
                        placeholder="Enter ID number"
                        value={step3.idNumber}
                        onChange={(e) => updateStep3({ idNumber: e.target.value })}
                        error={errors.idNumber}
                    />
                </>
            )}

            {/* ── Business path ──────────────────────────────── */}
            {isBusiness && (
                <>
                    <Input
                        label="Business legal name"
                        id="businessName"
                        placeholder="Enter business name"
                        value={step3.businessName}
                        onChange={(e) => updateStep3({ businessName: e.target.value })}
                        error={errors.businessName}
                    />
                    {/* Registration country */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="regCountry" className="text-sm font-medium text-gray-700">
                            Registration country
                        </label>
                        <select
                            id="regCountry"
                            value={step3.regCountry}
                            onChange={(e) => updateStep3({ regCountry: e.target.value })}
                            className={`w-full rounded-lg border px-4 py-3 text-sm bg-white outline-none transition-all appearance-none
                ${step3.regCountry === '' ? 'text-gray-400' : 'text-gray-900'}
                ${errors.regCountry
                                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                                    : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                                }`}
                        >
                            <option value="" disabled>Select country</option>
                            {COUNTRIES.map((c) => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                        </select>
                        {errors.regCountry && <p className="text-xs text-red-500">{errors.regCountry}</p>}
                    </div>
                    <Input
                        label="Your role"
                        id="role"
                        placeholder="e.g. Director, Owner"
                        value={step3.role}
                        onChange={(e) => updateStep3({ role: e.target.value })}
                        error={errors.role}
                    />
                </>
            )}

            {/* ── Country-driven section ─────────────────────── */}
            {country && (
                <div className="flex flex-col gap-4 pt-1">
                    <p className="text-sm font-semibold text-gray-700">
                        {country === 'US' ? 'US-specific' : country === 'IN' ? 'India-specific' : 'Identity verification'}
                    </p>

                    {country === 'US' && (
                        <>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
                                <select
                                    id="state"
                                    value={step3.state}
                                    onChange={(e) => updateStep3({ state: e.target.value })}
                                    className={`w-full rounded-lg border px-4 py-3 text-sm bg-white outline-none transition-all appearance-none
                    ${step3.state === '' ? 'text-gray-400' : 'text-gray-900'}
                    ${errors.state
                                            ? 'border-red-400 bg-red-50 focus:border-red-500'
                                            : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100'
                                        }`}
                                >
                                    <option value="" disabled>Select state</option>
                                    {US_STATES.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                            </div>
                            <Input
                                label="SSN last 4"
                                id="ssnLast4"
                                placeholder="••••"
                                maxLength={4}
                                value={step3.ssnLast4}
                                onChange={(e) => updateStep3({ ssnLast4: e.target.value.replace(/\D/g, '') })}
                                error={errors.ssnLast4}
                            />
                        </>
                    )}

                    {country === 'IN' && (
                        <Input
                            label="PAN"
                            id="pan"
                            placeholder="e.g. ABCDE1234F"
                            value={step3.pan}
                            onChange={(e) => updateStep3({ pan: e.target.value.toUpperCase() })}
                            error={errors.pan}
                            maxLength={10}
                        />
                    )}

                    {country !== 'US' && country !== 'IN' && (
                        <Input
                            label="National ID"
                            id="nationalId"
                            placeholder="Enter national ID number"
                            value={step3.nationalId}
                            onChange={(e) => updateStep3({ nationalId: e.target.value })}
                            error={errors.nationalId}
                        />
                    )}
                </div>
            )}

            {/* ── Document upload widget ────────────────────── */}
            <div className="flex flex-col gap-1 pt-1">
                <p className="text-sm font-medium text-gray-700">Supporting document</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    id="doc-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-3 w-full rounded-xl border-2 border-dashed border-gray-200 px-4 py-4 text-sm text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 text-gray-400" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className={step3.uploadedFileName ? 'text-gray-800 font-medium' : ''}>
                        {step3.uploadedFileName ? `📄 ${step3.uploadedFileName}` : 'Upload document (PDF, JPG, PNG)'}
                    </span>
                </button>
                <p className="text-xs text-gray-400">Mock upload — filename is saved for review</p>
            </div>
        </div>
    );
}
