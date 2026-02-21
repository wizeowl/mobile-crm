import { Pressable, StyleSheet, Text, View } from 'react-native';

import { VacationEmployeeBalance } from '../types';
import { colors, radii, spacing } from '../../../theme/tokens';

interface VacationEmployeeCardProps {
  employee: VacationEmployeeBalance;
  onPress?: () => void;
}

export function VacationEmployeeCard({ employee, onPress }: VacationEmployeeCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.avatar, { backgroundColor: employee.avatarColor }]}>
          <Text style={styles.avatarInitial}>{employee.name.charAt(0)}</Text>
        </View>

        <View style={styles.personTextWrap}>
          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.email}>{employee.email}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.metaRow}>
        <Metric label="Vacations" value={employee.vacations} />
        <Metric label="Sick Leave" value={employee.sickLeave} />
        <Metric label="Work remotely" value={employee.workRemotely} />
      </View>
    </Pressable>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#253244',
    fontSize: 12,
    fontWeight: '700',
  },
  personTextWrap: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#edf1f6',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  metric: {
    flex: 1,
    gap: 2,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    color: colors.textSecondary,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
  },
});
