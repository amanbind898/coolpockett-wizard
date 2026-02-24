'use client';

import { useState } from 'react';
import { WizardProvider, useWizard } from '@/context/WizardContext';
import { validateStep1, validateStep2, validateStep3 } from '@/utils/validators';
import type { StepErrors, Step1Data, Step2Data, Step3Data } from '@/types/wizard';
import ProgressDots from '@/components/ui/ProgressDots';
import Step1Basics from '@/components/steps/Step1Basics';
import Step2Setup from '@/components/steps/Step2Setup';
import Step3Details from '@/components/steps/Step3Details';
import Step4Review from '@/components/steps/Step4Review';

const STEP_TITLES = ['Account basics', 'Account setup', 'Details', 'Review'];

// ── Confirmation screen ───────────────────────────────────────────────────
function ConfirmationScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">You&apos;re all set!</h2>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Your CoolPockett account application has been received.<br />
                    We&apos;ll review your details and be in touch shortly.
                </p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 px-6 py-4 w-full">
                <p className="text-xs text-gray-400">Application reference</p>
                <p className="text-lg font-mono font-semibold text-gray-800 mt-1">
                    CP-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </p>
            </div>
        </div>
    );
}

// ── Inner wizard (has context access) ────────────────────────────────────
function WizardInner() {
    const { state, setStep, reset } = useWizard();
    const { currentStep } = state;

    const [submitted, setSubmitted] = useState(false);

    // Error state — single source of truth
    const [step1Errors, setStep1Errors] = useState<StepErrors<Step1Data>>({});
    const [step2Errors, setStep2Errors] = useState<StepErrors<Step2Data>>({});
    const [step3Errors, setStep3Errors] = useState<StepErrors<Step3Data>>({});

    const handleNext = () => {
        if (currentStep === 1) {
            const errors = validateStep1(state.step1);
            if (Object.keys(errors).length > 0) { setStep1Errors(errors); return; }
            setStep1Errors({});
        }
        if (currentStep === 2) {
            const errors = validateStep2(state.step2);
            if (Object.keys(errors).length > 0) { setStep2Errors(errors); return; }
            setStep2Errors({});
        }
        if (currentStep === 3) {
            const errors = validateStep3(state.step3, state.step2.accountType, state.step1.country);
            if (Object.keys(errors).length > 0) { setStep3Errors(errors); return; }
            setStep3Errors({});
        }
        setStep(currentStep + 1);
    };

    const handleBack = () => setStep(currentStep - 1);

    const handleSubmit = () => {
        setSubmitted(true);
        reset(); // clear localStorage on success
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Basics errors={step1Errors} />;
            case 2: return <Step2Setup errors={step2Errors} />;
            case 3: return <Step3Details errors={step3Errors} />;
            case 4: return <Step4Review onSubmit={handleSubmit} />;
            default: return null;
        }
    };

    // ── Confirmation state — full screen takeover ─────────────────────────
    if (submitted) {
        return (
            <div className="flex flex-col h-screen max-w-lg mx-auto">
                <main className="flex-1 overflow-y-auto">
                    <ConfirmationScreen />
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen max-w-lg mx-auto">

            {/* ── ZONE 1: Fixed Header ─────────────────────── */}
            <header className="flex items-center justify-center px-4 py-4 border-b border-gray-100 relative shrink-0">
                {currentStep > 1 && (
                    <button
                        onClick={handleBack}
                        aria-label="Go back"
                        className="absolute left-4 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                )}
                <h1 className="text-sm font-semibold tracking-wide text-gray-800">
                    {STEP_TITLES[currentStep - 1]}
                </h1>
            </header>

            {/* ── ZONE 2: Scrollable Content ───────────────── */}
            <main className="flex-1 overflow-y-auto px-6 pb-6">
                <ProgressDots current={currentStep} />
                <div key={currentStep} className="animate-fade-slide">
                    {renderStep()}
                </div>
            </main>

            {/* ── ZONE 3: Fixed Footer (hidden on step 4 — has its own submit) ── */}
            {currentStep < 4 && (
                <footer className="border-t border-gray-100 px-6 py-4 shrink-0">
                    <p className="text-center text-xs text-gray-400 mb-3">Step {currentStep} of 4</p>
                    <div className="flex gap-3">
                        {currentStep > 1 && (
                            <button
                                onClick={handleBack}
                                className="flex-1 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="flex-1 bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 active:bg-gray-950 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </footer>
            )}

            {/* Footer for step 4 shows Back only */}
            {currentStep === 4 && (
                <footer className="border-t border-gray-100 px-6 py-4 shrink-0">
                    <p className="text-center text-xs text-gray-400 mb-3">Step 4 of 4</p>
                    <button
                        onClick={handleBack}
                        className="w-full border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Back
                    </button>
                </footer>
            )}

        </div>
    );
}

// ── Root export ───────────────────────────────────────────────────────────
export default function Wizard() {
    return (
        <WizardProvider>
            <WizardInner />
        </WizardProvider>
    );
}