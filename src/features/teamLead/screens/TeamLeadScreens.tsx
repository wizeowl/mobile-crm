import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  ActivityRow,
  AttachmentPill,
  AvatarStack,
  FloatingActionButton,
  PriorityLabel,
  PrimaryButton,
  ProjectsLayout,
  SurfaceCard,
  TagChip,
  TopAppBar,
} from '../../projects/components/ProjectsPrimitives';
import { TeamLeadMember, TeamLeadTask } from '../types';
import { colors, radii, spacing } from '../../../theme/tokens';

interface TeamLeadTaskDetailsScreenProps {
  task: TeamLeadTask;
  reporter: TeamLeadMember;
  assignee: TeamLeadMember;
  activities: TeamLeadMember[];
  onBack: () => void;
  onOpenStatusSheet: () => void;
  onOpenTimeTracking: () => void;
  onOpenProfile: () => void;
  onOpenMessenger: () => void;
}

const statusLabelMap = {
  'to-do': 'To Do',
  'in-progress': 'In Progress',
  'in-review': 'In Review',
  done: 'Done',
} as const;

export function TeamLeadTaskDetailsScreen({
  task,
  reporter,
  assignee,
  activities,
  onBack,
  onOpenStatusSheet,
  onOpenTimeTracking,
  onOpenProfile,
  onOpenMessenger,
}: TeamLeadTaskDetailsScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onProfile={onOpenProfile} />

      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>{'<- Back to Projects'}</Text>
      </Pressable>

      <Text style={styles.pageTitle}>{task.name}</Text>

      <SurfaceCard>
        <Text style={styles.cardTitle}>Task Info</Text>

        <View style={styles.metaBlock}>
          <Text style={styles.blockLabel}>Reporter</Text>
          <View style={styles.memberRow}>
            <AvatarStack members={[toProjectMember(reporter)]} maxVisible={1} />
            <Text style={styles.memberName}>{reporter.name}</Text>
          </View>
        </View>

        <View style={styles.metaBlock}>
          <Text style={styles.blockLabel}>Assigned</Text>
          <View style={styles.memberRow}>
            <AvatarStack members={[toProjectMember(assignee)]} maxVisible={1} />
            <Text style={styles.memberName}>{assignee.name}</Text>
          </View>
        </View>

        <View style={styles.metaRowSplit}>
          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Priority</Text>
            <PriorityLabel priority={task.priority} />
          </View>

          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Dead Line</Text>
            <Text style={styles.metaValue}>{task.deadline}</Text>
          </View>
        </View>

        <View style={styles.timeSummaryCard}>
          <Text style={styles.summaryTitle}>{`${task.loggedTime} logged`}</Text>
          <Text style={styles.summarySub}>{`Original Estimate ${task.originalEstimate}`}</Text>
          <PrimaryButton label="Log time" onPress={onOpenTimeTracking} />
        </View>

        <Text style={styles.createdText}>{task.createdAt}</Text>
      </SurfaceCard>

      <SurfaceCard>
        <View style={styles.taskDetailsHeader}>
          <Pressable style={styles.statusPill} onPress={onOpenStatusSheet}>
            <Text style={styles.statusPillText}>{statusLabelMap[task.status]}</Text>
            <Text style={styles.statusPillChevron}>v</Text>
          </Pressable>

          <Pressable onPress={onOpenStatusSheet} style={styles.editIconButton}>
            <Text style={styles.editIconText}>E</Text>
          </Pressable>
        </View>

        <Text style={styles.blockLabel}>Task Number</Text>
        <Text style={styles.metaValue}>{task.taskNumber}</Text>

        <Text style={styles.blockLabel}>Description</Text>
        <Text style={styles.bodyText}>{task.description}</Text>

        <View style={styles.quickActionsRow}>
          <TagChip label="Attach" />
          <TagChip label="Link" />
        </View>

        <Text style={styles.blockLabel}>{`Task Attachments (${task.attachments.length})`}</Text>
        <View style={styles.attachmentsWrap}>
          {task.attachments.map((attachment) => (
            <AttachmentPill key={attachment.id} name={attachment.name} size={attachment.size} />
          ))}
        </View>

        <TagChip label="Vision Prototype" />
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        {task.activities.map((activity, index) => (
          <ActivityRow
            key={activity.id}
            member={toProjectMember(activities[index] ?? reporter)}
            title={activity.title}
            subtitle={activity.subtitle}
          />
        ))}
        <Pressable>
          <Text style={styles.linkPrimary}>View more</Text>
        </Pressable>
      </SurfaceCard>

      <FloatingActionButton onPress={onOpenStatusSheet} />
    </ProjectsLayout>
  );
}

function toProjectMember(member: TeamLeadMember): { id: string; name: string; avatarColor: string } {
  return {
    id: member.id,
    name: member.name,
    avatarColor: member.avatarColor,
  };
}

const styles = StyleSheet.create({
  backLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  metaBlock: {
    gap: 4,
  },
  blockLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  memberName: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  metaRowSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  metaValue: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  timeSummaryCard: {
    borderRadius: radii.md,
    backgroundColor: '#edf3fc',
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  summarySub: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  createdText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  taskDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusPill: {
    borderRadius: 10,
    backgroundColor: '#efe8ff',
    minHeight: 26,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusPillText: {
    color: '#8a74f6',
    fontSize: 13,
    fontWeight: '600',
  },
  statusPillChevron: {
    color: '#8a74f6',
    fontSize: 10,
    fontWeight: '700',
  },
  editIconButton: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#eef3f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  bodyText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  attachmentsWrap: {
    gap: spacing.sm,
  },
  linkPrimary: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
