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
import {
  AddRequestValidationErrors,
  ProfileProjectSummary,
  ProfileTab,
  TeamMember,
  VacationMode,
  VacationRequest,
  VacationRequestType,
} from '../types';

const logoImage = require('../../../../assets/icon.png');

interface ProfileLayoutProps {
  children: ReactNode;
}

interface ProfileTopBarProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onProfilePress?: () => void;
}

interface ProfileHeaderCardProps {
  name: string;
  role: string;
  onOpenSettings: () => void;
}

interface InfoFieldProps {
  label: string;
  value: string;
  rightIcon?: string;
}

interface SegmentTabsProps {
  tabs: Array<{ label: string; value: ProfileTab }>;
  activeTab: ProfileTab;
  onChangeTab: (value: ProfileTab) => void;
}

interface ProjectSummaryCardProps {
  project: ProfileProjectSummary;
  assignees: TeamMember[];
}

interface TeamMemberCardProps {
  member: TeamMember;
}

interface VacationRequestCardProps {
  request: VacationRequest;
}

interface FloatingActionButtonProps {
  onPress: () => void;
}

interface RequestTypeGroupProps {
  value: VacationRequestType;
  options: Array<{ label: string; value: VacationRequestType }>;
  onChange: (value: VacationRequestType) => void;
}

interface ModeSwitchProps {
  mode: VacationMode;
  onChange: (value: VacationMode) => void;
}

interface CalendarGridProps {
  days: number[];
  selectedDays: number[];
  onSelect: (day: number) => void;
  error?: string;
}

interface TimeFieldProps {
  label: string;
  value: string;
  onPress: () => void;
  error?: string;
}

interface CommentFieldProps {
  value: string;
  onChange: (value: string) => void;
}

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

interface ModalCardProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

interface SettingsRowProps {
  label: string;
  icon: string;
  expanded?: boolean;
  onPress: () => void;
  children?: ReactNode;
}

interface ToggleRowProps {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: (next: boolean) => void;
}

interface CheckboxRowProps {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}

interface NotificationRowProps {
  actorName: string;
  actorColor: string;
  message: string;
  timeLabel: string;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function ProfileTopBar({ onSearch, onNotifications, onProfilePress }: ProfileTopBarProps) {
  return (
    <View style={styles.topBar}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />
      <View style={styles.topActions}>
        <TopIconButton label="S" onPress={onSearch} />
        <TopIconButton label="N" onPress={onNotifications} />
        <TopIconButton label="P" onPress={onProfilePress} avatar />
      </View>
    </View>
  );
}

export function BackLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.backLink}>{`<- ${label}`}</Text>
    </Pressable>
  );
}

export function PageTitle({ title }: { title: string }) {
  return <Text style={styles.pageTitle}>{title}</Text>;
}

export function SurfaceCard({ children }: { children: ReactNode }) {
  return <View style={styles.surfaceCard}>{children}</View>;
}

export function ProfileHeaderCard({ name, role, onOpenSettings }: ProfileHeaderCardProps) {
  return (
    <SurfaceCard>
      <View style={styles.profileHeaderTop}>
        <View style={styles.profileAvatarOuter}>
          <View style={styles.profileAvatarInner}>
            <Text style={styles.profileAvatarText}>{name.charAt(0)}</Text>
          </View>
        </View>

        <Pressable onPress={onOpenSettings} style={styles.squareActionButton}>
          <Text style={styles.squareActionText}>S</Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
    </SurfaceCard>
  );
}

export function SectionHeading({ title }: { title: string }) {
  return <Text style={styles.sectionHeading}>{title}</Text>;
}

export function InfoField({ label, value, rightIcon }: InfoFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldShell}>
        <Text style={styles.fieldValue} numberOfLines={1}>
          {value}
        </Text>
        {rightIcon ? <Text style={styles.fieldIcon}>{rightIcon}</Text> : null}
      </View>
    </View>
  );
}

