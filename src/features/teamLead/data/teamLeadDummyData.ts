import { TeamLeadSnapshot, TeamLeadStatusOption } from '../types';

export const teamLeadStatusOptions: TeamLeadStatusOption[] = [
  { value: 'to-do', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'in-review', label: 'In Review' },
  { value: 'done', label: 'Done' },
];

export const teamLeadSnapshot: TeamLeadSnapshot = {
  members: [
    {
      id: 'tl-m1',
      name: 'Evan Yates',
      role: 'UI/UX Designer',
      avatarColor: '#f0d9a4',
    },
    {
      id: 'tl-m2',
      name: 'Blake Silva',
      role: 'iOS Developer',
      avatarColor: '#8cb8e9',
    },
    {
      id: 'tl-m3',
      name: 'Oscar Holloway',
      role: 'UI/UX Designer',
      avatarColor: '#d9a175',
    },
    {
      id: 'tl-m4',
      name: 'Emily Tyler',
      role: 'Copywriter',
      avatarColor: '#f2a8c6',
    },
  ],
  task: {
    id: 'tl-task-1',
    name: 'UX Login + Registration',
    taskNumber: 'PN0001245',
    description:
      'Think over UX for Login and Registration, create a flow using wireframes. Upon completion, show the team and discuss. Attach the source files to the task.',
    priority: 'medium',
    deadline: 'Feb 23, 2020',
    status: 'in-review',
    loggedTime: '1d 3h 25m',
    originalEstimate: '3d 8h',
    reporterId: 'tl-m1',
    assigneeId: 'tl-m2',
    attachments: [
      { id: 'tl-a1', name: 'site screens.png', size: '10 MB PNG' },
      { id: 'tl-a2', name: 'wireframes.png', size: '10 MB PNG' },
    ],
    activities: [
      {
        id: 'tl-ac1',
        userId: 'tl-m3',
        title: 'Updated the status of Mind Map task to In Progress',
        subtitle: 'UI/UX Designer',
      },
      {
        id: 'tl-ac2',
        userId: 'tl-m4',
        title: 'Attached files to the task',
        subtitle: 'Copywriter',
      },
      {
        id: 'tl-ac3',
        userId: 'tl-m4',
        title: 'Updated the status of Mind Map task to In Progress',
        subtitle: 'Copywriter',
      },
    ],
    createdAt: 'Created May 28, 2020',
  },
};
