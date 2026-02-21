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
import { TaskPriority, TaskStatus, TeamMember } from '../types';

const logoImage = require('../../../../assets/icon.png');

interface ProjectsLayoutProps {
  children: ReactNode;
}

interface TopAppBarProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}

interface ProjectPickerProps {
  projectName: string;
  onOpenProjects: () => void;
  onViewDetails: () => void;
  onOpenFilters?: () => void;
}

interface SectionPillProps {
  label: string;
}

interface AvatarStackProps {
  members: TeamMember[];
  maxVisible?: number;
}

interface PriorityLabelProps {
  priority: TaskPriority;
}

interface StatusBadgeProps {
  status: TaskStatus;
}

interface TaskCardProps {
  name: string;
  estimate: string;
  spentTime: string;
  assignee: TeamMember;
  priority: TaskPriority;
  status: TaskStatus;
  onPress: () => void;
}

interface FloatingActionButtonProps {
  onPress: () => void;
}

interface SideSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

interface SelectFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onPress: () => void;
  error?: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  error?: string;
  multiline?: boolean;
}

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

interface TagChipProps {
  label: string;
  onRemove?: () => void;
}

interface DetailRowProps {
  label: string;
  value: string;
}

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface ActivityRowProps {
  member: TeamMember;
  title: string;
  subtitle: string;
}

interface AttachmentPillProps {
  name: string;
  size: string;
}

