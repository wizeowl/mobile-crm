import { CalendarEvent, CalendarSnapshot } from '../types';

export const defaultSelectedDateKey = '2020-09-18';

const sepWorkweekCells = [
  { id: 'd-aug-30', dayNumber: 30, dateKey: '2020-08-30', inCurrentMonth: false },
  { id: 'd-sep-01', dayNumber: 1, dateKey: '2020-09-01', inCurrentMonth: true },
  { id: 'd-sep-02', dayNumber: 2, dateKey: '2020-09-02', inCurrentMonth: true },
  { id: 'd-sep-03', dayNumber: 3, dateKey: '2020-09-03', inCurrentMonth: true },
  { id: 'd-sep-04', dayNumber: 4, dateKey: '2020-09-04', inCurrentMonth: true },
  { id: 'd-sep-07', dayNumber: 7, dateKey: '2020-09-07', inCurrentMonth: true },
  { id: 'd-sep-08', dayNumber: 8, dateKey: '2020-09-08', inCurrentMonth: true },
  { id: 'd-sep-09', dayNumber: 9, dateKey: '2020-09-09', inCurrentMonth: true },
  { id: 'd-sep-10', dayNumber: 10, dateKey: '2020-09-10', inCurrentMonth: true },
  { id: 'd-sep-11', dayNumber: 11, dateKey: '2020-09-11', inCurrentMonth: true },
  { id: 'd-sep-14', dayNumber: 14, dateKey: '2020-09-14', inCurrentMonth: true },
  { id: 'd-sep-15', dayNumber: 15, dateKey: '2020-09-15', inCurrentMonth: true },
  { id: 'd-sep-16', dayNumber: 16, dateKey: '2020-09-16', inCurrentMonth: true },
  { id: 'd-sep-17', dayNumber: 17, dateKey: '2020-09-17', inCurrentMonth: true },
  { id: 'd-sep-18', dayNumber: 18, dateKey: '2020-09-18', inCurrentMonth: true },
  { id: 'd-sep-21', dayNumber: 21, dateKey: '2020-09-21', inCurrentMonth: true },
  { id: 'd-sep-22', dayNumber: 22, dateKey: '2020-09-22', inCurrentMonth: true },
  { id: 'd-sep-23', dayNumber: 23, dateKey: '2020-09-23', inCurrentMonth: true },
  { id: 'd-sep-24', dayNumber: 24, dateKey: '2020-09-24', inCurrentMonth: true },
  { id: 'd-sep-25', dayNumber: 25, dateKey: '2020-09-25', inCurrentMonth: true },
  { id: 'd-sep-28', dayNumber: 28, dateKey: '2020-09-28', inCurrentMonth: true },
  { id: 'd-sep-29', dayNumber: 29, dateKey: '2020-09-29', inCurrentMonth: true },
  { id: 'd-sep-30', dayNumber: 30, dateKey: '2020-09-30', inCurrentMonth: true },
  { id: 'd-oct-01', dayNumber: 1, dateKey: '2020-10-01', inCurrentMonth: false },
  { id: 'd-oct-02', dayNumber: 2, dateKey: '2020-10-02', inCurrentMonth: false },
];

