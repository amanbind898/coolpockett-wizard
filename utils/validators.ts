import type { Step1Data, Step2Data, Step3Data, StepErrors } from '@/types/wizard';

// ── Step 1 ──────────────────────────────────────────────────────────────────
export function validateStep1(data: Step1Data): StepErrors<Step1Data> {
    const errors: StepErrors<Step1Data> = {};

    if (!data.fullName.trim()) {
        errors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
        errors.fullName = 'Name must be at least 2 characters';
    }

    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Enter a valid email address';
    }

    if (!data.phone.trim()) {
        errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(data.phone)) {
        errors.phone = 'Enter a valid phone number';
    }

    if (!data.country) {
        errors.country = 'Please select a country';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    return errors;
}

// ── Step 2 ──────────────────────────────────────────────────────────────────
export function validateStep2(data: Step2Data): StepErrors<Step2Data> {
    const errors: StepErrors<Step2Data> = {};

    if (!data.accountType) {
        errors.accountType = 'Please select an account type';
    }
    if (!data.productGoal) {
        errors.productGoal = 'Please select a product goal';
    }

    return errors;
}

// ── Step 3 ──────────────────────────────────────────────────────────────────
export function validateStep3(
    data: Step3Data,
    accountType: string,
    country: string
): StepErrors<Step3Data> {
    const errors: StepErrors<Step3Data> = {};

    if (accountType === 'Individual') {
        if (!data.dob) errors.dob = 'Date of birth is required';
        if (!data.address.trim()) errors.address = 'Address is required';
        if (!data.idType) errors.idType = 'Select an ID type';
        if (!data.idNumber.trim()) errors.idNumber = 'ID number is required';
    }

    if (accountType === 'Business') {
        if (!data.businessName.trim()) errors.businessName = 'Business name is required';
        if (!data.regCountry) errors.regCountry = 'Registration country is required';
        if (!data.role.trim()) errors.role = 'Your role is required';
    }

    if (country === 'US') {
        if (!data.state) errors.state = 'State is required';
        if (!data.ssnLast4 || !/^\d{4}$/.test(data.ssnLast4))
            errors.ssnLast4 = 'Enter last 4 digits of SSN';
    } else if (country === 'IN') {
        if (!data.pan.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(data.pan))
            errors.pan = 'Enter a valid PAN (e.g. ABCDE1234F)';
    } else if (country) {
        if (!data.nationalId.trim()) errors.nationalId = 'National ID is required';
    }

    return errors;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
export function isValid(errors: Record<string, string | undefined>): boolean {
    return Object.keys(errors).length === 0;
}

export type PasswordStrength = 'Weak' | 'Fair' | 'Strong' | 'Very Strong';

export function getPasswordStrength(password: string): PasswordStrength | '' {
    if (!password) return '';
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Strong';
    return 'Very Strong';
}
