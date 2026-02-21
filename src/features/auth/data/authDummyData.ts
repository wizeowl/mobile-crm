import { Option, SignInFormState, SignUpFormState } from '../types';

export const countryCodeOptions: Option[] = [
  { label: '+1', value: '+1' },
  { label: '+33', value: '+33' },
  { label: '+44', value: '+44' },
  { label: '+49', value: '+49' },
  { label: '+216', value: '+216' },
];

export const usageReasonOptions: Option[] = [
  { label: 'Work', value: 'work' },
  { label: 'Project tracking', value: 'project-tracking' },
  { label: 'Team collaboration', value: 'team-collaboration' },
  { label: 'Client communication', value: 'client-communication' },
];

export const roleOptions: Option[] = [
  { label: 'Business Owner', value: 'business-owner' },
  { label: 'Project Manager', value: 'project-manager' },
  { label: 'Team Lead', value: 'team-lead' },
  { label: 'Individual Contributor', value: 'individual-contributor' },
];

export const businessDirectionOptions: Option[] = [
  { label: 'IT and programming', value: 'it-programming' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'Sales', value: 'sales' },
  { label: 'Education', value: 'education' },
];

export const teamSizeOptions: Option[] = [
  { label: 'Only me', value: 'only-me' },
  { label: '2 - 5', value: '2-5' },
  { label: '6 - 10', value: '6-10' },
  { label: '11 - 20', value: '11-20' },
  { label: '21 - 40', value: '21-40' },
  { label: '41 - 50', value: '41-50' },
  { label: '51 - 100', value: '51-100' },
  { label: '101 - 500', value: '101-500' },
];

export const initialSignInForm: SignInFormState = {
  email: '',
  password: '',
  rememberMe: false,
};

export const initialSignUpForm: SignUpFormState = {
  countryCode: '+1',
  phoneNumber: '',
  smsCode: ['', '', '', ''],
  email: '',
  password: '',
  usageReason: null,
  userRole: null,
  onboardingPreference: null,
  companyName: '',
  businessDirection: null,
  teamSize: null,
  invites: [''],
};
