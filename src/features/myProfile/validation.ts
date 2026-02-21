import { AddRequestFormState, AddRequestValidationErrors } from './types';

export function validateAddRequest(
  form: AddRequestFormState,
  vacationDaysLeft: number,
): AddRequestValidationErrors {
  const errors: AddRequestValidationErrors = {};

  if (form.mode === 'days') {
    if (form.selectedDays.length === 0) {
      errors.selectedDays = 'Select at least one day.';
      return errors;
    }

    if (form.type === 'vacation' && form.selectedDays.length > vacationDaysLeft) {
      errors.selectedDays = `You have ${vacationDaysLeft} days of Vacation left`;
    }

    return errors;
  }

  if (!form.fromTime.trim()) {
    errors.fromTime = 'Select start time.';
  }

  if (!form.toTime.trim()) {
    errors.toTime = 'Select end time.';
  }

  if (form.fromTime.trim() && form.toTime.trim()) {
    const from = toMinutes(form.fromTime);
    const to = toMinutes(form.toTime);

    if (from === null || to === null || to <= from) {
      errors.toTime = 'End time must be after start time.';
    }
  }

  return errors;
}

export function hasAddRequestErrors(errors: AddRequestValidationErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}

function toMinutes(value: string): number | null {
  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (match[3] === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (match[3] === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}
