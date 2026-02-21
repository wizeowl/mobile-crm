import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { FabActionItem, FabActionKey } from '../types';
import { colors, radii, spacing } from '../../../theme/tokens';

interface AddActionsSheetProps {
  visible: boolean;
  actions: FabActionItem[];
  onClose: () => void;
  onSelect: (key: FabActionKey) => void;
}

export function AddActionsSheet({ visible, actions, onClose, onSelect }: AddActionsSheetProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheetCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={styles.title}>Add...</Text>

          <View style={styles.listWrap}>
            {actions.map((action) => (
              <Pressable key={action.key} style={styles.actionRow} onPress={() => onSelect(action.key)}>
                <View style={styles.iconWrap}>
                  <Text style={styles.iconText}>{action.iconLabel}</Text>
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
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
    backgroundColor: 'rgba(31, 42, 55, 0.25)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    backgroundColor: colors.surface,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 72,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d6dee9',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 40,
    lineHeight: 44,
    textAlign: 'center',
    fontWeight: '700',
  },
  listWrap: {
    gap: spacing.sm,
  },
  actionRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#eef3f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  actionLabel: {
    color: colors.textSecondary,
    fontSize: 17,
    fontWeight: '500',
  },
});
