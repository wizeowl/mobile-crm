import { TimeLogFormState, TimeLogValidationErrors } from './types';

export function validateTimeLog(form: TimeLogFormState): TimeLogValidationErrors {
  const errors: TimeLogValidationErrors = {};

  if (!form.timeSpent.trim()) {
    errors.timeSpent = 'Time spent is required.';
  }

  if (!form.date.trim()) {
    errors.date = 'Date is required.';
  }

  if (!form.time.trim()) {
    errors.time = 'Time is required.';
  }

  if (!form.workDescription.trim()) {
    errors.workDescription = 'Work description is required.';
  } else if (form.workDescription.trim().length < 10) {
    errors.workDescription = 'Add at least 10 characters.';
  }

  return errors;
}

export function hasTimeLogErrors(errors: TimeLogValidationErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}
