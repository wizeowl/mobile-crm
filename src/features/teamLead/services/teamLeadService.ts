import { TaskStatus } from '../../projects/types';
import { teamLeadSnapshot } from '../data/teamLeadDummyData';
import { TeamLeadSnapshot } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTeamLeadSnapshot(): Promise<TeamLeadSnapshot> {
  await sleep(380);

  return {
    task: {
      ...teamLeadSnapshot.task,
      attachments: [...teamLeadSnapshot.task.attachments],
      activities: [...teamLeadSnapshot.task.activities],
    },
    members: [...teamLeadSnapshot.members],
  };
}

export async function updateTaskStatusForReviewDummy(
  taskId: string,
  status: TaskStatus,
): Promise<{ taskId: string; status: TaskStatus }> {
  await sleep(280);
  return { taskId, status };
}

export async function approveTaskClaimDummy(taskId: string): Promise<{ taskId: string; approved: boolean }> {
  await sleep(260);
  return { taskId, approved: true };
}
