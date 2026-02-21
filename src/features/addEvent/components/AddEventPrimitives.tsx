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
import { RepeatCadence } from '../types';

interface EventFormModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

interface EventFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onPress?: () => void;
  rightText?: string;
  multiline?: boolean;
  error?: string;
}

interface EventRepeatSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

interface RepeatCadenceTabsProps {
  value: RepeatCadence;
  onChange: (value: RepeatCadence) => void;
}

interface WeekdayChipGroupProps {
  days: string[];
  selectedDays: string[];
  onToggle: (day: string) => void;
  error?: string;
}

interface CheckboxRowProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

interface PrimaryButtonProps {
  label: string;
  loading?: boolean;
  onPress: () => void;
}

interface OptionPickerProps {
  visible: boolean;
  title: string;
  options: Array<{ label: string; value: string }>;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export function EventFormModal({ visible, title, onClose, children }: EventFormModalProps) {
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

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentWrap}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function EventField({
  label,
  value,
  placeholder,
  onChangeText,
  onPress,
  rightText,
  multiline,
  error,
}: EventFieldProps) {
  const isPressable = Boolean(onPress);

  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>

      {isPressable ? (
        <Pressable onPress={onPress} style={[styles.fieldShell, multiline && styles.multilineShell, error && styles.fieldError]}>
          <Text style={[styles.fieldValue, !value && styles.placeholder]}>{value || placeholder || ''}</Text>
          {rightText ? <Text style={styles.fieldRight}>{rightText}</Text> : null}
        </Pressable>
      ) : (
        <View style={[styles.fieldShell, multiline && styles.multilineShell, error && styles.fieldError]}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            multiline={multiline}
            style={[styles.input, multiline && styles.inputMultiline]}
          />
          {rightText ? <Text style={styles.fieldRight}>{rightText}</Text> : null}
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function EventRepeatSwitch({ value, onChange }: EventRepeatSwitchProps) {
  return (
    <View style={styles.repeatWrap}>
      <Text style={styles.repeatLabel}>Repeat Event</Text>
      <Pressable onPress={() => onChange(!value)} style={[styles.switchTrack, value && styles.switchTrackActive]}>
        <View style={[styles.switchThumb, value && styles.switchThumbActive]} />
      </Pressable>
    </View>
  );
}

export function RepeatCadenceTabs({ value, onChange }: RepeatCadenceTabsProps) {
  const options: Array<{ label: string; value: RepeatCadence }> = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  return (
    <View style={styles.cadenceWrap}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.cadenceButton, active && styles.cadenceButtonActive]}
          >
            <Text style={[styles.cadenceText, active && styles.cadenceTextActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function WeekdayChipGroup({ days, selectedDays, onToggle, error }: WeekdayChipGroupProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>On these days</Text>
      <View style={styles.daysWrap}>
        {days.map((day) => {
          const selected = selectedDays.includes(day);

          return (
            <Pressable
              key={day}
              onPress={() => onToggle(day)}
              style={[styles.dayChip, selected && styles.dayChipActive]}
            >
              <Text style={[styles.dayText, selected && styles.dayTextActive]}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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

export function PrimaryButton({ label, loading, onPress }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>{loading ? 'Saving...' : label}</Text>
    </Pressable>
  );
}

export function EventOptionPicker({ visible, title, options, onClose, onSelect }: OptionPickerProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.pickerOverlay} onPress={onClose}>
        <Pressable style={styles.pickerCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.pickerCloseButton}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <View style={styles.pickerOptionsWrap}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                style={styles.pickerOptionRow}
              >
                <Text style={styles.pickerOptionText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
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
    fontSize: 28,
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
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  multilineShell: {
    minHeight: 92,
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
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 74,
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
  fieldRight: {
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
  repeatWrap: {
    marginTop: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: '#eef3f9',
    paddingHorizontal: spacing.md,
    minHeight: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repeatLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  switchTrack: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#cfd8e4',
    padding: 2,
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: colors.primary,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  cadenceWrap: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cadenceButton: {
    flex: 1,
    minHeight: 36,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  cadenceButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cadenceText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  cadenceTextActive: {
    color: colors.surface,
  },
  daysWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  dayChip: {
    minWidth: 40,
    minHeight: 30,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  dayChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  dayTextActive: {
    color: colors.surface,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    borderColor: colors.primary,
    backgroundColor: '#eaf2ff',
  },
  checkboxMark: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '700',
  },
  checkboxLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
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
    fontSize: 18,
    fontWeight: '700',
  },
  pickerCloseButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerOptionsWrap: {
    gap: spacing.sm,
  },
  pickerOptionRow: {
    minHeight: 40,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  pickerOptionText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});
