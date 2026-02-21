export type RepeatCadence = 'daily' | 'weekly' | 'monthly';

export interface AddEventFormState {
  eventName: string;
  category: string | null;
  priority: string | null;
  date: string | null;
  time: string | null;
  description: string;
  repeatEnabled: boolean;
  repeatCadence: RepeatCadence;
  repeatDays: string[];
  repeatEveryDay: boolean;
  repeatTime: string | null;
}

export interface AddEventValidationErrors {
  eventName?: string;
  category?: string;
  priority?: string;
  date?: string;
  time?: string;
  repeatDays?: string;
  repeatTime?: string;
}

export interface EventOption {
  label: string;
  value: string;
}

export interface SavedEvent {
  id: string;
  payload: AddEventFormState;
}
