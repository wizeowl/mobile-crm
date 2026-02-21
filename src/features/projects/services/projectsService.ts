import { defaultFilterState, projectsSnapshot } from '../data/projectsDummyData';
import { ProjectsFilterState, ProjectsSnapshot, TaskStatus, TimeLogFormState } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProjectsSnapshot(): Promise<ProjectsSnapshot> {
  await sleep(500);

  return {
    projects: [...projectsSnapshot.projects],
    tasks: [...projectsSnapshot.tasks],
    members: [...projectsSnapshot.members],
    taskGroups: [...projectsSnapshot.taskGroups],
  };
}

export async function saveProjectsFilters(
  _filters: ProjectsFilterState,
): Promise<ProjectsFilterState> {
  await sleep(350);
  return _filters;
}

export async function updateTaskStatusDummy(
  _taskId: string,
  _status: TaskStatus,
): Promise<void> {
  await sleep(300);
}

export async function saveTimeLogDummy(
  _taskId: string,
  _payload: TimeLogFormState,
): Promise<void> {
  await sleep(650);
}

export function cloneDefaultFilterState(): ProjectsFilterState {
  return {
    ...defaultFilterState,
    taskGroupIds: [...defaultFilterState.taskGroupIds],
    reporterIds: [...defaultFilterState.reporterIds],
    assigneeIds: [...defaultFilterState.assigneeIds],
  };
}
