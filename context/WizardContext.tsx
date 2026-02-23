'use client';

import React, {
    createContext,
    useContext,
    useCallback,
} from 'react';
import type { WizardState, Step1Data, Step2Data, Step3Data } from '@/types/wizard';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ── Initial state ─────────────────────────────────────────────────────────────
const initialState: WizardState = {
    currentStep: 1,
    step1: {
        fullName: '',
        email: '',
        phone: '',
        country: '',
        password: '',
    },
    step2: {
        accountType: '',
        productGoal: '',
        monthlyVolume: 50,
    },
    step3: {
        dob: '',
        address: '',
        idType: '',
        idNumber: '',
        businessName: '',
        regCountry: '',
        role: '',
        state: '',
        ssnLast4: '',
        pan: '',
        nationalId: '',
        uploadedFileName: '',
    },
};

// ── Context shape ─────────────────────────────────────────────────────────────
interface WizardContextValue {
    state: WizardState;
    setStep: (step: number) => void;
    updateStep1: (data: Partial<Step1Data>) => void;
    updateStep2: (data: Partial<Step2Data>) => void;
    updateStep3: (data: Partial<Step3Data>) => void;
    reset: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function WizardProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useLocalStorage<WizardState>(
        'coolpockett-wizard',
        initialState
    );

    const setStep = useCallback(
        (step: number) => setState((prev) => ({ ...prev, currentStep: step })),
        [setState]
    );

    const updateStep1 = useCallback(
        (data: Partial<Step1Data>) =>
            setState((prev) => ({ ...prev, step1: { ...prev.step1, ...data } })),
        [setState]
    );

    const updateStep2 = useCallback(
        (data: Partial<Step2Data>) =>
            setState((prev) => ({ ...prev, step2: { ...prev.step2, ...data } })),
        [setState]
    );

    const updateStep3 = useCallback(
        (data: Partial<Step3Data>) =>
            setState((prev) => ({ ...prev, step3: { ...prev.step3, ...data } })),
        [setState]
    );

    const reset = useCallback(() => setState(initialState), [setState]);

    return (
        <WizardContext.Provider
            value={{ state, setStep, updateStep1, updateStep2, updateStep3, reset }}
        >
            {children}
        </WizardContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useWizard(): WizardContextValue {
    const ctx = useContext(WizardContext);
    if (!ctx) throw new Error('useWizard must be used inside <WizardProvider>');
    return ctx;
}
