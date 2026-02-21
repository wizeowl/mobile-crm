import { ReactNode } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, radii, shadows, spacing } from '../../../theme/tokens';
import { EmployeeProfileTab, EmployeesTab } from '../types';

const logoImage = require('../../../../assets/icon.png');

interface EmployeesLayoutProps {
  children: ReactNode;
}

interface EmployeesTopBarProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}

interface PageTitleProps {
  title: string;
}

interface EmployeesTabsProps {
  value: EmployeesTab;
  onChange: (value: EmployeesTab) => void;
}

interface EmployeeListCardProps {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  age: number;
  position: string;
  seniority: string;
  avatarColor: string;
  onPress: () => void;
}

interface EmployeeActivityCardProps {
  name: string;
  role: string;
  seniority: string;
  avatarColor: string;
  backlogTasks: number;
  inProgressTasks: number;
  inReviewTasks: number;
  highlighted?: boolean;
}

interface PaginationRowProps {
  label: string;
}

interface BackLinkProps {
  label: string;
  onPress: () => void;
}

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarColor: string;
}

interface SectionHeadingProps {
  title: string;
}

interface InfoFieldProps {
  label: string;
  value: string;
  icon?: string;
}

interface EmployeeProfileTabsProps {
  value: EmployeeProfileTab;
  onChange: (value: EmployeeProfileTab) => void;
}

interface EmployeeProjectCardProps {
  code: string;
  name: string;
  createdDate: string;
  activeTasks: number;
  assigneeColors: string[];
  status: 'in-progress' | 'low' | 'done';
}

interface VacationCardProps {
  requestType: string;
  periodLabel: string;
  durationLabel: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface AddEmployeeModalProps {
  visible: boolean;
  emails: string[];
  errors: string[];
  loading: boolean;
  onClose: () => void;
  onChangeEmail: (index: number, value: string) => void;
  onAddRow: () => void;
  onApprove: () => void;
}

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

export function EmployeesLayout({ children }: EmployeesLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function EmployeesTopBar({ onSearch, onNotifications, onProfile }: EmployeesTopBarProps) {
  return (
    <View style={styles.topBar}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      <View style={styles.topActions}>
        <IconButton label="S" onPress={onSearch} />
        <IconButton label="N" onPress={onNotifications} />
        <IconButton label="P" onPress={onProfile} avatar />
      </View>
    </View>
  );
}

export function PageTitle({ title }: PageTitleProps) {
  return <Text style={styles.pageTitle}>{title}</Text>;
}

export function EmployeesTabs({ value, onChange }: EmployeesTabsProps) {
  return (
    <View style={styles.tabsWrap}>
      <Pressable
        onPress={() => onChange('list')}
        style={[styles.tabButton, value === 'list' && styles.tabButtonActive]}
      >
        <Text style={[styles.tabButtonText, value === 'list' && styles.tabButtonTextActive]}>List</Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('activity')}
        style={[styles.tabButton, value === 'activity' && styles.tabButtonActive]}
      >
        <Text style={[styles.tabButtonText, value === 'activity' && styles.tabButtonTextActive]}>Activity</Text>
      </Pressable>
    </View>
  );
}

export function EmployeeListCard({
  name,
  email,
  gender,
  birthDate,
  age,
  position,
  seniority,
  avatarColor,
  onPress,
}: EmployeeListCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.listCard}>
      <View style={styles.listCardHeader}>
        <View style={styles.rowCenter}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardEmail}>{email}</Text>
          </View>
        </View>
        <Text style={styles.moreIcon}>...</Text>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.metaGrid}>
        <MetaColumn label="Gender" value={gender} />
        <MetaColumn label="Birthday" value={birthDate} />
        <MetaColumn label="Full age" value={`${age}`} />
      </View>

      <View style={styles.positionWrap}>
        <Text style={styles.metaLabel}>Position</Text>
        <View style={styles.rowCenter}>
          <Text style={styles.positionText}>{position}</Text>
          <Tag text={seniority} tone="muted" />
        </View>
      </View>
    </Pressable>
  );
}

export function EmployeeActivityCard({
  name,
  role,
  seniority,
  avatarColor,
  backlogTasks,
  inProgressTasks,
  inReviewTasks,
  highlighted,
}: EmployeeActivityCardProps) {
  return (
    <View style={[styles.activityCard, highlighted && styles.activityCardHighlighted]}>
      <View style={styles.activityHeader}>
        <View style={[styles.avatarLargeOuter, highlighted && styles.avatarLargeOuterHighlighted]}>
          <View style={[styles.avatarLarge, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{name.charAt(0)}</Text>
          </View>
        </View>
        <Text style={styles.activityName}>{name}</Text>
        <Text style={styles.activityRole}>{role}</Text>
        <Tag text={seniority} tone="muted" />
      </View>

      <View style={styles.activityMetricsRow}>
        <MetricBox label="Backlog tasks" value={backlogTasks} />
        <MetricBox label="Tasks In Progress" value={inProgressTasks} />
        <MetricBox label="Tasks In Review" value={inReviewTasks} />
      </View>
    </View>
  );
}

export function PaginationRow({ label }: PaginationRowProps) {
  return (
    <View style={styles.paginationWrap}>
      <Text style={styles.paginationText}>{label}</Text>
      <Text style={styles.paginationArrows}>{'<-  ->'}</Text>
    </View>
  );
}

export function FloatingActionButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <Text style={styles.fabText}>+</Text>
    </Pressable>
  );
}

