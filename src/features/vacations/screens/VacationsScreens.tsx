import { StyleSheet, Text, View } from 'react-native';

import { FloatingActionButton, ProjectsLayout, TopAppBar } from '../../projects/components/ProjectsPrimitives';
import { VacationEmployeeBalance } from '../types';
import { VacationEmployeeCard } from '../components/VacationsPrimitives';
import { colors, spacing } from '../../../theme/tokens';

interface VacationsListScreenProps {
  employees: VacationEmployeeBalance[];
  onOpenAddRequest: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
}

export function VacationsListScreen({
  employees,
  onOpenAddRequest,
  onOpenMessenger,
  onOpenProfile,
  onOpenNotifications,
}: VacationsListScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenNotifications} onProfile={onOpenProfile} />
      <Text style={styles.pageTitle}>Vacations</Text>

      <View style={styles.stack}>
        {employees.map((employee) => (
          <VacationEmployeeCard key={employee.id} employee={employee} />
        ))}
      </View>

      <FloatingActionButton onPress={onOpenAddRequest} />
    </ProjectsLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '700',
  },
  stack: {
    gap: spacing.md,
  },
});
