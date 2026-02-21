import { AddEventFormState, EventOption, RepeatCadence } from '../types';

export const categoryOptions: EventOption[] = [
  { label: 'Corporate Event', value: 'corporate' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Meeting', value: 'meeting' },
  { label: 'Training', value: 'training' },
];

export const priorityOptions: EventOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const dateOptions: EventOption[] = [
  { label: 'Sep 15, 2020', value: 'Sep 15, 2020' },
  { label: 'Sep 16, 2020', value: 'Sep 16, 2020' },
  { label: 'Sep 17, 2020', value: 'Sep 17, 2020' },
  { label: 'Sep 18, 2020', value: 'Sep 18, 2020' },
];

export const timeOptions: EventOption[] = [
  { label: '9:00 AM', value: '9:00 AM' },
  { label: '11:00 AM', value: '11:00 AM' },
  { label: '2:00 PM', value: '2:00 PM' },
  { label: '5:30 PM', value: '5:30 PM' },
];

export const cadenceOptions: Array<{ label: string; value: RepeatCadence }> = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export const weekdayOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const initialAddEventForm: AddEventFormState = {
  eventName: "Katy's Birthday",
  category: 'corporate',
  priority: 'medium',
  date: null,
  time: null,
  description: '',
  repeatEnabled: false,
  repeatCadence: 'daily',
  repeatDays: ['Tue', 'Fri'],
  repeatEveryDay: false,
  repeatTime: null,
};

export function createEmptyAddEventForm(): AddEventFormState {
  return {
    ...initialAddEventForm,
    repeatDays: [...initialAddEventForm.repeatDays],
  };
}
