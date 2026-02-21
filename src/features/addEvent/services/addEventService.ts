import { AddEventFormState, SavedEvent } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function saveEventDummy(payload: AddEventFormState): Promise<SavedEvent> {
  await sleep(650);

  return {
    id: `evt-${Date.now()}`,
    payload,
  };
}
