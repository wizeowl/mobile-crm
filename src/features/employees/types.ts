export type EmployeesTab = 'list' | 'activity';

export type EmployeeProfileTab = 'projects' | 'team' | 'vacations';

export type EmployeeSeniority = 'Junior' | 'Middle' | 'Senior';

export type EmployeeGender = 'Male' | 'Female';

export interface EmployeeSummary {
  id: string;
  name: string;
  email: string;
  gender: EmployeeGender;
  birthDate: string;
  age: number;
  position: string;
  seniority: EmployeeSeniority;
  avatarColor: string;
  company: string;
  location: string;
  phone: string;
  skype: string;
  role: string;
  backlogTasks: number;
  inProgressTasks: number;
  inReviewTasks: number;
}

export interface EmployeeProjectSummary {
  id: string;
  code: string;
  name: string;
  createdDate: string;
  activeTasks: number;
  assigneeIds: string[];
  status: 'in-progress' | 'low' | 'done';
}

export interface EmployeeVacationSummary {
  id: string;
  requestType: string;
  periodLabel: string;
  durationLabel: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface EmployeesSnapshot {
  employees: EmployeeSummary[];
  projectsByEmployeeId: Record<string, EmployeeProjectSummary[]>;
  vacationsByEmployeeId: Record<string, EmployeeVacationSummary[]>;
}

export interface AddEmployeeFormState {
  emails: string[];
}

export interface AddEmployeeValidationErrors {
  emails: string[];
}
