import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  AddEmployeeModal,
  BackLink,
  EmployeeActivityCard,
  EmployeeListCard,
  EmployeeProfileTabs,
  EmployeeProjectCard,
  EmployeesLayout,
  EmployeesTabs,
  EmployeesTopBar,
  FloatingActionButton,
  InfoField,
  PageTitle,
  PaginationRow,
  ProfileHeader,
  SectionHeading,
  VacationCard,
} from '../components/EmployeesPrimitives';
import {
  EmployeeProfileTab,
  EmployeeSummary,
  EmployeesTab,
  EmployeeVacationSummary,
} from '../types';
import { colors, radii, spacing } from '../../../theme/tokens';

interface EmployeesHomeScreenProps {
  totalEmployees: number;
  activeTab: EmployeesTab;
  employees: EmployeeSummary[];
  onChangeTab: (value: EmployeesTab) => void;
  onOpenEmployeeProfile: (employeeId: string) => void;
  onOpenAddEmployee: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
}

interface EmployeeProfileScreenProps {
  employee: EmployeeSummary;
  profileTab: EmployeeProfileTab;
  projects: Array<{
    id: string;
    code: string;
    name: string;
    createdDate: string;
    activeTasks: number;
    assigneeColors: string[];
    status: 'in-progress' | 'low' | 'done';
  }>;
  vacations: EmployeeVacationSummary[];
  team: EmployeeSummary[];
  onBack: () => void;
  onChangeTab: (value: EmployeeProfileTab) => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
}

interface AddEmployeeOverlayProps {
  visible: boolean;
  emails: string[];
  errors: string[];
  loading: boolean;
  onClose: () => void;
  onChangeEmail: (index: number, value: string) => void;
  onAddEmailRow: () => void;
  onApprove: () => void;
}

export function EmployeesHomeScreen({
  totalEmployees,
  activeTab,
  employees,
  onChangeTab,
  onOpenEmployeeProfile,
  onOpenAddEmployee,
  onOpenMessenger,
  onOpenProfile,
  onOpenNotifications,
}: EmployeesHomeScreenProps) {
  const visibleEmployees = employees.slice(0, 8);

  return (
    <EmployeesLayout>
      <EmployeesTopBar
        onSearch={onOpenMessenger}
        onNotifications={onOpenNotifications}
        onProfile={onOpenProfile}
      />
      <PageTitle title={`Employees (${totalEmployees})`} />
      <EmployeesTabs value={activeTab} onChange={onChangeTab} />

      {activeTab === 'list' ? (
        <View style={styles.stackWrap}>
          {visibleEmployees.map((employee) => (
            <EmployeeListCard
              key={employee.id}
              name={employee.name}
              email={employee.email}
              gender={employee.gender}
              birthDate={employee.birthDate}
              age={employee.age}
              position={employee.position}
              seniority={employee.seniority}
              avatarColor={employee.avatarColor}
              onPress={() => onOpenEmployeeProfile(employee.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.stackWrap}>
          {visibleEmployees.map((employee, index) => (
            <Pressable key={employee.id} onPress={() => onOpenEmployeeProfile(employee.id)}>
              <EmployeeActivityCard
                name={employee.name}
                role={employee.role}
                seniority={employee.seniority}
                avatarColor={employee.avatarColor}
                backlogTasks={employee.backlogTasks}
                inProgressTasks={employee.inProgressTasks}
                inReviewTasks={employee.inReviewTasks}
                highlighted={index === 3}
              />
            </Pressable>
          ))}
        </View>
      )}

      <PaginationRow label={`1-8 of ${Math.max(totalEmployees, 8)}`} />
      <FloatingActionButton onPress={onOpenAddEmployee} />
    </EmployeesLayout>
  );
}

export function EmployeeProfileScreen({
  employee,
  profileTab,
  projects,
  vacations,
  team,
  onBack,
  onChangeTab,
  onOpenMessenger,
  onOpenProfile,
  onOpenNotifications,
}: EmployeeProfileScreenProps) {
  return (
    <EmployeesLayout>
      <EmployeesTopBar
        onSearch={onOpenMessenger}
        onNotifications={onOpenNotifications}
        onProfile={onOpenProfile}
      />
      <PageTitle title="Employee's Profile" />

      <ProfileHeader name={employee.name} role={employee.role} avatarColor={employee.avatarColor} />

      <View style={styles.profileCard}>
        <SectionHeading title="Main info" />
        <InfoField label="Position" value={employee.position} />
        <InfoField label="Company" value={employee.company} />
        <InfoField label="Location" value={employee.location} icon="M" />
        <InfoField label="Birthday Date" value={employee.birthDate} icon="C" />

        <SectionHeading title="Contact Info" />
        <InfoField label="Email" value={employee.email} />
        <InfoField label="Mobile Number" value={employee.phone} />
        <InfoField label="Skype" value={employee.skype} />
      </View>

      <View style={styles.rowHeader}>
        <Text style={styles.rowHeaderText}>Current Projects</Text>
        <Text style={styles.rowHeaderChevron}>v</Text>
        <View style={styles.filterButton}>
          <Text style={styles.filterButtonText}>F</Text>
        </View>
      </View>

      <EmployeeProfileTabs value={profileTab} onChange={onChangeTab} />

      {profileTab === 'projects' ? (
        <View style={styles.stackWrap}>
          {projects.map((project) => (
            <EmployeeProjectCard
              key={project.id}
              code={project.code}
              name={project.name}
              createdDate={project.createdDate}
              activeTasks={project.activeTasks}
              assigneeColors={project.assigneeColors}
              status={project.status}
            />
          ))}
        </View>
      ) : null}

      {profileTab === 'team' ? (
        <View style={styles.stackWrap}>
          {team.slice(0, 6).map((member) => (
            <EmployeeListCard
              key={member.id}
              name={member.name}
              email={member.email}
              gender={member.gender}
              birthDate={member.birthDate}
              age={member.age}
              position={member.position}
              seniority={member.seniority}
              avatarColor={member.avatarColor}
              onPress={() => undefined}
            />
          ))}
        </View>
      ) : null}

      {profileTab === 'vacations' ? (
        <View style={styles.stackWrap}>
          {vacations.map((vacation) => (
            <VacationCard
              key={vacation.id}
              requestType={vacation.requestType}
              periodLabel={vacation.periodLabel}
              durationLabel={vacation.durationLabel}
              status={vacation.status}
            />
          ))}
        </View>
      ) : null}

      <FloatingActionButton onPress={onBack} />
      <View style={styles.backLinkWrap}>
        <BackLink label="Back to Employees" onPress={onBack} />
      </View>
    </EmployeesLayout>
  );
}

export function AddEmployeeOverlay({
  visible,
  emails,
  errors,
  loading,
  onClose,
  onChangeEmail,
  onAddEmailRow,
  onApprove,
}: AddEmployeeOverlayProps) {
  return (
    <AddEmployeeModal
      visible={visible}
      emails={emails}
      errors={errors}
      loading={loading}
      onClose={onClose}
      onChangeEmail={onChangeEmail}
      onAddRow={onAddEmailRow}
      onApprove={onApprove}
    />
  );
}

const styles = StyleSheet.create({
  stackWrap: {
    gap: spacing.md,
  },
  profileCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  rowHeaderText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  rowHeaderChevron: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  filterButton: {
    marginLeft: 'auto',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  backLinkWrap: {
    position: 'absolute',
    left: spacing.lg,
    bottom: 36,
  },
});
