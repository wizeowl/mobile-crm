import {
  Project,
  Task,
  TaskActivity,
  TaskAttachment,
  TaskGroup,
  TaskPriority,
} from '../../projects/types';
import { AddProjectFormState, AddTaskFormState } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function saveProjectDummy(
  payload: AddProjectFormState,
  reporterId: string,
): Promise<Project> {
  await sleep(700);

  const idSuffix = Date.now().toString().slice(-6);
  const projectNumber = `PN${idSuffix}`;

  return {
    id: `p-${idSuffix}`,
    name: payload.projectName.trim(),
    number: projectNumber,
    description: payload.description.trim() || 'No description added yet.',
    reporterId,
    assigneeIds: [reporterId],
    priority: payload.priority ?? 'medium',
    deadline: payload.deadLine ?? 'Sep 21, 2020',
    createdAt: payload.startsDate ?? 'Sep 15, 2020',
    startDate: payload.startsDate ?? undefined,
    avatarPreset: payload.avatarPreset ?? undefined,
  };
}

export async function saveTaskDummy(
  payload: AddTaskFormState,
  projectId: string,
  reporterId: string,
  taskGroups: TaskGroup[],
): Promise<Task> {
  await sleep(650);

  const idSuffix = Date.now().toString().slice(-6);

  const group = taskGroups.find((item) => item.id === payload.taskGroupId) ?? taskGroups[0];
  const estimate = payload.estimate ?? '2h';
  const assigneeId = payload.assigneeId ?? reporterId;
  const priority: TaskPriority = payload.priority ?? 'medium';

  const defaultActivities: TaskActivity[] = [
    {
      id: `activity-${idSuffix}-1`,
      userId: reporterId,
      title: 'Task created',
      subtitle: `Added in ${group?.label ?? 'Backlog'}`,
    },
  ];

  const defaultAttachments: TaskAttachment[] = [];

  return {
    id: `t-${idSuffix}`,
    projectId,
    reporterId,
    groupId: group?.id ?? 'backlog',
    name: payload.taskName.trim(),
    taskNumber: `TSK${idSuffix}`,
    estimate,
    spentTime: '0h',
    assigneeId,
    priority,
    status: 'to-do',
    description: payload.description.trim() || 'No description added yet.',
    loggedTime: '0h',
    originalEstimate: estimate,
    attachments: defaultAttachments,
    activities: defaultActivities,
  };
}
