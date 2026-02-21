import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { InfoPortalMember } from '../types';
import { colors, radii, shadows, spacing } from '../../../theme/tokens';

type FolderTone = 'yellow' | 'green' | 'blue' | 'purple';

interface PortalKpiCardProps {
  currentProjectsCount: number;
  growthAmount: number;
}

interface PortalFolderCardProps {
  name: string;
  pageCount: number;
  tone: FolderTone;
  onPress: () => void;
}

interface TaskSelectorCardProps {
  label: string;
  subtitle: string;
  onPress?: () => void;
}

interface InfoSectionCardProps {
  title: string;
  body: string;
}

interface AttachmentRowProps {
  name: string;
  meta: string;
}

interface ShareFolderModalProps {
  visible: boolean;
  selectedLabels: string[];
  errors: string[];
  loading: boolean;
  onClose: () => void;
  onOpenMemberPicker: (index: number) => void;
  onAddRow: () => void;
  onShare: () => void;
}

interface MemberPickerModalProps {
  visible: boolean;
  members: InfoPortalMember[];
  onClose: () => void;
  onSelect: (memberId: string) => void;
}

export function PortalKpiCard({ currentProjectsCount, growthAmount }: PortalKpiCardProps) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>Current Projects</Text>
      <Text style={styles.kpiNumber}>{currentProjectsCount}</Text>
      <Text style={styles.kpiGrowth}>{`Growth +${growthAmount}`}</Text>
      <Text style={styles.kpiFootnote}>Ongoing projects last month - 7</Text>
    </View>
  );
}

export function PortalFolderCard({ name, pageCount, tone, onPress }: PortalFolderCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.folderCard}>
      <FolderIcon tone={tone} />
      <Text style={styles.folderName}>{name}</Text>
      <Text style={styles.folderPages}>{`${pageCount} pages`}</Text>
    </Pressable>
  );
}

export function TaskSelectorCard({ label, subtitle, onPress }: TaskSelectorCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.taskSelectorCard}>
      <View>
        <Text style={styles.taskSelectorLabel}>{label}</Text>
        <Text style={styles.taskSelectorSub}>{subtitle}</Text>
      </View>
      <Text style={styles.taskSelectorChevron}>v</Text>
    </Pressable>
  );
}

export function InfoSectionCard({ title, body }: InfoSectionCardProps) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

export function AttachmentRow({ name, meta }: AttachmentRowProps) {
  return (
    <View style={styles.attachmentRow}>
      <View style={styles.attachmentLeft}>
        <View style={styles.attachmentIconWrap}>
          <Text style={styles.attachmentIconText}>A</Text>
        </View>
        <View>
          <Text style={styles.attachmentName}>{name}</Text>
          <Text style={styles.attachmentMeta}>{meta}</Text>
        </View>
      </View>
      <Text style={styles.attachmentMore}>...</Text>
    </View>
  );
}

export function ShareFolderModal({
  visible,
  selectedLabels,
  errors,
  loading,
  onClose,
  onOpenMemberPicker,
  onAddRow,
  onShare,
}: ShareFolderModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.modalHeaderRow}>
            <Text style={styles.modalTitle}>Share the Folder</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          {selectedLabels.map((value, index) => (
            <View key={`member-${index}`} style={styles.modalFieldWrap}>
              <Text style={styles.modalFieldLabel}>{index === 0 ? 'Select Member' : `Member ${index + 1}`}</Text>
              <Pressable
                onPress={() => onOpenMemberPicker(index)}
                style={[styles.modalSelectField, errors[index] ? styles.modalSelectFieldError : null]}
              >
                <Text style={styles.modalSelectText}>{value || 'memberemail@gmail.com'}</Text>
                <Text style={styles.modalSelectChevron}>v</Text>
              </Pressable>
              {errors[index] ? <Text style={styles.errorText}>{errors[index]}</Text> : null}
            </View>
          ))}

          <Pressable onPress={onAddRow} style={styles.addRowButton}>
            <Text style={styles.addRowText}>+ Add another Member</Text>
          </Pressable>

          <Pressable onPress={onShare} style={styles.shareButton} disabled={loading}>
            <Text style={styles.shareButtonText}>{loading ? 'Please wait...' : 'Share'}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function MemberPickerModal({ visible, members, onClose, onSelect }: MemberPickerModalProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetOverlay} onPress={onClose}>
        <Pressable style={styles.sheetCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Select Member</Text>
          <View style={styles.sheetOptionsWrap}>
            {members.map((member) => (
              <Pressable
                key={member.id}
                style={styles.sheetOption}
                onPress={() => {
                  onSelect(member.id);
                }}
              >
                <Text style={styles.sheetOptionName}>{member.name}</Text>
                <Text style={styles.sheetOptionEmail}>{member.email}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function FolderIcon({ tone }: { tone: FolderTone }) {
  const palette =
    tone === 'yellow'
      ? { dark: '#f2b93a', light: '#ffe088' }
      : tone === 'green'
      ? { dark: '#23c48e', light: '#7ce9be' }
      : tone === 'blue'
      ? { dark: '#22b6dd', light: '#89e3f3' }
      : { dark: '#6b5ad9', light: '#a8a1ed' };

  return (
    <View style={styles.folderIconWrap}>
      <View style={[styles.folderTab, { backgroundColor: palette.light }]} />
      <View style={[styles.folderBody, { backgroundColor: palette.dark }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  kpiCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: 2,
  },
  kpiLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  kpiNumber: {
    color: colors.textPrimary,
    fontSize: 56,
    lineHeight: 62,
    fontWeight: '700',
  },
  kpiGrowth: {
    color: colors.success,
    fontSize: 18,
    fontWeight: '700',
  },
  kpiFootnote: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  folderCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 138,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  folderIconWrap: {
    width: 34,
    height: 28,
    marginBottom: spacing.sm,
  },
  folderTab: {
    width: 16,
    height: 7,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginLeft: 2,
  },
  folderBody: {
    flex: 1,
    borderRadius: 6,
  },
  folderName: {
    color: colors.textPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  folderPages: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  taskSelectorCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 64,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskSelectorLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  taskSelectorSub: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  taskSelectorChevron: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.xs,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  sectionBody: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  attachmentRow: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 60,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  attachmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  attachmentIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#ece7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentIconText: {
    color: '#8a74f6',
    fontSize: 11,
    fontWeight: '700',
  },
  attachmentName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  attachmentMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  attachmentMore: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 42, 55, 0.3)',
    justifyContent: 'flex-start',
    paddingTop: 120,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '700',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  modalFieldWrap: {
    gap: 4,
  },
  modalFieldLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  modalSelectField: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  modalSelectFieldError: {
    borderColor: colors.danger,
  },
  modalSelectText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '500',
  },
  modalSelectChevron: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '500',
  },
  addRowButton: {
    alignSelf: 'flex-start',
    minHeight: 28,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  addRowText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
    borderRadius: radii.md,
    minHeight: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.button,
    marginTop: spacing.sm,
  },
  shareButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  sheetOverlay: {
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
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  sheetOptionsWrap: {
    gap: spacing.sm,
  },
  sheetOption: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 56,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    gap: 2,
  },
  sheetOptionName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  sheetOptionEmail: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
});