export function SegmentTabs({ tabs, activeTab, onChangeTab }: SegmentTabsProps) {
  return (
    <View style={styles.tabsWrap}>
      {tabs.map((tab) => {
        const active = tab.value === activeTab;
        return (
          <Pressable
            key={tab.value}
            onPress={() => onChangeTab(tab.value)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <Text style={[styles.tabText, active && styles.activeTabText]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ProjectSummaryCard({ project, assignees }: ProjectSummaryCardProps) {
  const statusMap: Record<ProfileProjectSummary['status'], string> = {
    'in-progress': 'In Progress',
    low: 'Low',
    done: 'Done',
  };

  return (
    <SurfaceCard>
      <Text style={styles.codeText}>{project.code}</Text>
      <Text style={styles.projectName}>{project.name}</Text>

      <View style={styles.projectMetaRow}>
        <MetaStat label="Active Tasks" value={`${project.activeTasks}`} />
        <MetaStat label="Assignee" value={`${assignees.length}`} />
      </View>

      <View style={styles.assigneesRow}>
        {assignees.slice(0, 4).map((member, index) => (
          <View
            key={member.id}
            style={[
              styles.avatar,
              { backgroundColor: member.avatarColor, marginLeft: index === 0 ? 0 : -8 },
            ]}
          >
            <Text style={styles.avatarInitial}>{member.name.charAt(0)}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.projectStatus}>{statusMap[project.status]}</Text>
    </SurfaceCard>
  );
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <SurfaceCard>
      <View style={[styles.teamAvatar, { backgroundColor: member.avatarColor }]}>
        <Text style={styles.avatarInitial}>{member.name.charAt(0)}</Text>
      </View>
      <Text style={styles.teamName}>{member.name}</Text>
      <Text style={styles.teamRole}>{member.role}</Text>
      <Text style={styles.teamMeta}>{member.seniority}</Text>
      <Tag text={member.stateTag} tone="muted" />
    </SurfaceCard>
  );
}

export function VacationRequestCard({ request }: VacationRequestCardProps) {
  const labelMap: Record<VacationRequestType, string> = {
    vacation: 'Vacation',
    'sick-leave': 'Sick Leave',
    'work-remotely': 'Work remotely',
  };

  const statusTone: Record<VacationRequest['status'], 'pending' | 'approved' | 'rejected'> = {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
  };

  return (
    <SurfaceCard>
      <Text style={styles.requestTypeLabel}>{labelMap[request.type]}</Text>
      <View style={styles.requestTopRow}>
        <Text style={styles.requestTitle}>{labelMap[request.type]}</Text>
        <Tag text={capitalize(request.status)} tone={statusTone[request.status]} />
      </View>
      <View style={styles.requestBottomRow}>
        <Text style={styles.requestPeriod}>{request.periodLabel}</Text>
        <Text style={styles.requestDuration}>{request.durationLabel}</Text>
      </View>
    </SurfaceCard>
  );
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <Text style={styles.fabText}>+</Text>
    </Pressable>
  );
}

export function ModalCard({ visible, title, onClose, children }: ModalCardProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function RequestTypeGroup({ value, options, onChange }: RequestTypeGroupProps) {
  return (
    <View style={styles.groupWrap}>
      <Text style={styles.groupLabel}>Request Type</Text>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={styles.radioRow}
          >
            <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
              {selected ? <View style={styles.radioInner} /> : null}
            </View>
            <Text style={styles.radioText}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <View style={styles.modeSwitch}>
      <Pressable
        onPress={() => onChange('days')}
        style={[styles.modeButton, mode === 'days' && styles.modeButtonActive]}
      >
        <Text style={[styles.modeButtonText, mode === 'days' && styles.modeButtonTextActive]}>Days</Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('hours')}
        style={[styles.modeButton, mode === 'hours' && styles.modeButtonActive]}
      >
        <Text style={[styles.modeButtonText, mode === 'hours' && styles.modeButtonTextActive]}>Hours</Text>
      </Pressable>
    </View>
  );
}

export function CalendarGrid({ days, selectedDays, onSelect, error }: CalendarGridProps) {
  return (
    <View style={styles.calendarWrap}>
      <View style={styles.calendarHeaderRow}>
        <Text style={styles.arrow}>{'<-'}</Text>
        <Text style={styles.calendarTitle}>September, 2020</Text>
        <Text style={styles.arrow}>{'->'}</Text>
      </View>

      <View style={styles.weekLabelsRow}>
        <Tag text="Mon" tone="calendar" />
        <Tag text="Tue" tone="calendar" />
        <Tag text="Wed" tone="calendar" />
        <Tag text="Thu" tone="calendar" />
        <Tag text="Fri" tone="calendar" />
      </View>

      <View style={styles.daysGrid}>
        {days.map((day, index) => {
          const selected = selectedDays.includes(day);
          const faded = index === 0 || index > 22;

          return (
            <Pressable
              key={`day-${index}`}
              onPress={() => onSelect(day)}
              style={[styles.dayCell, selected && styles.dayCellSelected]}
            >
              <Text style={[styles.dayText, faded && styles.dayTextFaded, selected && styles.dayTextSelected]}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <View style={styles.errorBubble}>
          <Text style={styles.errorBubbleText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function TimeField({ label, value, onPress, error }: TimeFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable onPress={onPress} style={[styles.fieldShell, error && styles.fieldError]}>
        <Text style={styles.fieldValue}>{value}</Text>
        <Text style={styles.fieldIcon}>C</Text>
      </Pressable>
      {error ? <Text style={styles.fieldErrorText}>{error}</Text> : null}
    </View>
  );
}

export function CommentField({ value, onChange }: CommentFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <View style={styles.commentFieldShell}>
        <TextInput
          placeholder="Add your comment"
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChange}
          multiline
          style={styles.commentInput}
        />
      </View>
    </View>
  );
}

export function PrimaryButton({ label, onPress, loading }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{loading ? 'Please wait...' : label}</Text>
    </Pressable>
  );
}

export function SettingsRow({ label, icon, expanded, onPress, children }: SettingsRowProps) {
  return (
    <View style={styles.settingsRowWrap}>
      <Pressable onPress={onPress} style={styles.settingsRowTop}>
        <Text style={styles.settingsIcon}>{icon}</Text>
        <Text style={[styles.settingsText, expanded && styles.settingsTextActive]}>{label}</Text>
        <Text style={styles.settingsChevron}>{expanded ? '^' : 'v'}</Text>
      </Pressable>
      {expanded ? <View style={styles.settingsExpanded}>{children}</View> : null}
    </View>
  );
}

export function ToggleRow({ title, subtitle, value, onToggle }: ToggleRowProps) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleTextWrap}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleSubtitle}>{subtitle}</Text>
      </View>

      <Pressable
        onPress={() => onToggle(!value)}
        style={[styles.toggle, value && styles.toggleActive]}
      >
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </Pressable>
    </View>
  );
}

export function CheckboxRow({ label, value, onChange }: CheckboxRowProps) {
  return (
    <Pressable onPress={() => onChange(!value)} style={styles.checkboxRow}>
      <View style={[styles.checkbox, value && styles.checkboxActive]}>
        {value ? <Text style={styles.checkboxMark}>x</Text> : null}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

export function NotificationRow({ actorName, actorColor, message, timeLabel }: NotificationRowProps) {
  return (
    <View style={styles.notificationRow}>
      <View style={[styles.notificationAvatar, { backgroundColor: actorColor }]}>
        <Text style={styles.avatarInitial}>{actorName.charAt(0)}</Text>
      </View>

      <View style={styles.notificationTextWrap}>
        <Text style={styles.notificationMessage}>
          <Text style={styles.notificationActor}>{actorName} </Text>
          {message}
        </Text>
        <Text style={styles.notificationTime}>{timeLabel}</Text>
      </View>
    </View>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaStat}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

function Tag({ text, tone }: { text: string; tone: 'pending' | 'approved' | 'rejected' | 'muted' | 'calendar' }) {
  const toneStyles: Record<typeof tone, { bg: string; fg: string }> = {
    pending: { bg: '#ffe9c2', fg: colors.warning },
    approved: { bg: '#dcf6e8', fg: colors.success },
    rejected: { bg: '#fde1e1', fg: colors.danger },
    muted: { bg: '#edf2f8', fg: colors.textMuted },
    calendar: { bg: '#f1f4f8', fg: colors.textMuted },
  };

  return (
    <View style={[styles.tag, { backgroundColor: toneStyles[tone].bg }]}>
      <Text style={[styles.tagText, { color: toneStyles[tone].fg }]}>{text}</Text>
    </View>
  );
}

function TopIconButton({
  label,
  onPress,
  avatar,
}: {
  label: string;
  onPress?: () => void;
  avatar?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.topIconButton, avatar && styles.avatarTopButton]}>
      <Text style={[styles.topIconText, avatar && styles.avatarTopText]}>{label}</Text>
    </Pressable>
  );
}

function capitalize(value: string): string {
  if (!value) {
    return value;
  }

  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
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
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  topIconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f6fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTopButton: {
    backgroundColor: '#f2eecf',
  },
  topIconText: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 11,
  },
  avatarTopText: {
    color: '#9e8f65',
  },
  backLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '700',
  },
  surfaceCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  profileHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileAvatarOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f5e7c8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7a6641',
  },
  squareActionButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareActionText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  profileName: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  profileRole: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  fieldWrap: {
    gap: spacing.xs,
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  fieldShell: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 38,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  fieldValue: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  fieldIcon: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  tabsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    minHeight: 32,
    borderRadius: 16,
    backgroundColor: '#ecf1f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  activeTabText: {
    color: colors.surface,
  },
  codeText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  projectName: {
    color: colors.textPrimary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  projectMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaStat: {
    gap: 2,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  assigneesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#1a2530',
    fontSize: 10,
    fontWeight: '700',
  },
  projectStatus: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  teamAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
  },
  teamRole: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  teamMeta: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
  requestTypeLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  requestTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  requestBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  requestPeriod: {
    color: colors.textSecondary,
    fontSize: 12,
    flex: 1,
    fontWeight: '500',
  },
  requestDuration: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  fabText: {
    color: colors.surface,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '700',
    marginTop: -1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
    maxHeight: '94%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '700',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eef3f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  groupWrap: {
    gap: spacing.sm,
  },
  groupLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  radioText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  modeSwitch: {
    flexDirection: 'row',
    borderRadius: 18,
    backgroundColor: '#dde6f0',
    padding: 2,
  },
  modeButton: {
    flex: 1,
    minHeight: 34,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
  },
  modeButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: colors.surface,
  },
  calendarWrap: {
    gap: spacing.sm,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  calendarTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  weekLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  dayCell: {
    width: '18.4%',
    minHeight: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: colors.teal,
  },
  dayText: {
    color: '#55638a',
    fontSize: 14,
    fontWeight: '600',
  },
  dayTextFaded: {
    opacity: 0.4,
  },
  dayTextSelected: {
    color: colors.surface,
  },
  errorBubble: {
    borderRadius: 16,
    backgroundColor: '#fde9ee',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  errorBubbleText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  commentFieldShell: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 82,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  commentInput: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    minHeight: 64,
    textAlignVertical: 'top',
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  settingsRowWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  settingsRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsIcon: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    width: 16,
  },
  settingsText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  settingsTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  settingsChevron: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  settingsExpanded: {
    gap: spacing.sm,
    marginLeft: spacing.xxl,
  },
  toggleRow: {
    borderRadius: radii.md,
    backgroundColor: '#f2f6fb',
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  toggleTextWrap: {
    flex: 1,
    gap: 2,
  },
  toggleTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  toggleSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#cfd8e4',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    borderColor: colors.primary,
    backgroundColor: '#e9f2ff',
  },
  checkboxMark: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  checkboxLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  notificationRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
  },
  notificationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTextWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  notificationMessage: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
  },
  notificationActor: {
    fontWeight: '700',
  },
  notificationTime: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  fieldError: {
    borderColor: colors.danger,
  },
  fieldErrorText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '600',
  },
});
