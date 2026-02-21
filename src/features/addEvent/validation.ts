import { AddEventFormState, AddEventValidationErrors } from './types';

export function validateAddEvent(form: AddEventFormState): AddEventValidationErrors {
  const errors: AddEventValidationErrors = {};

  if (!form.eventName.trim()) {
    errors.eventName = 'Event name is required.';
  }

  if (!form.category) {
    errors.category = 'Event category is required.';
  }

  if (!form.priority) {
    errors.priority = 'Priority is required.';
  }

  if (!form.date) {
    errors.date = 'Date is required.';
  }

  if (!form.time) {
    errors.time = 'Time is required.';
  }

  if (form.repeatEnabled) {
    if (!form.repeatTime) {
      errors.repeatTime = 'Repeat time is required.';
    }

    if (!form.repeatEveryDay && form.repeatDays.length === 0) {
      errors.repeatDays = 'Select at least one day or enable repeat every day.';
    }
  }

  return errors;
}

export function hasAddEventErrors(errors: AddEventValidationErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}
