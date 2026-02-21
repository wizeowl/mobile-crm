import { StyleSheet, Text, View } from 'react-native';

import { FloatingActionButton, ProjectsLayout, TopAppBar } from '../../projects/components/ProjectsPrimitives';
import { CalendarDayCell, CalendarDotTone, CalendarEvent } from '../types';
import { CalendarEventCard, DailyEventsHeader, MonthGridCard } from '../components/CalendarPrimitives';
import { colors, spacing } from '../../../theme/tokens';

interface CalendarHomeScreenProps {
  monthLabel: string;
  weekLabels: string[];
  cells: CalendarDayCell[];
  selectedDateKey: string;
  selectedDateTitle: string;
  events: CalendarEvent[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (dateKey: string) => void;
  getDotTonesForDate: (dateKey: string) => CalendarDotTone[];
  onOpenCreateEvent: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
}

export function CalendarHomeScreen({
  monthLabel,
  weekLabels,
  cells,
  selectedDateKey,
  selectedDateTitle,
  events,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
  getDotTonesForDate,
  onOpenCreateEvent,
  onOpenMessenger,
  onOpenProfile,
  onOpenNotifications,
}: CalendarHomeScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenNotifications} onProfile={onOpenProfile} />
      <Text style={styles.pageTitle}>Calendar</Text>

      <MonthGridCard
        monthLabel={monthLabel}
        weekLabels={weekLabels}
        cells={cells}
        selectedDateKey={selectedDateKey}
        getDotTonesForDate={getDotTonesForDate}
        onPreviousMonth={onPreviousMonth}
        onNextMonth={onNextMonth}
        onSelectDate={onSelectDate}
      />

      <View style={styles.eventsWrap}>
        <DailyEventsHeader title={selectedDateTitle} />
        <View style={styles.eventsStack}>
          {events.length === 0 ? (
            <Text style={styles.emptyStateText}>No events for this day.</Text>
          ) : (
            events.map((event) => <CalendarEventCard key={event.id} event={event} />)
          )}
        </View>
      </View>

      <FloatingActionButton onPress={onOpenCreateEvent} />
    </ProjectsLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 50,
    lineHeight: 56,
    fontWeight: '700',
  },
  eventsWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  eventsStack: {
    gap: spacing.sm,
  },
  emptyStateText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '500',
  },
});
