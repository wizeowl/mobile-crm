import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import { createEmptyShareFolderForm } from './data/infoPortalDummyData';
import {
  InfoPortalFolderScreen,
  InfoPortalHomeScreen,
  ShareFolderOverlay,
} from './screens/InfoPortalScreens';
import { fetchInfoPortalSnapshot, shareFolderDummy } from './services/infoPortalService';
import { InfoPortalSnapshot, ShareFolderFormState, ShareFolderValidationErrors } from './types';
import { hasShareFolderErrors, validateShareFolder } from './validation';

type InfoPortalView = 'home' | 'folder';

interface InfoPortalFlowProps {
  onOpenProfile: () => void;
  onOpenMessenger: () => void;
}

export function InfoPortalFlow({ onOpenProfile, onOpenMessenger }: InfoPortalFlowProps) {
  const [snapshot, setSnapshot] = useState<InfoPortalSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<InfoPortalView>('home');
  const [selectedFolderId, setSelectedFolderId] = useState('');

  const [shareOpen, setShareOpen] = useState(false);
  const [memberPickerOpen, setMemberPickerOpen] = useState(false);
  const [activeMemberRowIndex, setActiveMemberRowIndex] = useState<number | null>(null);

  const [shareForm, setShareForm] = useState<ShareFolderFormState>(createEmptyShareFolderForm);
  const [shareErrors, setShareErrors] = useState<ShareFolderValidationErrors>({ memberIds: [''] });
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchInfoPortalSnapshot();
        setSnapshot(response);
        setSelectedFolderId(response.folders[0]?.id ?? '');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const members = snapshot?.members ?? [];
  const folders = snapshot?.folders ?? [];

  const selectedFolder =
    folders.find((folder) => folder.id === selectedFolderId) ?? folders[0] ?? null;

  const selectedMemberLabels = shareForm.memberIds.map((memberId) => {
    if (!memberId) {
      return '';
    }

    const member = members.find((item) => item.id === memberId);
    return member?.email ?? '';
  });

  const selectedMemberIds = useMemo(
    () => shareForm.memberIds.filter((memberId): memberId is string => Boolean(memberId)),
    [shareForm.memberIds],
  );

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading info portal...</Text>;
  }

  if (!snapshot || !selectedFolder) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Info portal is unavailable.</Text>;
  }

  const openShare = () => {
    setShareForm(createEmptyShareFolderForm());
    setShareErrors({ memberIds: [''] });
    setActiveMemberRowIndex(null);
    setMemberPickerOpen(false);
    setShareOpen(true);
  };

  const closeShare = () => {
    setShareOpen(false);
    setMemberPickerOpen(false);
    setActiveMemberRowIndex(null);
  };

  const shareFolder = async () => {
    const errors = validateShareFolder(shareForm);
    setShareErrors(errors);

    if (hasShareFolderErrors(errors)) {
      return;
    }

    try {
      setSharing(true);
      await shareFolderDummy(selectedFolder.id, selectedMemberIds);
      closeShare();
      Alert.alert('Shared', 'Folder shared in dummy mode.');
    } finally {
      setSharing(false);
    }
  };

  return (
    <>
      {view === 'home' ? (
        <InfoPortalHomeScreen
          currentProjectsCount={snapshot.currentProjectsCount}
          growthAmount={snapshot.growthAmount}
          folders={folders}
          onOpenFolder={(folderId) => {
            setSelectedFolderId(folderId);
            setView('folder');
          }}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onOpenProfile}
          onOpenNotifications={() => {
            Alert.alert('Notifications', 'Notifications are available in profile settings.');
          }}
          onOpenCreate={() => {
            Alert.alert('Add folder', 'Creating folders is placeholder-only in dummy mode.');
          }}
        />
      ) : (
        <InfoPortalFolderScreen
          folder={selectedFolder}
          onBack={() => setView('home')}
          onOpenShare={openShare}
          onOpenEdit={() => {
            Alert.alert('Edit', 'Folder editing is placeholder-only in dummy mode.');
          }}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onOpenProfile}
          onOpenNotifications={() => {
            Alert.alert('Notifications', 'Notifications are available in profile settings.');
          }}
          onOpenCreate={() => {
            Alert.alert('Create', 'Adding portal content is placeholder-only in dummy mode.');
          }}
        />
      )}

      <ShareFolderOverlay
        visible={shareOpen}
        selectedLabels={selectedMemberLabels}
        errors={shareErrors.memberIds}
        loading={sharing}
        members={members}
        memberPickerVisible={memberPickerOpen}
        onClose={closeShare}
        onOpenMemberPicker={(index) => {
          setActiveMemberRowIndex(index);
          setMemberPickerOpen(true);
        }}
        onAddMemberRow={() => {
          setShareForm((prev) => ({ ...prev, memberIds: [...prev.memberIds, null] }));
          setShareErrors((prev) => ({ memberIds: [...prev.memberIds, ''] }));
        }}
        onShare={() => {
          void shareFolder();
        }}
        onCloseMemberPicker={() => {
          setMemberPickerOpen(false);
          setActiveMemberRowIndex(null);
        }}
        onSelectMember={(memberId) => {
          if (activeMemberRowIndex === null) {
            return;
          }

          setShareForm((prev) => {
            const next = [...prev.memberIds];
            next[activeMemberRowIndex] = memberId;
            return { ...prev, memberIds: next };
          });

          setShareErrors((prev) => {
            const next = [...prev.memberIds];
            next[activeMemberRowIndex] = '';
            return { memberIds: next };
          });

          setMemberPickerOpen(false);
          setActiveMemberRowIndex(null);
        }}
      />

    </>
  );
}
