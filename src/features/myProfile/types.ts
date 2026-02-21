export type ProfileTab = 'projects' | 'team' | 'vacations';

export type VacationRequestType = 'vacation' | 'sick-leave' | 'work-remotely';

export type VacationMode = 'days' | 'hours';

export type VacationStatus = 'pending' | 'approved' | 'rejected';

export interface ProfileUser {
  id: string;
  name: string;
  role: string;
  position: string;
  company: string;
  location: string;
  birthDate: string;
  email: string;
  phone: string;
  skype: string;
}

export interface ProfileProjectSummary {
  id: string;
  code: string;
  name: string;
  activeTasks: number;
  assigneeIds: string[];
  status: 'in-progress' | 'low' | 'done';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  seniority: string;
  stateTag: string;
  avatarColor: string;
}

export interface VacationRequest {
  id: string;
  type: VacationRequestType;
  periodLabel: string;
  durationLabel: string;
  status: VacationStatus;
}

export interface ProfileNotification {
  id: string;
  actorName: string;
  actorColor: string;
  message: string;
  timeLabel: string;
}

export interface SettingsNotificationsState {
  issueActivity: boolean;
  trackingActivity: boolean;
  newComments: boolean;
  quietAfterNine: boolean;
}

export interface SettingsState {
  expandedSection: string | null;
  notifications: SettingsNotificationsState;
}

export interface AddRequestFormState {
  type: VacationRequestType;
  mode: VacationMode;
  selectedDays: number[];
  fromTime: string;
  toTime: string;
  comment: string;
}

export interface AddRequestValidationErrors {
  selectedDays?: string;
  fromTime?: string;
  toTime?: string;
}

export interface MyProfileSnapshot {
  user: ProfileUser;
  projects: ProfileProjectSummary[];
  team: TeamMember[];
  vacationRequests: VacationRequest[];
  notifications: ProfileNotification[];
  settings: SettingsState;
  vacationDaysLeft: number;
}
