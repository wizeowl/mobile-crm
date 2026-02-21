import {
  Project,
  ProjectsFilterState,
  ProjectsSnapshot,
  SelectOption,
  Task,
  TaskGroup,
  TeamMember,
  TimeLogFormState,
} from '../types';

export const members: TeamMember[] = [
  { id: 'm1', name: 'Oscar Holloway', avatarColor: '#f6c06f' },
  { id: 'm2', name: 'Leonard Rodriguez', avatarColor: '#6fc3f6' },
  { id: 'm3', name: 'Owen Chambers', avatarColor: '#d58df5' },
  { id: 'm4', name: 'Gabriel Flowers', avatarColor: '#7bd7a7' },
  { id: 'm5', name: 'Violet Robbins', avatarColor: '#f09393' },
  { id: 'm6', name: 'Wayne Ingram', avatarColor: '#9ea9ff' },
  { id: 'm7', name: 'Evan Yates', avatarColor: '#f2b0a7' },
  { id: 'm8', name: 'Blake Silva', avatarColor: '#86c98e' },
  { id: 'm9', name: 'Emily Tyler', avatarColor: '#83a7e2' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Medical App (iOS native)',
    number: 'PN0001245',
    description:
      'App for maintaining your medical record, making appointments with a doctor, storing prescriptions and handling reminders.',
    reporterId: 'm7',
    assigneeIds: ['m8', 'm7', 'm1', 'm2'],
    priority: 'medium',
    deadline: 'Feb 23, 2020',
    createdAt: 'May 28, 2020',
  },
  {
    id: 'p2',
    name: 'Time tracker - personal account',
    number: 'PN0001388',
    description:
      'Personal account project used to plan and track your own tasks.',
    reporterId: 'm1',
    assigneeIds: ['m2', 'm6', 'm5'],
    priority: 'high',
    deadline: 'Apr 12, 2020',
    createdAt: 'Jan 19, 2020',
    startDate: 'Sep 15, 2020',
    avatarPreset: 'preset-2',
  },
];

export const taskGroups: TaskGroup[] = [
  { id: 'active', label: 'Active Tasks' },
  { id: 'development', label: 'Development' },
  { id: 'backlog', label: 'Backlog' },
];

