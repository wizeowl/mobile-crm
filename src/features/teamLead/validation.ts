import { TaskStatus } from '../projects/types';

export function validateStatusSelection(status: TaskStatus | null): string | null {
  if (!status) {
    return 'Select task status.';
  }

  return null;
}
