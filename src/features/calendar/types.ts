export type CalendarDotTone = 'blue' | 'purple' | 'teal';

export type CalendarEventTone = 'pink' | 'blue' | 'purple' | 'teal';

export interface CalendarDayCell {
  id: string;
  dayNumber: number;
  dateKey: string;
  inCurrentMonth: boolean;
}

export interface CalendarMonthGrid {
  id: string;
  label: string;
  weekLabels: string[];
  cells: CalendarDayCell[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  durationLabel: string;
  trend: 'up' | 'down';
  tone: CalendarEventTone;
}

export interface CalendarSnapshot {
  months: CalendarMonthGrid[];
  eventsByDate: Record<string, CalendarEvent[]>;
}
