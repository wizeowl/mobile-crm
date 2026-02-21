import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { TaskStatus } from '../../projects/types';
import { TeamLeadStatusOption } from '../types';
import { colors, radii, shadows, spacing } from '../../../theme/tokens';

interface TaskStatusSheetProps {
  visible: boolean;
  selectedStatus: TaskStatus;
  statusOptions: TeamLeadStatusOption[];
  error?: string | null;
  saving?: boolean;
  onSelect: (value: TaskStatus) => void;
  onApprove: () => void;
  onClose: () => void;
}

interface ClaimTaskConfirmModalProps {
  visible: boolean;
  loading?: boolean;
  onApprove: () => void;
  onClose: () => void;
}

export function TaskStatusSheet({
  visible,
  selectedStatus,
  statusOptions,
  error,
  saving,
  onSelect,
  onApprove,
  onClose,
}: TaskStatusSheetProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetOverlay} onPress={onClose}>
        <Pressable style={styles.sheetCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Select task status</Text>

          <View style={styles.sheetOptionsWrap}>
            {statusOptions.map((statusOption) => {
              const selected = statusOption.value === selectedStatus;

              return (
                <Pressable
                  key={statusOption.value}
                  style={styles.statusOption}
                  onPress={() => onSelect(statusOption.value)}
                >
                  <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
                    {selected ? <View style={styles.radioInner} /> : null}
                  </View>
                  <Text style={styles.statusOptionText}>{statusOption.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.approveButton} onPress={onApprove} disabled={saving}>
            <Text style={styles.approveButtonText}>{saving ? 'Please wait...' : 'Approve'}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function ClaimTaskConfirmModal({
  visible,
  loading,
  onApprove,
  onClose,
}: ClaimTaskConfirmModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Are you sure you are claiming this task?</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </Pressable>
          </View>

          <Text style={styles.modalBody}>
            The task will be moved to the Completed section and will be closed.
          </Text>

          <Pressable style={styles.approveButton} onPress={onApprove} disabled={loading}>
            <Text style={styles.approveButtonText}>{loading ? 'Please wait...' : 'Approve Task'}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 42, 55, 0.25)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 70,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d4dce8',
  },
  sheetTitle: {
    color: colors.textPrimary,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '700',
    textAlign: 'center',
  },
  sheetOptionsWrap: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  statusOptionText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '500',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '500',
  },
  approveButton: {
    borderRadius: radii.md,
    minHeight: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
  },
  approveButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 42, 55, 0.3)',
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: 130,
  },
  modalCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  modalTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 24,
    lineHeight: 30,
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
  modalBody: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
});
