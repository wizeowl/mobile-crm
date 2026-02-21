import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FloatingActionButton, ProjectsLayout, TopAppBar } from '../../projects/components/ProjectsPrimitives';
import {
  AttachmentRow,
  InfoSectionCard,
  MemberPickerModal,
  PortalFolderCard,
  PortalKpiCard,
  ShareFolderModal,
  TaskSelectorCard,
} from '../components/InfoPortalPrimitives';
import { InfoPortalFolder, InfoPortalMember } from '../types';
import { colors, spacing } from '../../../theme/tokens';

interface InfoPortalHomeScreenProps {
  currentProjectsCount: number;
  growthAmount: number;
  folders: InfoPortalFolder[];
  onOpenFolder: (folderId: string) => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenCreate: () => void;
}

interface InfoPortalFolderScreenProps {
  folder: InfoPortalFolder;
  onBack: () => void;
  onOpenShare: () => void;
  onOpenEdit: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenCreate: () => void;
}

interface ShareFolderOverlayProps {
  visible: boolean;
  selectedLabels: string[];
  errors: string[];
  loading: boolean;
  members: InfoPortalMember[];
  memberPickerVisible: boolean;
  onClose: () => void;
  onOpenMemberPicker: (index: number) => void;
  onAddMemberRow: () => void;
  onShare: () => void;
  onCloseMemberPicker: () => void;
  onSelectMember: (memberId: string) => void;
}

export function InfoPortalHomeScreen({
  currentProjectsCount,
  growthAmount,
  folders,
  onOpenFolder,
  onOpenMessenger,
  onOpenProfile,
  onOpenNotifications,
  onOpenCreate,
}: InfoPortalHomeScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenNotifications} onProfile={onOpenProfile} />
      <Text style={styles.pageTitle}>Info Portal</Text>

      <PortalKpiCard currentProjectsCount={currentProjectsCount} growthAmount={growthAmount} />

      <View style={styles.stack}>
        {folders.map((folder) => (
          <PortalFolderCard
            key={folder.id}
            name={folder.name}
            pageCount={folder.pageCount}
            tone={folder.colorTone}
            onPress={() => onOpenFolder(folder.id)}
          />
        ))}
      </View>

      <FloatingActionButton onPress={onOpenCreate} />
    </ProjectsLayout>
  );
}

export function InfoPortalFolderScreen({
  folder,
  onBack,
  onOpenShare,
  onOpenEdit,
  onOpenMessenger,
  onOpenProfile,
  onOpenNotifications,
  onOpenCreate,
}: InfoPortalFolderScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenNotifications} onProfile={onOpenProfile} />

      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>{'<- Back to Info Portal'}</Text>
      </Pressable>

      <Text style={styles.folderTitle}>{folder.name}</Text>

      <TaskSelectorCard label={folder.taskTitle} subtitle={folder.lastModified} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{folder.taskTitle}</Text>
        <View style={styles.sectionHeaderActions}>
          <Pressable onPress={onOpenEdit} style={styles.squareIconButton}>
            <Text style={styles.squareIconText}>E</Text>
          </Pressable>
          <Pressable onPress={onOpenShare} style={styles.squareIconButton}>
            <Text style={styles.squareIconText}>S</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.stack}>
        {folder.sections.map((section) => (
          <InfoSectionCard key={section.id} title={section.title} body={section.body} />
        ))}
      </View>

      <View style={styles.stack}>
        {folder.attachments.map((attachment) => (
          <AttachmentRow key={attachment.id} name={attachment.name} meta={attachment.meta} />
        ))}
      </View>

      <FloatingActionButton onPress={onOpenCreate} />
    </ProjectsLayout>
  );
}

export function ShareFolderOverlay({
  visible,
  selectedLabels,
  errors,
  loading,
  members,
  memberPickerVisible,
  onClose,
  onOpenMemberPicker,
  onAddMemberRow,
  onShare,
  onCloseMemberPicker,
  onSelectMember,
}: ShareFolderOverlayProps) {
  return (
    <>
      <ShareFolderModal
        visible={visible}
        selectedLabels={selectedLabels}
        errors={errors}
        loading={loading}
        onClose={onClose}
        onOpenMemberPicker={onOpenMemberPicker}
        onAddRow={onAddMemberRow}
        onShare={onShare}
      />
      <MemberPickerModal
        visible={memberPickerVisible}
        members={members}
        onClose={onCloseMemberPicker}
        onSelect={onSelectMember}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 50,
    lineHeight: 56,
    fontWeight: '700',
  },
  stack: {
    gap: spacing.md,
  },
  backLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  folderTitle: {
    color: colors.textPrimary,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
  },
  sectionHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  squareIconButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#eef3f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareIconText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
});
