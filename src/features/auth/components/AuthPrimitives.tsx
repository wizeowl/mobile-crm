import { ReactNode, useMemo, useRef, useState } from 'react';
import {
  Image,
  KeyboardTypeOptions,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../../../theme/tokens';
import { Option, YesNoValue } from '../types';

interface AuthLayoutProps {
  children: ReactNode;
  footer?: ReactNode;
}

interface AuthTextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  rightAccessory?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

interface SelectFieldProps {
  label: string;
  placeholder: string;
  value: string | null;
  options: Option[];
  onSelect: (value: string) => void;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface OtpFieldProps {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  error?: string;
}

interface ChoiceChipGridProps {
  label: string;
  options: Option[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  error?: string;
}

interface RadioGroupProps {
  label: string;
  value: YesNoValue;
  onChange: (value: YesNoValue) => void;
  error?: string;
}

interface StepFooterProps {
  onNext: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  loading?: boolean;
}

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface TextButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const logoImage = require('../../../../assets/icon.png');

export function AuthLayout({ children, footer }: AuthLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader />
        <View style={styles.content}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

export function BrandHeader() {
  return (
    <View style={styles.brandHeader}>
      <View style={styles.brandRow}>
        <Image source={logoImage} style={styles.brandImage} resizeMode="contain" />
        <Text style={styles.brandText}>Workroom</Text>
      </View>
    </View>
  );
}

export function AuthCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function StepLabel({ step }: { step: string }) {
  return <Text style={styles.stepLabel}>{step}</Text>;
}

export function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export function AuthTextField({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  keyboardType = 'default',
  secureTextEntry,
  autoCapitalize = 'none',
  rightAccessory,
  containerStyle,
}: AuthTextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputShell, focused && styles.inputFocused, error && styles.inputError]}>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          style={styles.input}
          autoCorrect={false}
        />
        {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function PasswordField({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  containerStyle,
}: Omit<AuthTextFieldProps, 'secureTextEntry' | 'rightAccessory'>) {
  const [secure, setSecure] = useState(true);

  return (
    <AuthTextField
      label={label}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      error={error}
      secureTextEntry={secure}
      autoCapitalize="none"
      containerStyle={containerStyle}
      rightAccessory={
        <Pressable onPress={() => setSecure((prev) => !prev)} hitSlop={8}>
          <Text style={styles.toggleText}>{secure ? 'Show' : 'Hide'}</Text>
        </Pressable>
      }
    />
  );
}

export function SelectField({
  label,
  placeholder,
  value,
  options,
  onSelect,
  error,
  containerStyle,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  );

  return (
    <View style={[styles.fieldContainer, containerStyle]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.selectShell,
          error && styles.inputError,
          pressed && styles.selectPressed,
        ]}
      >
        <Text style={[styles.selectValue, !selectedOption && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={styles.chevron}>v</Text>
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalTitle}>{label}</Text>
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onSelect(option.value);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.optionRow,
                    selected && styles.optionRowSelected,
                    pressed && styles.optionRowPressed,
                  ]}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export function OtpField({ label, value, onChange, error }: OtpFieldProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const setDigit = (index: number, raw: string) => {
    const cleanDigit = raw.replace(/[^0-9]/g, '').slice(-1);
    const next = [...value];
    next[index] = cleanDigit;
    onChange(next);

    if (cleanDigit && index < next.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.otpRow}>
        {value.map((digit, index) => (
          <View key={`digit-${index}`} style={styles.otpBox}>
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => setDigit(index, text)}
              maxLength={1}
              style={styles.otpInput}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
            />
          </View>
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function ChoiceChipGrid({
  label,
  options,
  selectedValue,
  onSelect,
  error,
}: ChoiceChipGridProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.chipGrid}>
        {options.map((option) => {
          const selected = selectedValue === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && !selected && styles.chipPressed,
              ]}
            >
              <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function RadioGroup({ label, value, onChange, error }: RadioGroupProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.radioRow}>
        {(['yes', 'no'] as const).map((choice) => {
          const selected = value === choice;

          return (
            <Pressable
              key={choice}
              onPress={() => onChange(choice)}
              style={styles.radioOption}
              hitSlop={4}
            >
              <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                {selected ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.radioText}>{choice === 'yes' ? 'Yes' : 'No'}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function InfoPanel({ children }: { children: ReactNode }) {
  return <View style={styles.infoPanel}>{children}</View>;
}

export function StepFooter({
  onNext,
  onPrevious,
  nextLabel = 'Next Step',
  loading,
}: StepFooterProps) {
  return (
    <View style={styles.stepFooter}>
      <View style={styles.previousSlot}>
        {onPrevious ? <TextButton label="<- Previous" onPress={onPrevious} /> : null}
      </View>
      <PrimaryButton label={nextLabel} onPress={onNext} loading={loading} />
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  style,
}: PrimaryButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.primaryButton,
        shadows.button,
        (pressed || isDisabled) && styles.primaryButtonPressed,
        isDisabled && styles.primaryButtonDisabled,
        style,
      ]}
    >
      <Text style={styles.primaryButtonText}>{loading ? 'Please wait...' : `${label}  ->`}</Text>
    </Pressable>
  );
}

export function TextButton({ label, onPress, style }: TextButtonProps) {
  return (
    <Pressable onPress={onPress} style={style}>
      {({ pressed }) => <Text style={[styles.textButton, pressed && styles.textButtonPressed]}>{label}</Text>}
    </Pressable>
  );
}

export function Checkbox({ label, value, onChange }: CheckboxProps) {
  return (
    <Pressable onPress={() => onChange(!value)} style={styles.checkboxRow}>
      <View style={[styles.checkboxBox, value && styles.checkboxBoxChecked]}>
        {value ? <Text style={styles.checkboxMark}>x</Text> : null}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: 56,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 360,
    gap: spacing.xl,
  },
  footer: {
    width: '100%',
    maxWidth: 360,
    marginTop: spacing.lg,
  },
  brandHeader: {
    marginBottom: spacing.xxl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  brandImage: {
    width: 36,
    height: 36,
  },
  brandText: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    gap: spacing.lg,
  },
  stepLabel: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 23,
  },
  sectionTitle: {
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: typography.sectionTitle.fontSize,
    fontWeight: typography.sectionTitle.fontWeight,
  },
  fieldContainer: {
    gap: spacing.sm,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
  },
  inputShell: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: spacing.md,
  },
  accessory: {
    marginLeft: spacing.sm,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.danger,
  },
  toggleText: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
  selectShell: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectPressed: {
    borderColor: colors.primary,
  },
  selectValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textMuted,
  },
  chevron: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.34)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  optionRow: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  optionRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.infoSurface,
  },
  optionRowPressed: {
    opacity: 0.75,
  },
  optionText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.primary,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  otpBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: '100%',
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: spacing.md,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  chip: {
    flexBasis: '30%',
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.75,
  },
  chipLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  chipLabelSelected: {
    color: colors.surface,
  },
  radioRow: {
    flexDirection: 'row',
    gap: spacing.xxxl,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  infoPanel: {
    backgroundColor: colors.infoSurface,
    borderRadius: radii.md,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  stepFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  previousSlot: {
    flex: 1,
    alignItems: 'flex-start',
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  textButton: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  textButtonPressed: {
    opacity: 0.75,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  checkboxBoxChecked: {
    backgroundColor: colors.infoSurface,
  },
  checkboxMark: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  checkboxLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
});
