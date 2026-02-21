import { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors, radii, shadows, spacing } from '../../../theme/tokens';

interface FormModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

interface ProjectFormFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onPress?: () => void;
  rightText?: string;
  multiline?: boolean;
  error?: string;
}

interface AvatarPresetGridProps {
  presets: string[];
  selectedPreset: string | null;
  onSelect: (preset: string) => void;
}

interface ProjectQuickActionsProps {
  onAttach?: () => void;
  onLink?: () => void;
}

interface PrimaryButtonProps {
  label: string;
  loading?: boolean;
  onPress: () => void;
}

interface OptionModalProps {
  visible: boolean;
  title: string;
  options: Array<{ label: string; value: string }>;
  onClose: () => void;
  onSelect: (value: string) => void;
}

interface EmptyProjectStateProps {
  projectName: string;
  onOpenAddTask: () => void;
}

export function FormModal({ visible, title, onClose, children }: FormModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.contentWrap} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function ProjectFormField({
  label,
  value,
  placeholder,
  onChangeText,
  onPress,
  rightText,
  multiline,
  error,
}: ProjectFormFieldProps) {
  const pressable = Boolean(onPress);

  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>

      {pressable ? (
        <Pressable onPress={onPress} style={[styles.fieldShell, multiline && styles.multilineShell, error && styles.fieldError]}>
          <Text style={[styles.fieldValue, !value && styles.placeholder]}>{value || placeholder || ''}</Text>
          {rightText ? <Text style={styles.fieldRightText}>{rightText}</Text> : null}
        </Pressable>
      ) : (
        <View style={[styles.fieldShell, multiline && styles.multilineShell, error && styles.fieldError]}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            multiline={multiline}
            style={[styles.input, multiline && styles.multilineInput]}
          />
          {rightText ? <Text style={styles.fieldRightText}>{rightText}</Text> : null}
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function AvatarPresetGrid({ presets, selectedPreset, onSelect }: AvatarPresetGridProps) {
  return (
    <View style={styles.avatarCard}>
      <Text style={styles.avatarTitle}>Select image</Text>
      <Text style={styles.avatarSubtitle}>Select or upload an avatar for the project</Text>
      <View style={styles.avatarGrid}>
        {presets.map((preset, index) => {
          const selected = selectedPreset === preset;
          return (
            <Pressable
              key={preset}
              onPress={() => onSelect(preset)}
              style={[styles.presetItem, selected && styles.presetItemSelected]}
            >
              <View style={[styles.presetDot, { backgroundColor: presetColor(index) }]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function ProjectQuickActions({ onAttach, onLink }: ProjectQuickActionsProps) {
  return (
    <View style={styles.quickActionsRow}>
      <QuickActionButton label="A" onPress={onAttach} />
      <QuickActionButton label="L" onPress={onLink} />
    </View>
  );
}

export function PrimaryButton({ label, loading, onPress }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{loading ? 'Saving...' : label}</Text>
    </Pressable>
  );
}

export function OptionModal({ visible, title, options, onClose, onSelect }: OptionModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.optionOverlay} onPress={onClose}>
        <Pressable style={styles.optionCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.optionCloseButton}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <View style={styles.optionList}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                style={styles.optionRow}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function EmptyProjectState({ projectName, onOpenAddTask }: EmptyProjectStateProps) {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIllustration}>
        <Text style={styles.emptyIllustrationText}>No Tasks</Text>
      </View>

      <Text style={styles.emptyTitle}>There are no tasks in this project yet</Text>
      <Text style={styles.emptySubtitle}>Let's add them</Text>

      <Pressable onPress={onOpenAddTask} style={styles.emptyActionHint}>
        <Text style={styles.emptyActionHintText}>Tap + to add your first task</Text>
      </Pressable>
    </View>
  );
}

function QuickActionButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.quickActionButton}>
      <Text style={styles.quickActionText}>{label}</Text>
    </Pressable>
  );
}

function presetColor(index: number): string {
  const palette = [
    '#f27ea8',
    '#ffd36e',
    '#6cd3e7',
    '#7a74e8',
    '#5fa8f5',
    '#8d7de8',
    '#42bad1',
    '#49c067',
    '#dca2f1',
    '#f0c46f',
    '#f57f86',
    '#7fa8ff',
  ];

  return palette[index % palette.length];
}

const styles = StyleSheet.create({
  overlay: {
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
    maxHeight: '95%',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '700',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  contentWrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
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
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  multilineShell: {
    minHeight: 94,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: spacing.sm,
  },
  multilineInput: {
    minHeight: 74,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  fieldValue: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  placeholder: {
    color: colors.textMuted,
  },
  fieldRightText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  fieldError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '600',
  },
  avatarCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f8fbff',
    padding: spacing.md,
    gap: spacing.sm,
  },
  avatarTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  avatarSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  presetItem: {
    width: '16%',
    minWidth: 36,
    minHeight: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e8f3',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  presetItemSelected: {
    borderColor: colors.primary,
    backgroundColor: '#e9f2ff',
  },
  presetDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  quickActionButton: {
    width: 38,
    height: 34,
    borderRadius: radii.sm,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    ...shadows.button,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  optionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.35)',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  optionCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  optionCloseButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionList: {
    gap: spacing.sm,
  },
  optionRow: {
    minHeight: 40,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxxl,
  },
  emptyIllustration: {
    width: 180,
    height: 120,
    borderRadius: radii.lg,
    backgroundColor: '#e9f2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIllustrationText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyActionHint: {
    marginTop: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: '#f3f7fd',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  emptyActionHintText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});
