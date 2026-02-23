export type AccountType = 'Individual' | 'Business' | '';
export type ProductGoal = 'Spend' | 'Save' | 'Invest' | '';
export type IdType = 'Passport' | 'Driving License' | 'National ID' | '';

export interface Step1Data {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    password: string;
}

export interface Step2Data {
    accountType: AccountType;
    productGoal: ProductGoal;
    monthlyVolume: number;
}

export interface Step3Data {
    // Individual path
    dob: string;
    address: string;
    idType: IdType;
    idNumber: string;
    // Business path
    businessName: string;
    regCountry: string;
    role: string;
    // Country-driven (US)
    state: string;
    ssnLast4: string;
    // Country-driven (IN)
    pan: string;
    // Country-driven (Else)
    nationalId: string;
    // File upload
    uploadedFileName: string;
}

export interface WizardState {
    currentStep: number;
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
}

export type StepErrors<T> = Partial<Record<keyof T, string>>;
