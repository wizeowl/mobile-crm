import {
  AddRequestFormState,
  MyProfileSnapshot,
  ProfileTab,
  VacationRequest,
} from '../types';

export const profileTabs: Array<{ label: string; value: ProfileTab }> = [
  { label: 'Projects', value: 'projects' },
  { label: 'Team', value: 'team' },
  { label: 'Vacations', value: 'vacations' },
];

export const requestTypeOptions = [
  { label: 'Vacation', value: 'vacation' as const },
  { label: 'Sick Leave', value: 'sick-leave' as const },
  { label: 'Work remotely', value: 'work-remotely' as const },
];

export const monthDays = [
  30,
  1,
  2,
  3,
  4,
  7,
  8,
  9,
  10,
  11,
  14,
  15,
  16,
  17,
  18,
  21,
  22,
  23,
  24,
  25,
  28,
  29,
  30,
  1,
  2,
];

export const dayWeekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const timeOptions = ['9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM', '6:00 PM'];

export const initialAddRequestForm: AddRequestFormState = {
  type: 'vacation',
  mode: 'days',
  selectedDays: [15],
  fromTime: '9:00 AM',
  toTime: '1:00 PM',
  comment: '',
};

export const emptyAddRequestForm: AddRequestFormState = {
  type: 'vacation',
  mode: 'days',
  selectedDays: [15],
  fromTime: '9:00 AM',
  toTime: '1:00 PM',
  comment: '',
};

export const myProfileSnapshot: MyProfileSnapshot = {
  user: {
    id: 'u1',
    name: 'Evan Yates',
    role: 'UI/UX Designer',
    position: 'UI/UX Designer',
    company: 'Cadabra',
    location: 'NYC, New York, USA',
    birthDate: 'May 19, 1996',
    email: 'evanyates@gmail.com',
    phone: '+1 675 346 23-10',
    skype: 'Evaz 2256',
  },
  projects: [
    {
      id: 'pp1',
      code: 'PN0001265',
      name: 'Medical App (iOS native)',
      activeTasks: 20,
      assigneeIds: ['tm1', 'tm2', 'tm3', 'tm4'],
      status: 'in-progress',
    },
    {
      id: 'pp2',
      code: 'PN0001265',
      name: 'Food Delivery Service',
      activeTasks: 20,
      assigneeIds: ['tm5', 'tm2', 'tm3'],
      status: 'done',
    },
    {
      id: 'pp3',
      code: 'PN0001265',
      name: 'Banking App',
      activeTasks: 12,
      assigneeIds: ['tm4', 'tm1', 'tm6'],
      status: 'low',
    },
  ],
  team: [
    {
      id: 'tm1',
      name: 'Shawn Stone',
      role: 'UI/UX Designer',
      seniority: 'Middle',
      stateTag: 'Added',
      avatarColor: '#86b7f5',
    },
    {
      id: 'tm2',
      name: 'Randy Delgado',
      role: 'UI/UX Designer',
      seniority: 'Middle',
      stateTag: 'Added',
      avatarColor: '#f5b186',
    },
    {
      id: 'tm3',
      name: 'Emily Tyler',
      role: 'Copywriter',
      seniority: 'Junior',
      stateTag: 'Added',
      avatarColor: '#f5a4c3',
    },
    {
      id: 'tm4',
      name: 'Blake Silva',
      role: 'iOS Developer',
      seniority: 'Senior',
      stateTag: 'Added',
      avatarColor: '#91d4ff',
    },
    {
      id: 'tm5',
      name: 'Oscar Holloway',
      role: 'UI/UX Designer',
      seniority: 'Middle',
      stateTag: 'Added',
      avatarColor: '#f2d28a',
    },
    {
      id: 'tm6',
      name: 'Wayne Marsh',
      role: 'Copywriter',
      seniority: 'Junior',
      stateTag: 'Added',
      avatarColor: '#9ab3f5',
    },
  ],
  vacationRequests: [
    {
      id: 'vr1',
      type: 'sick-leave',
      periodLabel: 'Sep 13, 2020 - Sep 16, 2020',
      durationLabel: '3d',
      status: 'pending',
    },
    {
      id: 'vr2',
      type: 'work-remotely',
      periodLabel: 'Sep 1, 2020 - Sep 2, 2020',
      durationLabel: '1d',
      status: 'approved',
    },
    {
      id: 'vr3',
      type: 'vacation',
      periodLabel: 'Sep 1, 2020 - Sep 2, 2020',
      durationLabel: '1d',
      status: 'approved',
    },
  ],
  notifications: [
    {
      id: 'n1',
      actorName: 'Emily Tyler',
      actorColor: '#f5a4c3',
      message: 'sent you a comment in Research task',
      timeLabel: '2h ago',
    },
    {
      id: 'n2',
      actorName: 'Oscar Holloway',
      actorColor: '#f2d28a',
      message: 'Updated the status of Mind Map task to In Progress',
      timeLabel: '6h ago',
    },
    {
      id: 'n3',
      actorName: 'Blake Silva',
      actorColor: '#91d4ff',
      message: 'assigned the issue in you',
      timeLabel: 'Today 9:30 am',
    },
    {
      id: 'n4',
      actorName: 'Emily Tyler',
      actorColor: '#f5a4c3',
      message: 'sent you a comment in Research task',
      timeLabel: 'Tomorrow 2:30 pm',
    },
  ],
  settings: {
    expandedSection: null,
    notifications: {
      issueActivity: true,
      trackingActivity: false,
      newComments: false,
      quietAfterNine: false,
    },
  },
  vacationDaysLeft: 3,
};

export function buildVacationRequestFromForm(
  form: AddRequestFormState,
  nextId: string,
): VacationRequest {
  const sorted = [...form.selectedDays].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const periodLabel =
    form.mode === 'days'
      ? `Sep ${first}, 2020 - Sep ${last ?? first}, 2020`
      : `Sep ${first}, 2020`;

  const durationLabel =
    form.mode === 'days'
      ? `${Math.max(sorted.length, 1)}d`
      : `${formatHourRange(form.fromTime, form.toTime)}`;

  return {
    id: nextId,
    type: form.type,
    periodLabel,
    durationLabel,
    status: 'pending',
  };
}

function formatHourRange(from: string, to: string): string {
  const fromMinutes = toMinutes(from);
  const toMinutesValue = toMinutes(to);

  if (fromMinutes === null || toMinutesValue === null || toMinutesValue <= fromMinutes) {
    return '0h';
  }

  const duration = toMinutesValue - fromMinutes;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

function toMinutes(value: string): number | null {
  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3];

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  if (hours === 12) {
    hours = 0;
  }

  if (period === 'PM') {
    hours += 12;
  }

  return hours * 60 + minutes;
}
