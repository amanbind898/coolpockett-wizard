'use client';

import { useWizard } from '@/context/WizardContext';
import type { StepErrors, Step1Data } from '@/types/wizard';
import Input from '@/components/ui/Input';
import PasswordField from '@/components/ui/PasswordField';
import CountrySelect from '@/components/ui/CountrySelect';

interface Props {
    errors: StepErrors<Step1Data>;
}

export default function Step1Basics({ errors }: Props) {
    const { state, updateStep1 } = useWizard();
    const { step1 } = state;

    return (
        <div className="flex flex-col gap-5">
            {/* Brand header */}
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">CoolPockett</h2>
                <p className="text-sm text-gray-500 mt-1">Let&apos;s get started</p>
            </div>

            <Input
                label="Full name"
                id="fullName"
                placeholder="Enter name"
                value={step1.fullName}
                onChange={(e) => updateStep1({ fullName: e.target.value })}
                error={errors.fullName}
                autoComplete="name"
            />

            <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Enter email"
                value={step1.email}
                onChange={(e) => updateStep1({ email: e.target.value })}
                error={errors.email}
                autoComplete="email"
            />

            <Input
                label="Phone"
                id="phone"
                type="tel"
                placeholder="Enter phone"
                value={step1.phone}
                onChange={(e) => updateStep1({ phone: e.target.value })}
                error={errors.phone}
                autoComplete="tel"
            />

            <CountrySelect
                value={step1.country}
                onChange={(val) => updateStep1({ country: val })}
                error={errors.country}
            />

            <PasswordField
                value={step1.password}
                onChange={(val) => updateStep1({ password: val })}
                error={errors.password}
            />
        </div>
    );
}
