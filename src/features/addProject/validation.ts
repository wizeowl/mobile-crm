import {
  AddProjectFormState,
  AddProjectValidationErrors,
  AddTaskFormState,
  AddTaskValidationErrors,
} from './types';

export function validateAddProject(form: AddProjectFormState): AddProjectValidationErrors {
  const errors: AddProjectValidationErrors = {};

  if (!form.projectName.trim()) {
    errors.projectName = 'Project name is required.';
  }

  if (!form.startsDate) {
    errors.startsDate = 'Start date is required.';
  }

  if (!form.deadLine) {
    errors.deadLine = 'Deadline is required.';
  }

  if (!form.priority) {
    errors.priority = 'Priority is required.';
  }

  return errors;
}

export function validateAddTask(form: AddTaskFormState): AddTaskValidationErrors {
  const errors: AddTaskValidationErrors = {};

  if (!form.taskName.trim()) {
    errors.taskName = 'Task name is required.';
  }

  if (!form.taskGroupId) {
    errors.taskGroupId = 'Task group is required.';
  }

  if (!form.estimate) {
    errors.estimate = 'Estimate is required.';
  }

  if (!form.deadLine) {
    errors.deadLine = 'Deadline is required.';
  }

  if (!form.priority) {
    errors.priority = 'Priority is required.';
  }

  if (!form.assigneeId) {
    errors.assigneeId = 'Assignee is required.';
  }

  return errors;
}

export function hasAddProjectErrors(errors: AddProjectValidationErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}

export function hasAddTaskErrors(errors: AddTaskValidationErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}
