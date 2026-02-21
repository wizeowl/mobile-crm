import { TaskPriority } from '../projects/types';

export interface AddProjectFormState {
  projectName: string;
  startsDate: string | null;
  deadLine: string | null;
  priority: TaskPriority | null;
  description: string;
  avatarPreset: string | null;
}

export interface AddTaskFormState {
  taskName: string;
  taskGroupId: string | null;
  estimate: string | null;
  deadLine: string | null;
  priority: TaskPriority | null;
  assigneeId: string | null;
  description: string;
}

export interface AddProjectValidationErrors {
  projectName?: string;
  startsDate?: string;
  deadLine?: string;
  priority?: string;
}

export interface AddTaskValidationErrors {
  taskName?: string;
  taskGroupId?: string;
  estimate?: string;
  deadLine?: string;
  priority?: string;
  assigneeId?: string;
}

export interface PickerOption {
  label: string;
  value: string;
}
