import { CalendarEvent, CalendarSnapshot } from '../types';
import { calendarSnapshot } from '../data/calendarDummyData';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCalendarSnapshot(): Promise<CalendarSnapshot> {
  await sleep(380);

  return {
    months: calendarSnapshot.months.map((month) => ({
      ...month,
      cells: [...month.cells],
      weekLabels: [...month.weekLabels],
    })),
    eventsByDate: Object.fromEntries(
      Object.entries(calendarSnapshot.eventsByDate).map(([dateKey, events]) => [
        dateKey,
        events.map((event) => ({ ...event })),
      ]),
    ),
  };
}

export async function saveCalendarEventDummy(
  dateKey: string,
  event: CalendarEvent,
): Promise<{ dateKey: string; event: CalendarEvent }> {
  await sleep(320);
  return { dateKey, event };
}
