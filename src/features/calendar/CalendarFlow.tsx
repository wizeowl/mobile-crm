import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import { AddEventFlow } from '../addEvent/AddEventFlow';
import { SavedEvent } from '../addEvent/types';
import { defaultSelectedDateKey } from './data/calendarDummyData';
import { CalendarHomeScreen } from './screens/CalendarScreens';
import { fetchCalendarSnapshot, saveCalendarEventDummy } from './services/calendarService';
import { CalendarEvent, CalendarEventTone, CalendarMonthGrid, CalendarSnapshot } from './types';

interface CalendarFlowProps {
  onOpenProfile: () => void;
  onOpenMessenger: () => void;
}

export function CalendarFlow({ onOpenProfile, onOpenMessenger }: CalendarFlowProps) {
  const [snapshot, setSnapshot] = useState<CalendarSnapshot | null>(null);
  const [eventsByDate, setEventsByDate] = useState<Record<string, CalendarEvent[]>>({});
  const [loading, setLoading] = useState(true);

  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedDateKey, setSelectedDateKey] = useState(defaultSelectedDateKey);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchCalendarSnapshot();
        setSnapshot(response);
        setEventsByDate(response.eventsByDate);
        setSelectedDateKey(defaultSelectedDateKey);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const months = snapshot?.months ?? [];
  const activeMonth = months[monthIndex] ?? null;

  useEffect(() => {
    if (!activeMonth) {
      return;
    }

    const validDateKeys = activeMonth.cells.map((cell) => cell.dateKey);
    if (validDateKeys.includes(selectedDateKey)) {
      return;
    }

    setSelectedDateKey(pickDefaultDateForMonth(activeMonth, eventsByDate));
    setShowAllEvents(false);
  }, [activeMonth, eventsByDate, selectedDateKey]);

  const selectedEvents = eventsByDate[selectedDateKey] ?? [];

  const visibleEvents = useMemo(() => {
    if (showAllEvents || selectedEvents.length <= 3) {
      return selectedEvents;
    }

    return selectedEvents.slice(0, 3);
  }, [selectedEvents, showAllEvents]);

  const selectedDateTitle = toReadableDate(selectedDateKey);

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading calendar...</Text>;
  }

  if (!activeMonth || !snapshot) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Calendar is unavailable.</Text>;
  }

  const handleSavedEvent = (saved: SavedEvent) => {
    const derivedDateKey = parseDateLabelToKey(saved.payload.date) ?? selectedDateKey;
    const event: CalendarEvent = {
      id: saved.id,
      title: saved.payload.eventName.trim() || 'New event',
      durationLabel: saved.payload.time ? '2h' : '1h',
      trend: saved.payload.priority === 'low' ? 'down' : 'up',
      tone: toEventTone(saved.payload.category),
    };

    void (async () => {
      await saveCalendarEventDummy(derivedDateKey, event);
      setEventsByDate((prev) => ({
        ...prev,
        [derivedDateKey]: [...(prev[derivedDateKey] ?? []), event],
      }));
      setSelectedDateKey(derivedDateKey);
      setShowAllEvents(true);
      Alert.alert('Event added', 'Calendar event added in dummy mode.');
    })();
  };

  return (
    <>
      <CalendarHomeScreen
        monthLabel={activeMonth.label}
        weekLabels={activeMonth.weekLabels}
        cells={activeMonth.cells}
        selectedDateKey={selectedDateKey}
        selectedDateTitle={selectedDateTitle}
        events={visibleEvents}
        onPreviousMonth={() => {
          setMonthIndex((prev) => (prev > 0 ? prev - 1 : months.length - 1));
          setShowAllEvents(false);
        }}
        onNextMonth={() => {
          setMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : 0));
          setShowAllEvents(false);
        }}
        onSelectDate={(dateKey) => {
          if (dateKey === selectedDateKey && (eventsByDate[dateKey]?.length ?? 0) > 3) {
            setShowAllEvents((prev) => !prev);
            return;
          }

          setSelectedDateKey(dateKey);
          setShowAllEvents(false);
        }}
        getDotTonesForDate={(dateKey) => {
          const events = eventsByDate[dateKey] ?? [];
          return events.map((event) => dotToneFromEvent(event.tone)).slice(0, 4);
        }}
        onOpenCreateEvent={() => setAddEventOpen(true)}
        onOpenMessenger={onOpenMessenger}
        onOpenProfile={onOpenProfile}
        onOpenNotifications={() => {
          Alert.alert('Notifications', 'Notifications are available in profile settings.');
        }}
      />

      <AddEventFlow
        visible={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        onSaved={(saved) => {
          setAddEventOpen(false);
          handleSavedEvent(saved);
        }}
      />
    </>
  );
}

function pickDefaultDateForMonth(
  month: CalendarMonthGrid,
  eventsByDate: Record<string, CalendarEvent[]>,
): string {
  const currentMonthCells = month.cells.filter((cell) => cell.inCurrentMonth);
  const withEvents = currentMonthCells.find((cell) => (eventsByDate[cell.dateKey]?.length ?? 0) > 0);
  return withEvents?.dateKey ?? currentMonthCells[0]?.dateKey ?? month.cells[0]?.dateKey ?? defaultSelectedDateKey;
}

function toReadableDate(dateKey: string): string {
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (!year || !month || !day || month < 1 || month > 12) {
    return 'Selected day';
  }

  return `${monthNames[month - 1]} ${day}, ${year}`;
}

function parseDateLabelToKey(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const match = value.trim().match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) {
    return null;
  }

  const monthMap: Record<string, string> = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  const month = monthMap[match[1]];
  if (!month) {
    return null;
  }

  const day = Number(match[2]);
  const dayPart = day < 10 ? `0${day}` : `${day}`;
  return `${match[3]}-${month}-${dayPart}`;
}

function toEventTone(category: string | null): CalendarEventTone {
  if (category === 'birthday') {
    return 'pink';
  }

  if (category === 'training') {
    return 'teal';
  }

  if (category === 'meeting') {
    return 'blue';
  }

  return 'purple';
}

function dotToneFromEvent(tone: CalendarEventTone): 'blue' | 'purple' | 'teal' {
  if (tone === 'blue') {
    return 'blue';
  }

  if (tone === 'teal') {
    return 'teal';
  }

  return 'purple';
}