export function BackLink({ label, onPress }: BackLinkProps) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.backLink}>{`<- ${label}`}</Text>
    </Pressable>
  );
}

export function ProfileHeader({ name, role, avatarColor }: ProfileHeaderProps) {
  return (
    <View style={styles.profileHeaderCard}>
      <View style={[styles.profileAvatarRing, { borderColor: avatarColor }]}>
        <View style={[styles.profileAvatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        </View>
      </View>

      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileRole}>{role}</Text>
    </View>
  );
}

export function SectionHeading({ title }: SectionHeadingProps) {
  return <Text style={styles.sectionHeading}>{title}</Text>;
}

export function InfoField({ label, value, icon }: InfoFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldShell}>
        <Text style={styles.fieldValue}>{value}</Text>
        {icon ? <Text style={styles.fieldIcon}>{icon}</Text> : null}
      </View>
    </View>
  );
}

export function EmployeeProfileTabs({ value, onChange }: EmployeeProfileTabsProps) {
  return (
    <View style={styles.profileTabsWrap}>
      <ProfileTabButton label="Projects" active={value === 'projects'} onPress={() => onChange('projects')} />
      <ProfileTabButton label="Team" active={value === 'team'} onPress={() => onChange('team')} />
      <ProfileTabButton label="Vacations" active={value === 'vacations'} onPress={() => onChange('vacations')} />
    </View>
  );
}

export function EmployeeProjectCard({
  code,
  name,
  createdDate,
  activeTasks,
  assigneeColors,
  status,
}: EmployeeProjectCardProps) {
  const statusLabel = status === 'in-progress' ? 'In Progress' : status === 'done' ? 'Done' : 'Low';

  return (
    <View style={styles.projectCard}>
      <Text style={styles.projectCode}>{code}</Text>
      <Text style={styles.projectName}>{name}</Text>
      <Text style={styles.projectCreated}>{createdDate}</Text>

      <View style={styles.projectStatsRow}>
        <MetricColumn label="Project Data" value={`${activeTasks}`} />
        <MetricColumn label="Active Tasks" value={`${activeTasks}`} />
        <View style={styles.metricColumn}>
          <Text style={styles.metricLabel}>Assignees</Text>
          <View style={styles.assigneesRow}>
            {assigneeColors.slice(0, 4).map((color, index) => (
              <View
                key={`${color}-${index}`}
                style={[styles.smallAvatar, { backgroundColor: color, marginLeft: index === 0 ? 0 : -8 }]}
              />
            ))}
          </View>
        </View>
      </View>

      <Tag
        text={statusLabel}
        tone={status === 'done' ? 'approved' : status === 'in-progress' ? 'pending' : 'muted'}
      />
    </View>
  );
}

export function VacationCard({ requestType, periodLabel, durationLabel, status }: VacationCardProps) {
  return (
    <View style={styles.vacationCard}>
      <Text style={styles.vacationType}>{requestType}</Text>
      <Text style={styles.vacationPeriod}>{periodLabel}</Text>
      <View style={styles.vacationFooter}>
        <Text style={styles.vacationDuration}>{durationLabel}</Text>
        <Tag text={status === 'approved' ? 'Approved' : status === 'pending' ? 'Pending' : 'Rejected'} tone={status} />
      </View>
    </View>
  );
}

export function AddEmployeeModal({
  visible,
  emails,
  errors,
  loading,
  onClose,
  onChangeEmail,
  onAddRow,
  onApprove,
}: AddEmployeeModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.modalHeaderRow}>
            <Text style={styles.modalTitle}>Add Employee</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </Pressable>
          </View>

          {emails.map((email, index) => (
            <View key={`employee-email-${index}`} style={styles.modalFieldWrap}>
              <Text style={styles.fieldLabel}>{index === 0 ? "Member's Email" : `Member ${index + 1} Email`}</Text>
              <View style={[styles.fieldShell, errors[index] ? styles.fieldShellError : null]}>
                <TextInput
                  value={email}
                  onChangeText={(value) => onChangeEmail(index, value)}
                  placeholder="memberemail@gmail.com"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.modalInput}
                />
              </View>
              {errors[index] ? <Text style={styles.errorText}>{errors[index]}</Text> : null}
            </View>
          ))}

          <Pressable onPress={onAddRow} style={styles.addRowButton}>
            <Text style={styles.addRowText}>+ Add another Member</Text>
          </Pressable>

          <PrimaryButton label={loading ? 'Please wait...' : 'Approve'} onPress={onApprove} loading={loading} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function PrimaryButton({ label, onPress, loading }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.primaryButton} disabled={loading}>
      <Text style={styles.primaryButtonText}>{loading ? 'Please wait...' : label}</Text>
    </Pressable>
  );
}

function ProfileTabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.profileTab, active && styles.profileTabActive]}>
      <Text style={[styles.profileTabText, active && styles.profileTabTextActive]}>{label}</Text>
    </Pressable>
  );
}

function IconButton({
  label,
  onPress,
  avatar,
}: {
  label: string;
  onPress?: () => void;
  avatar?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.iconButton, avatar && styles.iconButtonAvatar]}>
      <Text style={[styles.iconButtonText, avatar && styles.iconButtonAvatarText]}>{label}</Text>
    </Pressable>
  );
}

function MetaColumn({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaColumn}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

function MetricBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function MetricColumn({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricColumn}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValueText}>{value}</Text>
    </View>
  );
}

function Tag({
  text,
  tone,
}: {
  text: string;
  tone: 'muted' | 'pending' | 'approved' | 'rejected';
}) {
  const toneStyles =
    tone === 'approved'
      ? styles.tagApproved
      : tone === 'pending'
      ? styles.tagPending
      : tone === 'rejected'
      ? styles.tagRejected
      : styles.tagMuted;

  const textStyles =
    tone === 'approved'
      ? styles.tagTextApproved
      : tone === 'pending'
      ? styles.tagTextPending
      : tone === 'rejected'
      ? styles.tagTextRejected
      : styles.tagTextMuted;

  return (
    <View style={[styles.tag, toneStyles]}>
      <Text style={[styles.tagText, textStyles]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 88,
    gap: spacing.md,
  },
  topBar: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 62,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 32,
    height: 32,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f6fb',
  },
  iconButtonAvatar: {
    backgroundColor: '#f2eecf',
  },
  iconButtonText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  iconButtonAvatarText: {
    color: '#9a8c64',
  },
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700',
  },
  tabsWrap: {
    borderRadius: radii.lg,
    backgroundColor: '#d9e2ee',
    padding: 2,
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    minHeight: 30,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabButtonText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: colors.surface,
  },
  listCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  listCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#253244',
    fontSize: 12,
    fontWeight: '700',
  },
  cardName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  cardEmail: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  moreIcon: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#edf1f6',
  },
  metaGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  metaColumn: {
    flex: 1,
    gap: 2,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  metaValue: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  positionWrap: {
    gap: 4,
  },
  positionText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  tag: {
    borderRadius: 8,
    minHeight: 20,
    minWidth: 52,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tagMuted: {
    backgroundColor: '#edf1f6',
    borderWidth: 1,
    borderColor: '#d4dde9',
  },
  tagTextMuted: {
    color: colors.textMuted,
  },
  tagPending: {
    backgroundColor: '#e9f2ff',
  },
  tagTextPending: {
    color: colors.primary,
  },
  tagApproved: {
    backgroundColor: '#def6e8',
  },
  tagTextApproved: {
    color: colors.success,
  },
  tagRejected: {
    backgroundColor: '#ffe8e8',
  },
  tagTextRejected: {
    color: colors.danger,
  },
  activityCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md,
  },
  activityCardHighlighted: {
    backgroundColor: '#fff6e9',
  },
  activityHeader: {
    alignItems: 'center',
    gap: 2,
  },
  avatarLargeOuter: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf2fb',
  },
  avatarLargeOuterHighlighted: {
    borderColor: '#f4c67d',
  },
  avatarLarge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  activityRole: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  paginationWrap: {
    alignSelf: 'center',
    minHeight: 28,
    borderRadius: 14,
    backgroundColor: '#e3eaf4',
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  paginationText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  paginationArrows: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  fabText: {
    color: colors.surface,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '700',
    marginTop: -1,
  },
  backLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  profileHeaderCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  profileAvatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  profileRole: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  fieldWrap: {
    gap: 4,
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  fieldShell: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  fieldShellError: {
    borderColor: colors.danger,
  },
  fieldValue: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  fieldIcon: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  profileTabsWrap: {
    borderRadius: radii.lg,
    backgroundColor: '#eef3f9',
    padding: 2,
    flexDirection: 'row',
  },
  profileTab: {
    flex: 1,
    minHeight: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTabActive: {
    backgroundColor: colors.primary,
  },
  profileTabText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  profileTabTextActive: {
    color: colors.surface,
  },
  projectCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.xs,
  },
  projectCode: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  projectName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  projectCreated: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  projectStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  metricColumn: {
    flex: 1,
    gap: 4,
  },
  metricValueText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  assigneesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  vacationCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.xs,
  },
  vacationType: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  vacationPeriod: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  vacationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vacationDuration: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 42, 55, 0.3)',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  modalFieldWrap: {
    gap: 4,
  },
  modalInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  addRowButton: {
    alignSelf: 'flex-start',
    minHeight: 28,
    justifyContent: 'center',
  },
  addRowText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '500',
  },
  primaryButton: {
    borderRadius: radii.md,
    minHeight: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
    marginTop: spacing.sm,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});