const octWorkweekCells = [
  { id: 'd-sep-28x', dayNumber: 28, dateKey: '2020-09-28', inCurrentMonth: false },
  { id: 'd-sep-29x', dayNumber: 29, dateKey: '2020-09-29', inCurrentMonth: false },
  { id: 'd-sep-30x', dayNumber: 30, dateKey: '2020-09-30', inCurrentMonth: false },
  { id: 'd-oct-01x', dayNumber: 1, dateKey: '2020-10-01', inCurrentMonth: true },
  { id: 'd-oct-02x', dayNumber: 2, dateKey: '2020-10-02', inCurrentMonth: true },
  { id: 'd-oct-05x', dayNumber: 5, dateKey: '2020-10-05', inCurrentMonth: true },
  { id: 'd-oct-06x', dayNumber: 6, dateKey: '2020-10-06', inCurrentMonth: true },
  { id: 'd-oct-07x', dayNumber: 7, dateKey: '2020-10-07', inCurrentMonth: true },
  { id: 'd-oct-08x', dayNumber: 8, dateKey: '2020-10-08', inCurrentMonth: true },
  { id: 'd-oct-09x', dayNumber: 9, dateKey: '2020-10-09', inCurrentMonth: true },
  { id: 'd-oct-12x', dayNumber: 12, dateKey: '2020-10-12', inCurrentMonth: true },
  { id: 'd-oct-13x', dayNumber: 13, dateKey: '2020-10-13', inCurrentMonth: true },
  { id: 'd-oct-14x', dayNumber: 14, dateKey: '2020-10-14', inCurrentMonth: true },
  { id: 'd-oct-15x', dayNumber: 15, dateKey: '2020-10-15', inCurrentMonth: true },
  { id: 'd-oct-16x', dayNumber: 16, dateKey: '2020-10-16', inCurrentMonth: true },
  { id: 'd-oct-19x', dayNumber: 19, dateKey: '2020-10-19', inCurrentMonth: true },
  { id: 'd-oct-20x', dayNumber: 20, dateKey: '2020-10-20', inCurrentMonth: true },
  { id: 'd-oct-21x', dayNumber: 21, dateKey: '2020-10-21', inCurrentMonth: true },
  { id: 'd-oct-22x', dayNumber: 22, dateKey: '2020-10-22', inCurrentMonth: true },
  { id: 'd-oct-23x', dayNumber: 23, dateKey: '2020-10-23', inCurrentMonth: true },
  { id: 'd-oct-26x', dayNumber: 26, dateKey: '2020-10-26', inCurrentMonth: true },
  { id: 'd-oct-27x', dayNumber: 27, dateKey: '2020-10-27', inCurrentMonth: true },
  { id: 'd-oct-28x', dayNumber: 28, dateKey: '2020-10-28', inCurrentMonth: true },
  { id: 'd-oct-29x', dayNumber: 29, dateKey: '2020-10-29', inCurrentMonth: true },
  { id: 'd-oct-30x', dayNumber: 30, dateKey: '2020-10-30', inCurrentMonth: true },
];

const dayEvents: Record<string, CalendarEvent[]> = {
  '2020-09-08': [
    { id: 'ce-1', title: 'Design review', durationLabel: '1h', trend: 'up', tone: 'blue' },
  ],
  '2020-09-10': [
    { id: 'ce-2', title: 'Sprint planning', durationLabel: '2h', trend: 'up', tone: 'purple' },
  ],
  '2020-09-16': [
    { id: 'ce-3', title: 'Brand sync', durationLabel: '30m', trend: 'down', tone: 'purple' },
  ],
  '2020-09-18': [
    { id: 'ce-4', title: "Marc's Birthday", durationLabel: '3h', trend: 'down', tone: 'pink' },
    {
      id: 'ce-5',
      title: 'Presentation of the new department',
      durationLabel: '2h',
      trend: 'up',
      tone: 'blue',
    },
    { id: 'ce-6', title: 'Movie night (Tenet)', durationLabel: '2h', trend: 'down', tone: 'purple' },
    { id: 'ce-7', title: 'Meeting with CTO', durationLabel: '2h', trend: 'up', tone: 'blue' },
  ],
  '2020-10-14': [
    { id: 'ce-8', title: 'Onboarding intro', durationLabel: '1h', trend: 'up', tone: 'teal' },
  ],
  '2020-10-22': [
    { id: 'ce-9', title: 'Product review', durationLabel: '2h', trend: 'up', tone: 'blue' },
    { id: 'ce-10', title: 'Team retrospective', durationLabel: '1h', trend: 'down', tone: 'purple' },
  ],
};

export const calendarSnapshot: CalendarSnapshot = {
  months: [
    {
      id: 'month-2020-09',
      label: 'September, 2020',
      weekLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      cells: sepWorkweekCells,
    },
    {
      id: 'month-2020-10',
      label: 'October, 2020',
      weekLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      cells: octWorkweekCells,
    },
  ],
  eventsByDate: dayEvents,
};
