import { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  BackLink,
  CalendarGrid,
  CheckboxRow,
  CommentField,
  FloatingActionButton,
  InfoField,
  ModalCard,
  ModeSwitch,
  NotificationRow,
  PageTitle,
  PrimaryButton,
  ProfileHeaderCard,
  ProfileLayout,
  ProfileTopBar,
  ProjectSummaryCard,
  RequestTypeGroup,
  SectionHeading,
  SegmentTabs,
  SettingsRow,
  SurfaceCard,
  TeamMemberCard,
  TimeField,
  ToggleRow,
  VacationRequestCard,
} from '../components/MyProfilePrimitives';
import { colors, radii, spacing } from '../../../theme/tokens';
import {
  AddRequestFormState,
  AddRequestValidationErrors,
  ProfileNotification,
  ProfileProjectSummary,
  ProfileTab,
  ProfileUser,
  SettingsState,
  TeamMember,
  VacationRequest,
  VacationRequestType,
} from '../types';

interface MyProfileMainScreenProps {
  user: ProfileUser;
  tab: ProfileTab;
  tabs: Array<{ label: string; value: ProfileTab }>;
  projects: ProfileProjectSummary[];
  team: TeamMember[];
  vacations: VacationRequest[];
  teamMap: Record<string, TeamMember>;
  onTabChange: (tab: ProfileTab) => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  onOpenAddRequest: () => void;
  onOpenMessenger: () => void;
  onOpenEmployees: () => void;
  onBackToProjects: () => void;
}

interface ProfileSettingsScreenProps {
  settings: SettingsState;
  onBack: () => void;
  onOpenMessenger: () => void;
  onOpenNotifications: () => void;
  onToggleSection: (section: string) => void;
  onToggleIssueActivity: (value: boolean) => void;
  onToggleTrackingActivity: (value: boolean) => void;
  onToggleNewComments: (value: boolean) => void;
  onToggleQuietAfterNine: (value: boolean) => void;
}

interface NotificationsModalProps {
  visible: boolean;
  notifications: ProfileNotification[];
  onClose: () => void;
}

interface AddRequestModalProps {
  visible: boolean;
  form: AddRequestFormState;
  errors: AddRequestValidationErrors;
  dayGrid: number[];
  requestTypeOptions: Array<{ label: string; value: VacationRequestType }>;
  calculatedHoursLabel: string;
  sending: boolean;
  onClose: () => void;
  onChangeType: (value: VacationRequestType) => void;
  onChangeMode: (value: 'days' | 'hours') => void;
  onSelectDay: (day: number) => void;
  onOpenFromTime: () => void;
  onOpenToTime: () => void;
  onChangeComment: (value: string) => void;
  onSubmit: () => void;
}

