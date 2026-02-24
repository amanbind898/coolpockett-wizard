'use client';

import { useState } from 'react';
import { useWizard } from '@/context/WizardContext';
import { COUNTRIES } from '@/components/ui/CountrySelect';

// ── Account preview content ────────────────────────────────────────────────
const ACCOUNT_PREVIEW: Record<string, { title: string; perks: string[] }> = {
    'Individual-Spend': {
        title: 'CoolPockett Spend (Personal)',
        perks: ['Instant spending notifications', 'Budgeting tools included', 'No monthly fees'],
    },
    'Individual-Save': {
        title: 'CoolPockett Save (Personal)',
        perks: ['High-yield savings vault', 'Automatic round-ups', 'Goal tracking built-in'],
    },
    'Individual-Invest': {
        title: 'CoolPockett Invest (Personal)',
        perks: ['Fractional shares from $1', 'Diversified portfolio presets', 'Real-time market data'],
    },
    'Business-Spend': {
        title: 'CoolPockett Spend Pro',
        perks: ['Team expense cards', 'Receipt capture & export', 'Accounting integrations'],
    },
    'Business-Save': {
        title: 'CoolPockett Save Pro',
        perks: ['Business savings vault', 'Interest on idle funds', 'Multi-user access'],
    },
    'Business-Invest': {
        title: 'CoolPockett Invest Pro',
        perks: ['Managed business portfolio', 'Tax-optimised strategies', 'Dedicated advisor access'],
    },
};

// ── Helper to mask sensitive fields ───────────────────────────────────────
function mask(value: string, show = 3): string {
    if (!value || value.length <= show) return value;
    return value.slice(0, show) + '•'.repeat(value.length - show);
}

// ── Row component ─────────────────────────────────────────────────────────
function Row({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
        <div className="flex justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800 font-medium text-right break-all">{value}</span>
        </div>
    );
}

// ── Section card ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
            {children}
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────
export default function Step4Review({ onSubmit }: { onSubmit: () => void }) {
    const { state } = useWizard();
    const { step1, step2, step3 } = state;
    const [submitting, setSubmitting] = useState(false);

    const countryName = COUNTRIES.find(c => c.code === step1.country)?.name ?? step1.country;
    const previewKey = `${step2.accountType}-${step2.productGoal}`;
    const preview = ACCOUNT_PREVIEW[previewKey];

    const handleSubmit = async () => {
        setSubmitting(true);
        // Simulate network delay (mock)
        await new Promise((res) => setTimeout(res, 1200));
        onSubmit();
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center mb-2">
                <h2 className="text-lg font-bold text-gray-900">Review your details</h2>
                <p className="text-xs text-gray-500 mt-1">Make sure everything looks correct before submitting.</p>
            </div>

            {/* Account basics */}
            <Section title="Account basics">
                <Row label="Name" value={step1.fullName} />
                <Row label="Email" value={step1.email} />
                <Row label="Phone" value={step1.phone} />
                <Row label="Country" value={countryName} />
            </Section>

            {/* Account setup */}
            <Section title="Account setup">
                <Row label="Type" value={step2.accountType} />
                <Row label="Goal" value={step2.productGoal} />
                <Row label="Monthly volume" value={`${step2.monthlyVolume}%`} />
            </Section>

            {/* Details */}
            <Section title="Details">
                {step2.accountType === 'Individual' ? (
                    <>
                        <Row label="DOB" value={step3.dob} />
                        <Row label="Address" value={step3.address} />
                        <Row label="ID type" value={step3.idType} />
                        <Row label="ID number" value={mask(step3.idNumber)} />
                    </>
                ) : (
                    <>
                        <Row label="Business" value={step3.businessName} />
                        <Row label="Reg. country" value={step3.regCountry} />
                        <Row label="Role" value={step3.role} />
                    </>
                )}
                {step1.country === 'US' && (
                    <>
                        <Row label="State" value={step3.state} />
                        <Row label="SSN last 4" value={`••••${step3.ssnLast4}`} />
                    </>
                )}
                {step1.country === 'IN' && <Row label="PAN" value={mask(step3.pan, 2)} />}
                {step1.country !== 'US' && step1.country !== 'IN' && (
                    <Row label="National ID" value={mask(step3.nationalId)} />
                )}
                {step3.uploadedFileName && (
                    <Row label="Document" value={`📄 ${step3.uploadedFileName}`} />
                )}
            </Section>

            {/* Account preview widget */}
            {preview && (
                <div className="rounded-xl border-2 border-gray-900 bg-white px-4 py-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account preview</p>
                    <p className="text-sm font-bold text-gray-900 mb-3">{preview.title}</p>
                    <ul className="flex flex-col gap-1.5">
                        {preview.perks.map((perk) => (
                            <li key={perk} className="flex items-start gap-2 text-xs text-gray-700">
                                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Submit button */}
            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-gray-900 text-white rounded-xl py-3.5 text-sm font-semibold
          hover:bg-gray-800 active:bg-gray-950 transition-all disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
            >
                {submitting ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Opening account…
                    </>
                ) : 'Submit'}
            </button>

            <p className="text-center text-xs text-gray-400">
                By submitting you agree to CoolPockett&apos;s Terms & Privacy Policy
            </p>
        </div>
    );
}
