'use client';

import { useWizard } from '@/context/WizardContext';
import type { StepErrors, Step2Data } from '@/types/wizard';
import type { AccountType, ProductGoal } from '@/types/wizard';
import SelectCard from '@/components/ui/SelectCard';
import Chip from '@/components/ui/Chip';

interface Props {
    errors: StepErrors<Step2Data>;
}

const ACCOUNT_TYPES: AccountType[] = ['Individual', 'Business'];
const PRODUCT_GOALS: ProductGoal[] = ['Spend', 'Save', 'Invest'];

export default function Step2Setup({ errors }: Props) {
    const { state, updateStep2 } = useWizard();
    const { step2 } = state;

    return (
        <div className="flex flex-col gap-6">
            {/* Account type */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Account type</p>
                <div className="grid grid-cols-2 gap-3">
                    {ACCOUNT_TYPES.map((type) => (
                        <SelectCard
                            key={type}
                            label={type}
                            selected={step2.accountType === type}
                            onClick={() => updateStep2({ accountType: type })}
                        />
                    ))}
                </div>
                {errors.accountType && (
                    <p className="text-xs text-red-500">{errors.accountType}</p>
                )}
            </div>

            {/* Product goal */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Product goal</p>
                <div className="flex flex-col gap-2">
                    {PRODUCT_GOALS.map((goal) => (
                        <Chip
                            key={goal}
                            label={goal}
                            selected={step2.productGoal === goal}
                            onClick={() => updateStep2({ productGoal: goal })}
                        />
                    ))}
                </div>
                {errors.productGoal && (
                    <p className="text-xs text-red-500">{errors.productGoal}</p>
                )}
            </div>

            {/* Monthly volume slider */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Monthly volume</p>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 shrink-0">Low</span>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={step2.monthlyVolume}
                        onChange={(e) => updateStep2({ monthlyVolume: Number(e.target.value) })}
                        className="w-full accent-gray-900 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400 shrink-0">High</span>
                </div>
            </div>
        </div>
    );
}
