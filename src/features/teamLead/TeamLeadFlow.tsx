import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import { TaskStatus } from '../projects/types';
import { ClaimTaskConfirmModal, TaskStatusSheet } from './components/TeamLeadPrimitives';
import { teamLeadStatusOptions } from './data/teamLeadDummyData';
import { TeamLeadTaskDetailsScreen } from './screens/TeamLeadScreens';
import {
  approveTaskClaimDummy,
  fetchTeamLeadSnapshot,
  updateTaskStatusForReviewDummy,
} from './services/teamLeadService';
import { TeamLeadSnapshot } from './types';
import { validateStatusSelection } from './validation';

interface TeamLeadFlowProps {
  onBackToProjects: () => void;
  onOpenProfile: () => void;
  onOpenMessenger: () => void;
}

export function TeamLeadFlow({ onBackToProjects, onOpenProfile, onOpenMessenger }: TeamLeadFlowProps) {
  const [snapshot, setSnapshot] = useState<TeamLeadSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const [statusSheetOpen, setStatusSheetOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('in-review');
  const [statusError, setStatusError] = useState<string | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);
  const [approvingTask, setApprovingTask] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchTeamLeadSnapshot();
        setSnapshot(response);
        setSelectedStatus(response.task.status);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const memberMap = useMemo(
    () =>
      (snapshot?.members ?? []).reduce<Record<string, TeamLeadSnapshot['members'][number]>>(
        (acc, member) => {
          acc[member.id] = member;
          return acc;
        },
        {},
      ),
    [snapshot?.members],
  );

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading team lead review...</Text>;
  }

  if (!snapshot) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Team lead data is unavailable.</Text>;
  }

  const task = snapshot.task;
  const reporter = memberMap[task.reporterId] ?? snapshot.members[0];
  const assignee = memberMap[task.assigneeId] ?? snapshot.members[0];
  const activityMembers = task.activities.map((activity) => memberMap[activity.userId]).filter(Boolean);

  const applyStatus = async (nextStatus: TaskStatus) => {
    try {
      setSavingStatus(true);
      await updateTaskStatusForReviewDummy(task.id, nextStatus);

      setSnapshot((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          task: {
            ...prev.task,
            status: nextStatus,
            activities: [
              {
                id: `tl-ac-${Date.now()}`,
                userId: prev.task.assigneeId,
                title: `Updated task status to ${statusLabel(nextStatus)}`,
                subtitle: 'Team lead review update',
              },
              ...prev.task.activities,
            ],
          },
        };
      });

      setSelectedStatus(nextStatus);
      setStatusSheetOpen(false);
      setStatusError(null);
    } finally {
      setSavingStatus(false);
    }
  };

  const approveStatus = async () => {
    const validationError = validateStatusSelection(selectedStatus);
    setStatusError(validationError);

    if (validationError) {
      return;
    }

    if (selectedStatus === 'done') {
      setStatusSheetOpen(false);
      setClaimModalOpen(true);
      return;
    }

    await applyStatus(selectedStatus);
  };

  const approveClaim = async () => {
    try {
      setApprovingTask(true);
      await approveTaskClaimDummy(task.id);
      setClaimModalOpen(false);
      await applyStatus('done');
      Alert.alert('Task approved', 'Task moved to Completed in dummy mode.');
    } finally {
      setApprovingTask(false);
    }
  };

  return (
    <>
      <TeamLeadTaskDetailsScreen
        task={task}
        reporter={reporter}
        assignee={assignee}
        activities={activityMembers}
        onBack={onBackToProjects}
        onOpenStatusSheet={() => {
          setSelectedStatus(task.status);
          setStatusError(null);
          setStatusSheetOpen(true);
        }}
        onOpenTimeTracking={() => {
          Alert.alert('Time tracking', 'Time log modal is available in the projects flow.');
        }}
        onOpenProfile={onOpenProfile}
        onOpenMessenger={onOpenMessenger}
      />

      <TaskStatusSheet
        visible={statusSheetOpen}
        selectedStatus={selectedStatus}
        statusOptions={teamLeadStatusOptions}
        error={statusError}
        saving={savingStatus}
        onSelect={(value) => {
          setSelectedStatus(value);
          setStatusError(null);
        }}
        onApprove={() => {
          void approveStatus();
        }}
        onClose={() => setStatusSheetOpen(false)}
      />

      <ClaimTaskConfirmModal
        visible={claimModalOpen}
        loading={approvingTask}
        onApprove={() => {
          void approveClaim();
        }}
        onClose={() => setClaimModalOpen(false)}
      />
    </>
  );
}

function statusLabel(status: TaskStatus): string {
  if (status === 'to-do') {
    return 'To Do';
  }

  if (status === 'in-progress') {
    return 'In Progress';
  }

  if (status === 'in-review') {
    return 'In Review';
  }

  return 'Done';
}
