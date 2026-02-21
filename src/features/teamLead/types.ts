import { TaskStatus } from '../projects/types';

export interface TeamLeadMember {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface TeamLeadTaskAttachment {
  id: string;
  name: string;
  size: string;
}

export interface TeamLeadTaskActivity {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
}

export interface TeamLeadTask {
  id: string;
  name: string;
  taskNumber: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  status: TaskStatus;
  loggedTime: string;
  originalEstimate: string;
  reporterId: string;
  assigneeId: string;
  attachments: TeamLeadTaskAttachment[];
  activities: TeamLeadTaskActivity[];
  createdAt: string;
}

export interface TeamLeadSnapshot {
  task: TeamLeadTask;
  members: TeamLeadMember[];
}

export interface TeamLeadStatusOption {
  value: TaskStatus;
  label: string;
}
