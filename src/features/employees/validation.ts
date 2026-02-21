import { AddEmployeeFormState, AddEmployeeValidationErrors } from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAddEmployee(form: AddEmployeeFormState): AddEmployeeValidationErrors {
  const errors: AddEmployeeValidationErrors = {
    emails: form.emails.map(() => ''),
  };

  const normalized = form.emails.map((value) => value.trim().toLowerCase());
  const seen = new Set<string>();

  normalized.forEach((email, index) => {
    if (!email) {
      errors.emails[index] = 'Email is required.';
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      errors.emails[index] = 'Enter a valid email.';
      return;
    }

    if (seen.has(email)) {
      errors.emails[index] = 'Duplicate email.';
      return;
    }

    seen.add(email);
  });

  return errors;
}

export function hasAddEmployeeErrors(errors: AddEmployeeValidationErrors): boolean {
  return errors.emails.some((value) => Boolean(value));
}
