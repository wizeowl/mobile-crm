export type YesNoValue = 'yes' | 'no' | null;

export interface Option {
  label: string;
  value: string;
}

export interface SignInFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormState {
  countryCode: string;
  phoneNumber: string;
  smsCode: string[];
  email: string;
  password: string;
  usageReason: string | null;
  userRole: string | null;
  onboardingPreference: YesNoValue;
  companyName: string;
  businessDirection: string | null;
  teamSize: string | null;
  invites: string[];
}

export interface SignInValidationErrors {
  email?: string;
  password?: string;
}

export interface StepOneErrors {
  countryCode?: string;
  phoneNumber?: string;
  smsCode?: string;
  email?: string;
  password?: string;
}

export interface StepTwoErrors {
  usageReason?: string;
  userRole?: string;
  onboardingPreference?: string;
}

export interface StepThreeErrors {
  companyName?: string;
  businessDirection?: string;
  teamSize?: string;
}

export interface StepFourErrors {
  invites: string[];
}

export interface AuthSession {
  token: string;
  userId: string;
}
