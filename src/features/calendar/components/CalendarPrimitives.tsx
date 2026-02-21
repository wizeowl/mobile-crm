import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CalendarDayCell, CalendarDotTone, CalendarEvent } from '../types';
import { colors, radii, spacing } from '../../../theme/tokens';

interface MonthGridCardProps {
  monthLabel: string;
  weekLabels: string[];
  cells: CalendarDayCell[];
  selectedDateKey: string;
  getDotTonesForDate: (dateKey: string) => CalendarDotTone[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (dateKey: string) => void;
}

interface DailyEventsHeaderProps {
  title: string;
}

interface CalendarEventCardProps {
  event: CalendarEvent;
}

export function MonthGridCard({
  monthLabel,
  weekLabels,
  cells,
  selectedDateKey,
  getDotTonesForDate,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
}: MonthGridCardProps) {
  return (
    <View style={styles.monthCard}>
      <View style={styles.monthHeader}>
        <Pressable onPress={onPreviousMonth} style={styles.monthNavButton}>
          <Text style={styles.monthNavArrow}>{'<-'}</Text>
        </Pressable>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <Pressable onPress={onNextMonth} style={styles.monthNavButton}>
          <Text style={styles.monthNavArrow}>{'->'}</Text>
        </Pressable>
      </View>

      <View style={styles.weekLabelsRow}>
        {weekLabels.map((label) => (
          <View key={label} style={styles.weekLabelPill}>
            <Text style={styles.weekLabelText}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {cells.map((cell) => {
          const selected = cell.dateKey === selectedDateKey;
          const dots = getDotTonesForDate(cell.dateKey);

          return (
            <Pressable
              key={cell.id}
              onPress={() => onSelectDate(cell.dateKey)}
              style={[styles.dayCell, selected && styles.dayCellSelected]}
            >
              <Text style={[styles.dayText, !cell.inCurrentMonth && styles.dayTextMuted]}>{cell.dayNumber}</Text>

              <View style={styles.dotRow}>
                {dots.slice(0, 4).map((tone, index) => (
                  <View key={`${cell.id}-${tone}-${index}`} style={[styles.dot, toneStyleMap[tone]]} />
                ))}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function DailyEventsHeader({ title }: DailyEventsHeaderProps) {
  return <Text style={styles.dailyHeader}>{title}</Text>;
}

export function CalendarEventCard({ event }: CalendarEventCardProps) {
  return (
    <View style={styles.eventCard}>
      <View style={[styles.eventStripe, eventToneStripeMap[event.tone]]} />
      <View style={styles.eventBody}>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {event.title}
        </Text>
        <View style={styles.eventMetaRow}>
          <Text style={styles.eventDuration}>{event.durationLabel}</Text>
          <Text style={[styles.eventTrend, event.trend === 'up' ? styles.eventTrendUp : styles.eventTrendDown]}>
            {event.trend === 'up' ? '↑' : '↓'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const toneStyleMap: Record<CalendarDotTone, object> = {
  blue: { backgroundColor: '#3d87f5' },
  purple: { backgroundColor: '#b069d8' },
  teal: { backgroundColor: '#18bdd8' },
};

const eventToneStripeMap: Record<CalendarEvent['tone'], object> = {
  pink: { backgroundColor: '#ea9ada' },
  blue: { backgroundColor: '#3d87f5' },
  purple: { backgroundColor: '#6955d9' },
  teal: { backgroundColor: '#18bdd8' },
};

const styles = StyleSheet.create({
  monthCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthNavButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthNavArrow: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  monthLabel: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  weekLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  weekLabelPill: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#eef3f9',
    minHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekLabelText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '20%',
    minHeight: 56,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  dayCellSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#f8fbff',
  },
  dayText: {
    color: '#444b78',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
  },
  dayTextMuted: {
    color: '#c0c8d8',
  },
  dotRow: {
    minHeight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dailyHeader: {
    color: colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  eventCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#edf2f7',
    backgroundColor: '#f6f9fd',
    minHeight: 64,
    paddingRight: spacing.md,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  eventStripe: {
    width: 4,
    borderTopLeftRadius: radii.md,
    borderBottomLeftRadius: radii.md,
  },
  eventBody: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  eventDuration: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  eventTrend: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '700',
  },
  eventTrendUp: {
    color: '#f2b233',
  },
  eventTrendDown: {
    color: '#2fc36b',
  },
});
