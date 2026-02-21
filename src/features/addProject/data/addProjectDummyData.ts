import { TaskPriority } from '../../projects/types';
import { AddProjectFormState, AddTaskFormState, PickerOption } from '../types';

export const projectDateOptions: PickerOption[] = [
  { label: 'Sep 15, 2020', value: 'Sep 15, 2020' },
  { label: 'Sep 16, 2020', value: 'Sep 16, 2020' },
  { label: 'Sep 17, 2020', value: 'Sep 17, 2020' },
  { label: 'Sep 18, 2020', value: 'Sep 18, 2020' },
  { label: 'Sep 21, 2020', value: 'Sep 21, 2020' },
];

export const projectPriorityOptions: PickerOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const taskEstimateOptions: PickerOption[] = [
  { label: '2h', value: '2h' },
  { label: '4h', value: '4h' },
  { label: '1d', value: '1d' },
  { label: '2d', value: '2d' },
  { label: '3d', value: '3d' },
];

export const avatarPresetIds = [
  'preset-1',
  'preset-2',
  'preset-3',
  'preset-4',
  'preset-5',
  'preset-6',
  'preset-7',
  'preset-8',
  'preset-9',
  'preset-10',
  'preset-11',
  'preset-12',
];

export const initialAddProjectForm: AddProjectFormState = {
  projectName: '',
  startsDate: null,
  deadLine: null,
  priority: 'medium',
  description: '',
  avatarPreset: null,
};

export const initialAddTaskForm: AddTaskFormState = {
  taskName: '',
  taskGroupId: null,
  estimate: null,
  deadLine: null,
  priority: 'medium',
  assigneeId: null,
  description: '',
};

export const priorityLabelMap: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
