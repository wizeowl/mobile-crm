export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'to-do' | 'in-progress' | 'in-review' | 'done';

export interface TeamMember {
  id: string;
  name: string;
  avatarColor: string;
}

export interface Project {
  id: string;
  name: string;
  number: string;
  description: string;
  startDate?: string;
  reporterId: string;
  assigneeIds: string[];
  priority: TaskPriority;
  deadline: string;
  createdAt: string;
  avatarPreset?: string;
}

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
}

export interface TaskActivity {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
}

export interface Task {
  id: string;
  projectId: string;
  reporterId: string;
  groupId: string;
  name: string;
  taskNumber: string;
  estimate: string;
  spentTime: string;
  assigneeId: string;
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
  loggedTime: string;
  originalEstimate: string;
  attachments: TaskAttachment[];
  activities: TaskActivity[];
}

export interface TaskGroup {
  id: string;
  label: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface ProjectsFilterState {
  period: string | null;
  taskGroupIds: string[];
  reporterIds: string[];
  assigneeIds: string[];
  estimate: string;
  priority: TaskPriority | 'all';
}

export interface TimeLogFormState {
  timeSpent: string;
  date: string;
  time: string;
  workDescription: string;
}

export interface TimeLogValidationErrors {
  timeSpent?: string;
  date?: string;
  time?: string;
  workDescription?: string;
}

export interface ProjectsSnapshot {
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  taskGroups: TaskGroup[];
}
