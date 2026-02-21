import {
  SignInFormState,
  SignInValidationErrors,
  SignUpFormState,
  StepFourErrors,
  StepOneErrors,
  StepThreeErrors,
  StepTwoErrors,
} from './types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignIn(form: SignInFormState): SignInValidationErrors {
  const errors: SignInValidationErrors = {};

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.password.trim()) {
    errors.password = 'Password is required.';
  } else if (form.password.trim().length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function validateStepOne(form: SignUpFormState): StepOneErrors {
  const errors: StepOneErrors = {};

  if (!form.countryCode.trim()) {
    errors.countryCode = 'Country code is required.';
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Mobile number is required.';
  }

  const sms = form.smsCode.join('').trim();
  if (!/^\d{4}$/.test(sms)) {
    errors.smsCode = 'SMS code must be 4 digits.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.password.trim()) {
    errors.password = 'Password is required.';
  } else if (form.password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}

export function validateStepTwo(form: SignUpFormState): StepTwoErrors {
  const errors: StepTwoErrors = {};

  if (!form.usageReason) {
    errors.usageReason = 'Please select why you will use the service.';
  }

  if (!form.userRole) {
    errors.userRole = 'Please select your role.';
  }

  if (!form.onboardingPreference) {
    errors.onboardingPreference = 'Please choose Yes or No.';
  }

  return errors;
}

export function validateStepThree(form: SignUpFormState): StepThreeErrors {
  const errors: StepThreeErrors = {};

  if (!form.companyName.trim()) {
    errors.companyName = 'Company name is required.';
  }

  if (!form.businessDirection) {
    errors.businessDirection = 'Please select a business direction.';
  }

  if (!form.teamSize) {
    errors.teamSize = 'Please select team size.';
  }

  return errors;
}

export function validateStepFour(form: SignUpFormState): StepFourErrors {
  const inviteErrors = form.invites.map((invite) => {
    const value = invite.trim();

    if (!value) {
      return '';
    }

    return emailRegex.test(value) ? '' : 'Enter a valid email address.';
  });

  return {
    invites: inviteErrors,
  };
}

export function hasErrors<T extends object>(errors: T): boolean {
  return Object.values(errors as Record<string, unknown>).some((value) => {
    if (Array.isArray(value)) {
      return value.some((item) => Boolean(item));
    }

    return Boolean(value);
  });
}