export function ProjectsLayout({ children }: ProjectsLayoutProps) {
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

export function TopAppBar({ onSearch, onNotifications, onProfile }: TopAppBarProps) {
  return (
    <View style={styles.topBar}>
      <View style={styles.logoWrap}>
        <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
      </View>

      <View style={styles.topActions}>
        <IconButton label="S" onPress={onSearch} />
        <IconButton label="N" onPress={onNotifications} />
        <IconButton label="P" onPress={onProfile} />
      </View>
    </View>
  );
}

export function ProjectPicker({
  projectName,
  onOpenProjects,
  onViewDetails,
  onOpenFilters,
}: ProjectPickerProps) {
  return (
    <View style={styles.projectPickerWrap}>
      <Pressable onPress={onOpenProjects} style={styles.projectSelectCard}>
        <Text style={styles.projectSelectLabel}>Project</Text>
        <View style={styles.projectRow}>
          <Text numberOfLines={1} style={styles.projectNameText}>
            {projectName}
          </Text>
          <Text style={styles.chevron}>v</Text>
        </View>
        <Text style={styles.linkText} onPress={onViewDetails}>
          {'View details ->'}
        </Text>
      </Pressable>

      {onOpenFilters ? <IconButton label="F" onPress={onOpenFilters} outlined /> : null}
    </View>
  );
}

export function SectionPill({ label }: SectionPillProps) {
  return (
    <View style={styles.sectionPill}>
      <Text style={styles.sectionPillText}>{label}</Text>
    </View>
  );
}

export function AvatarStack({ members, maxVisible = 3 }: AvatarStackProps) {
  const visible = members.slice(0, maxVisible);
  const overflow = members.length - visible.length;

  return (
    <View style={styles.avatarStack}>
      {visible.map((member, index) => (
        <View
          key={member.id}
          style={[
            styles.avatar,
            { backgroundColor: member.avatarColor, marginLeft: index === 0 ? 0 : -10 },
          ]}
        >
          <Text style={styles.avatarInitial}>{member.name.charAt(0)}</Text>
        </View>
      ))}

      {overflow > 0 ? (
        <View style={[styles.avatar, styles.overflowAvatar, { marginLeft: -10 }]}>
          <Text style={styles.overflowText}>{`+${overflow}`}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function PriorityLabel({ priority }: PriorityLabelProps) {
  const map: Record<TaskPriority, { text: string; color: string }> = {
    high: { text: 'High', color: colors.danger },
    medium: { text: 'Medium', color: colors.warning },
    low: { text: 'Low', color: colors.success },
  };

  const value = map[priority];

  return (
    <View style={styles.priorityRow}>
      <Text style={[styles.priorityArrow, { color: value.color }]}>^</Text>
      <Text style={[styles.priorityText, { color: value.color }]}>{value.text}</Text>
    </View>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<TaskStatus, { label: string; textColor: string; background: string }> = {
    done: {
      label: 'Done',
      textColor: colors.success,
      background: '#dff5e9',
    },
    'in-progress': {
      label: 'In Progress',
      textColor: colors.primary,
      background: '#e8f1ff',
    },
    'in-review': {
      label: 'In Review',
      textColor: colors.lavender,
      background: '#efeaff',
    },
    'to-do': {
      label: 'To Do',
      textColor: colors.textMuted,
      background: '#f1f4f8',
    },
  };

  const value = map[status];

  return (
    <View style={[styles.statusBadge, { backgroundColor: value.background }]}> 
      <Text style={[styles.statusText, { color: value.textColor }]}>{value.label}</Text>
    </View>
  );
}

export function TaskCard({
  name,
  estimate,
  spentTime,
  assignee,
  priority,
  status,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskName} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.taskStatusDot} />
      </View>

      <View style={styles.taskMetaGrid}>
        <View style={styles.metaCell}>
          <Text style={styles.metaLabel}>Estimate</Text>
          <Text style={styles.metaValue}>{estimate}</Text>
        </View>

        <View style={styles.metaCell}>
          <Text style={styles.metaLabel}>Spent Time</Text>
          <Text style={styles.metaValue}>{spentTime}</Text>
        </View>

        <View style={styles.metaCell}>
          <Text style={styles.metaLabel}>Assignee</Text>
          <AvatarStack members={[assignee]} maxVisible={1} />
        </View>
      </View>

      <View style={styles.taskFooter}>
        <PriorityLabel priority={priority} />
        <StatusBadge status={status} />
      </View>
    </Pressable>
  );
}

export function SurfaceCard({ children }: { children: ReactNode }) {
  return <View style={styles.surfaceCard}>{children}</View>;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.fab}>
      <Text style={styles.fabText}>+</Text>
    </Pressable>
  );
}

export function SideSheet({ visible, title, onClose, children, footer }: SideSheetProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetOverlay} onPress={onClose}>
        <Pressable style={styles.sheetBody} onPress={(event) => event.stopPropagation()}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <IconButton label="x" onPress={onClose} />
          </View>

          <ScrollView
            style={styles.sheetScroll}
            contentContainerStyle={styles.sheetContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {footer ? <View style={styles.sheetFooter}>{footer}</View> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function SelectField({ label, value, placeholder, onPress, error }: SelectFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable onPress={onPress} style={[styles.fieldShell, error && styles.fieldError]}>
        <Text style={[styles.fieldValue, !value && styles.fieldPlaceholder]}>
          {value || placeholder || 'Select'}
        </Text>
        <Text style={styles.chevron}>v</Text>
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function InputField({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  multiline,
}: InputFieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldShell, multiline && styles.multiFieldShell, error && styles.fieldError]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          style={[styles.textInput, multiline && styles.multiTextInput]}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function SearchField({
  label,
  value,
  placeholder,
  onChangeText,
}: Omit<InputFieldProps, 'error' | 'multiline'>) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldShell}>
        <Text style={styles.searchIcon}>S</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

export function CheckboxItem({ label, checked, onToggle }: CheckboxItemProps) {
  return (
    <Pressable onPress={onToggle} style={styles.checkboxRow}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>{checked ? <Text>x</Text> : null}</View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

export function TagChip({ label, onRemove }: TagChipProps) {
  return (
    <View style={styles.tagChip}>
      <Text style={styles.tagChipText}>{label}</Text>
      {onRemove ? (
        <Pressable onPress={onRemove} hitSlop={6}>
          <Text style={styles.tagRemove}>x</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export function PrimaryButton({ label, onPress, loading, disabled }: PrimaryButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.primaryButton,
        shadows.button,
        (pressed || isDisabled) && styles.primaryButtonPressed,
      ]}
    >
      <Text style={styles.primaryButtonText}>{loading ? 'Saving...' : label}</Text>
    </Pressable>
  );
}

export function ActivityRow({ member, title, subtitle }: ActivityRowProps) {
  return (
    <View style={styles.activityRow}>
      <View style={[styles.avatar, { backgroundColor: member.avatarColor }]}> 
        <Text style={styles.avatarInitial}>{member.name.charAt(0)}</Text>
      </View>
      <View style={styles.activityTextWrap}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

export function AttachmentPill({ name, size }: AttachmentPillProps) {
  return (
    <View style={styles.attachmentPill}>
      <Text style={styles.attachmentName}>{name}</Text>
      <Text style={styles.attachmentSize}>{size}</Text>
    </View>
  );
}

function IconButton({
  label,
  onPress,
  outlined,
}: {
  label: string;
  onPress?: () => void;
  outlined?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        outlined && styles.outlinedIconButton,
        pressed && styles.iconButtonPressed,
      ]}
    >
      <Text style={styles.iconButtonText}>{label}</Text>
    </Pressable>
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
    paddingBottom: 84,
    gap: spacing.lg,
  },
  topBar: {
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f3f6fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedIconButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  iconButtonPressed: {
    opacity: 0.75,
  },
  iconButtonText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  projectPickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  projectSelectCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  projectSelectLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  projectNameText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  linkText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionPill: {
    borderRadius: radii.sm,
    backgroundColor: '#e9eef5',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  sectionPillText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#172230',
    fontSize: 11,
    fontWeight: '700',
  },
  overflowAvatar: {
    backgroundColor: colors.primary,
  },
  overflowText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: '700',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  priorityArrow: {
    fontSize: 14,
    fontWeight: '700',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  taskCard: {
    borderWidth: 1,
    borderColor: '#ecf0f5',
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  taskStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  taskMetaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaCell: {
    gap: 2,
    minWidth: 68,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  surfaceCard: {
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  fabText: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '700',
    marginTop: -2,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.35)',
    justifyContent: 'flex-end',
  },
  sheetBody: {
    width: '90%',
    maxHeight: '95%',
    alignSelf: 'flex-end',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderBottomLeftRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sheetHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  sheetFooter: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#edf1f6',
  },
  fieldWrap: {
    gap: spacing.xs,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  fieldShell: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
  },
  multiFieldShell: {
    minHeight: 110,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: spacing.sm,
  },
  fieldValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  fieldPlaceholder: {
    color: colors.textMuted,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: spacing.sm,
  },
  multiTextInput: {
    minHeight: 90,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  searchIcon: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginRight: spacing.xs,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: '#eaf2ff',
  },
  checkboxLabel: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },
  tagChip: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f5f8fc',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tagChipText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  tagRemove: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  detailRow: {
    gap: 2,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.75,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  activityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  activityTextWrap: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  activitySubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  attachmentPill: {
    borderWidth: 1,
    borderColor: '#e8edf4',
    borderRadius: radii.sm,
    backgroundColor: '#f8fbff',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 2,
  },
  attachmentName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  attachmentSize: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
});