interface OptionPickerModalProps {
  visible: boolean;
  title: string;
  options: string[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

export function MyProfileMainScreen({
  user,
  tab,
  tabs,
  projects,
  team,
  vacations,
  teamMap,
  onTabChange,
  onOpenSettings,
  onOpenNotifications,
  onOpenAddRequest,
  onOpenMessenger,
  onOpenEmployees,
  onBackToProjects,
}: MyProfileMainScreenProps) {
  return (
    <ProfileLayout>
      <ProfileTopBar onSearch={onOpenMessenger} onNotifications={onOpenNotifications} />
      <BackLink label="Back to Projects" onPress={onBackToProjects} />
      <PageTitle title="My Profile" />

      <ProfileHeaderCard name={user.name} role={user.role} onOpenSettings={onOpenSettings} />

      <SurfaceCard>
        <SectionHeading title="Main info" />
        <InfoField label="Position" value={user.position} />
        <InfoField label="Company" value={user.company} />
        <InfoField label="Location" value={user.location} rightIcon="M" />
        <InfoField label="Birthday Date" value={user.birthDate} rightIcon="C" />

        <SectionHeading title="Contact Info" />
        <InfoField label="Email" value={user.email} />
        <InfoField label="Mobile Number" value={user.phone} />
        <InfoField label="Skype" value={user.skype} />
      </SurfaceCard>

      <View style={styles.rowSelectWrap}>
        <Text style={styles.rowSelectText}>Current Projects</Text>
        <Text style={styles.rowSelectChevron}>v</Text>
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterButtonText}>F</Text>
        </Pressable>
      </View>

      <SegmentTabs tabs={tabs} activeTab={tab} onChangeTab={onTabChange} />

      {tab === 'projects' ? (
        <View style={styles.stackWrap}>
          {projects.map((project) => (
            <ProjectSummaryCard
              key={project.id}
              project={project}
              assignees={project.assigneeIds.map((id) => teamMap[id]).filter(Boolean)}
            />
          ))}
        </View>
      ) : null}

      {tab === 'team' ? (
        <View style={styles.teamGrid}>
          {team.map((member) => (
            <Pressable key={member.id} style={styles.teamCell} onPress={onOpenEmployees}>
              <TeamMemberCard member={member} />
            </Pressable>
          ))}
        </View>
      ) : null}

      {tab === 'vacations' ? (
        <View style={styles.stackWrap}>
          {vacations.map((request) => (
            <VacationRequestCard key={request.id} request={request} />
          ))}
        </View>
      ) : null}

      <FloatingActionButton
        onPress={
          tab === 'vacations' ? onOpenAddRequest : tab === 'team' ? onOpenEmployees : () => undefined
        }
      />
    </ProfileLayout>
  );
}

export function ProfileSettingsScreen({
  settings,
  onBack,
  onOpenMessenger,
  onOpenNotifications,
  onToggleSection,
  onToggleIssueActivity,
  onToggleTrackingActivity,
  onToggleNewComments,
  onToggleQuietAfterNine,
}: ProfileSettingsScreenProps) {
  const sections = [
    { key: 'account', icon: 'A', label: 'Account' },
    { key: 'notifications', icon: 'N', label: 'Notifications' },
    { key: 'company', icon: 'M', label: 'My Company' },
    { key: 'connected', icon: 'C', label: 'Connected Apps' },
    { key: 'payments', icon: 'P', label: 'Payments' },
    { key: 'confidentiality', icon: 'L', label: 'Confidentiality' },
    { key: 'safety', icon: 'Y', label: 'Safety' },
  ];

  return (
    <ProfileLayout>
      <ProfileTopBar onSearch={onOpenMessenger} onNotifications={onOpenNotifications} />
      <BackLink label="Back to Profile" onPress={onBack} />
      <PageTitle title="Settings" />

      <SurfaceCard>
        {sections.map((section) => {
          const expanded = settings.expandedSection === section.key;
          const isNotifications = section.key === 'notifications';

          return (
            <SettingsRow
              key={section.key}
              icon={section.icon}
              label={section.label}
              expanded={expanded}
              onPress={() => onToggleSection(section.key)}
            >
              {isNotifications ? (
                <>
                  <ToggleRow
                    title="Issue Activity"
                    subtitle="Send me email notifications for issue activity"
                    value={settings.notifications.issueActivity}
                    onToggle={onToggleIssueActivity}
                  />
                  <ToggleRow
                    title="Tracking Activity"
                    subtitle="Send me notifications when someone tracked time in tasks"
                    value={settings.notifications.trackingActivity}
                    onToggle={onToggleTrackingActivity}
                  />
                  <ToggleRow
                    title="New Comments"
                    subtitle="Send me notifications when someone've sent the comment"
                    value={settings.notifications.newComments}
                    onToggle={onToggleNewComments}
                  />
                  <CheckboxRow
                    label="Don't send me notifications after 9:00 PM"
                    value={settings.notifications.quietAfterNine}
                    onChange={onToggleQuietAfterNine}
                  />
                </>
              ) : null}
            </SettingsRow>
          );
        })}
      </SurfaceCard>

      <FloatingActionButton onPress={() => undefined} />
    </ProfileLayout>
  );
}

export function NotificationsModal({ visible, notifications, onClose }: NotificationsModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.notificationsOverlay} onPress={onClose}>
        <Pressable style={styles.notificationsCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.notificationsHeader}>
            <Text style={styles.notificationsTitle}>Notifications</Text>
            <Pressable onPress={onClose} style={styles.notificationsCloseButton}>
              <Text style={styles.notificationsCloseText}>x</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
            {notifications.map((item) => (
              <NotificationRow
                key={item.id}
                actorName={item.actorName}
                actorColor={item.actorColor}
                message={item.message}
                timeLabel={item.timeLabel}
              />
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function AddRequestModal({
  visible,
  form,
  errors,
  dayGrid,
  requestTypeOptions,
  calculatedHoursLabel,
  sending,
  onClose,
  onChangeType,
  onChangeMode,
  onSelectDay,
  onOpenFromTime,
  onOpenToTime,
  onChangeComment,
  onSubmit,
}: AddRequestModalProps) {
  return (
    <ModalCard visible={visible} title="Add Request" onClose={onClose}>
      <RequestTypeGroup value={form.type} options={requestTypeOptions} onChange={onChangeType} />

      <ModeSwitch mode={form.mode} onChange={onChangeMode} />

      <CalendarGrid days={dayGrid} selectedDays={form.selectedDays} onSelect={onSelectDay} error={errors.selectedDays} />

      {form.mode === 'hours' ? (
        <>
          <TimeField label="From" value={form.fromTime} onPress={onOpenFromTime} error={errors.fromTime} />
          <TimeField label="To" value={form.toTime} onPress={onOpenToTime} error={errors.toTime} />
          <View style={styles.hoursInfo}>
            <Text style={styles.hoursInfoLabel}>Time for Vacation</Text>
            <Text style={styles.hoursInfoValue}>{calculatedHoursLabel}</Text>
          </View>
        </>
      ) : null}

      <CommentField value={form.comment} onChange={onChangeComment} />

      <PrimaryButton label="Send Request" onPress={onSubmit} loading={sending} />
    </ModalCard>
  );
}

export function OptionPickerModal({
  visible,
  title,
  options,
  onClose,
  onSelect,
}: OptionPickerModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.pickerOverlay} onPress={onClose}>
        <Pressable style={styles.pickerCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.pickerCloseButton}>
              <Text style={styles.pickerCloseText}>x</Text>
            </Pressable>
          </View>

          <View style={styles.optionsStack}>
            {options.map((option) => (
              <Pressable
                key={option}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
                style={styles.optionRow}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rowSelectWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 38,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  rowSelectText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  rowSelectChevron: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  filterButton: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  stackWrap: {
    gap: spacing.sm,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  teamCell: {
    width: '48%',
  },
  notificationsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.35)',
    justifyContent: 'center',
    padding: spacing.md,
  },
  notificationsCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    maxHeight: '92%',
    overflow: 'hidden',
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
  },
  notificationsTitle: {
    color: colors.textPrimary,
    fontSize: 42,
    fontWeight: '700',
  },
  notificationsCloseButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eef3f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationsCloseText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  notificationsList: {
    flexGrow: 0,
  },
  hoursInfo: {
    borderRadius: radii.md,
    backgroundColor: '#edf3fb',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursInfoLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  hoursInfoValue: {
    color: colors.teal,
    fontSize: 22,
    fontWeight: '700',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.35)',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  pickerCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  pickerCloseButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef3f9',
  },
  pickerCloseText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  optionsStack: {
    gap: spacing.sm,
  },
  optionRow: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});