export const tasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    reporterId: 'm1',
    groupId: 'active',
    name: 'Research',
    taskNumber: 'PN0001245',
    estimate: '2d 4h',
    spentTime: '1d 2h',
    assigneeId: 'm4',
    priority: 'medium',
    status: 'done',
    description: 'Collect customer research and summarize user pain points.',
    loggedTime: '1d 3h 25m',
    originalEstimate: '3d 8h',
    attachments: [
      { id: 'a1', name: 'discovery-notes.pdf', size: '1.1 MB' },
      { id: 'a2', name: 'personas.fig', size: '210 KB' },
    ],
    activities: [
      {
        id: 'ac1',
        userId: 'm1',
        title: 'Updated status to Done',
        subtitle: 'Map task to Done',
      },
      {
        id: 'ac2',
        userId: 'm9',
        title: 'Attached files to the task',
        subtitle: 'Added 2 attachments',
      },
    ],
  },
  {
    id: 't2',
    projectId: 'p1',
    reporterId: 'm1',
    groupId: 'active',
    name: 'Mind Map',
    taskNumber: 'PN0001246',
    estimate: '1d 2h',
    spentTime: '3h',
    assigneeId: 'm7',
    priority: 'medium',
    status: 'in-progress',
    description: 'Create a mind map linking core CRM modules and dependencies.',
    loggedTime: '7h 20m',
    originalEstimate: '1d 6h',
    attachments: [{ id: 'a3', name: 'mind-map.png', size: '420 KB' }],
    activities: [
      {
        id: 'ac3',
        userId: 'm2',
        title: 'Updated status to In Progress',
        subtitle: 'Map task to In Progress',
      },
    ],
  },
  {
    id: 't3',
    projectId: 'p1',
    reporterId: 'm7',
    groupId: 'active',
    name: 'UI/UX sketches',
    taskNumber: 'PN0001247',
    estimate: '4d',
    spentTime: '2d 2h 20m',
    assigneeId: 'm7',
    priority: 'low',
    status: 'in-progress',
    description: 'Sketch candidate mobile layouts and compare information hierarchy.',
    loggedTime: '2d 2h 20m',
    originalEstimate: '4d 8h',
    attachments: [{ id: 'a4', name: 'sketch-v2.fig', size: '2.4 MB' }],
    activities: [
      {
        id: 'ac4',
        userId: 'm7',
        title: 'Uploaded sketches',
        subtitle: 'Added sketch-v2.fig',
      },
    ],
  },
  {
    id: 't4',
    projectId: 'p1',
    reporterId: 'm7',
    groupId: 'active',
    name: 'UX Login + Registration',
    taskNumber: 'PN0001248',
    estimate: '2d',
    spentTime: '0h',
    assigneeId: 'm1',
    priority: 'low',
    status: 'to-do',
    description: 'Think over UX for Login and Registration, user flow and messaging.',
    loggedTime: '1d 3h 25m',
    originalEstimate: '3d 8h',
    attachments: [
      { id: 'a5', name: 'site-screens.png', size: '320 KB' },
      { id: 'a6', name: 'wireframes.png', size: '120 KB' },
    ],
    activities: [
      {
        id: 'ac5',
        userId: 'm1',
        title: 'Updated status to In Progress',
        subtitle: 'Map task to In Progress',
      },
      {
        id: 'ac6',
        userId: 'm9',
        title: 'Attached files to the task',
        subtitle: 'Added 2 attachments',
      },
      {
        id: 'ac7',
        userId: 'm9',
        title: 'Updated the status of Mind Map task to In Progress',
        subtitle: 'Dependency note',
      },
    ],
  },
  {
    id: 't5',
    projectId: 'p1',
    reporterId: 'm1',
    groupId: 'active',
    name: 'UI for other screens',
    taskNumber: 'PN0001249',
    estimate: '6d',
    spentTime: '5d 1h 15m',
    assigneeId: 'm8',
    priority: 'medium',
    status: 'in-review',
    description: 'Create reusable visual language for secondary app screens.',
    loggedTime: '5d 1h 15m',
    originalEstimate: '6d 6h',
    attachments: [{ id: 'a7', name: 'ui-kit.sketch', size: '3.2 MB' }],
    activities: [
      {
        id: 'ac8',
        userId: 'm8',
        title: 'Status changed to In Review',
        subtitle: 'Waiting for PM approval',
      },
    ],
  },
  {
    id: 't6',
    projectId: 'p1',
    reporterId: 'm2',
    groupId: 'development',
    name: 'Set up analytics events',
    taskNumber: 'PN0001250',
    estimate: '2d 6h',
    spentTime: '9h',
    assigneeId: 'm2',
    priority: 'high',
    status: 'in-progress',
    description: 'Instrument key onboarding and task lifecycle analytics events.',
    loggedTime: '9h',
    originalEstimate: '2d 6h',
    attachments: [{ id: 'a8', name: 'events-spec.md', size: '86 KB' }],
    activities: [
      {
        id: 'ac9',
        userId: 'm2',
        title: 'Started implementation',
        subtitle: 'Tracking schema finalized',
      },
    ],
  },
  {
    id: 't7',
    projectId: 'p1',
    reporterId: 'm7',
    groupId: 'backlog',
    name: 'Animation for buttons',
    taskNumber: 'PN0001251',
    estimate: '8h',
    spentTime: '0h',
    assigneeId: 'm7',
    priority: 'medium',
    status: 'to-do',
    description: 'Prototype micro-interactions for critical CTA buttons.',
    loggedTime: '0h',
    originalEstimate: '8h',
    attachments: [],
    activities: [
      {
        id: 'ac10',
        userId: 'm7',
        title: 'Moved to backlog',
        subtitle: 'Planned for sprint +1',
      },
    ],
  },
  {
    id: 't8',
    projectId: 'p1',
    reporterId: 'm8',
    groupId: 'backlog',
    name: 'Preloader',
    taskNumber: 'PN0001252',
    estimate: '2h',
    spentTime: '0h',
    assigneeId: 'm8',
    priority: 'low',
    status: 'to-do',
    description: 'Create loading placeholder sequence for cold app start.',
    loggedTime: '0h',
    originalEstimate: '2h',
    attachments: [],
    activities: [
      {
        id: 'ac11',
        userId: 'm8',
        title: 'Task created',
        subtitle: 'Waiting for prioritization',
      },
    ],
  },
];

export const periodOptions: SelectOption[] = [
  { label: 'Select Period', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
];

export const estimateOptions: SelectOption[] = [
  { label: 'Select duration', value: '' },
  { label: 'Up to 8h', value: '8h' },
  { label: '1 - 2 days', value: '1-2d' },
  { label: '3+ days', value: '3d+' },
];

export const priorityOptions: SelectOption[] = [
  { label: 'All priorities', value: 'all' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const defaultFilterState: ProjectsFilterState = {
  period: 'all',
  taskGroupIds: [],
  reporterIds: [],
  assigneeIds: [],
  estimate: '',
  priority: 'all',
};

export const initialTimeLogState: TimeLogFormState = {
  timeSpent: '1w 4d 6h 40m',
  date: 'Dec 20, 2020',
  time: '2:00 PM',
  workDescription: '',
};

export const projectsSnapshot: ProjectsSnapshot = {
  projects,
  tasks,
  members,
  taskGroups,
};
