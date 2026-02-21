import { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ActivityRow,
  AttachmentPill,
  AvatarStack,
  CheckboxItem,
  DetailRow,
  FloatingActionButton,
  InputField,
  PrimaryButton,
  PriorityLabel,
  ProjectPicker,
  ProjectsLayout,
  SearchField,
  SectionPill,
  SelectField,
  SideSheet,
  StatusBadge,
  SurfaceCard,
  TagChip,
  TaskCard,
  TopAppBar,
} from '../components/ProjectsPrimitives';
import { EmptyProjectState } from '../../addProject/components/AddProjectPrimitives';
import { colors, radii, spacing } from '../../../theme/tokens';
import {
  Project,
  ProjectsFilterState,
  SelectOption,
  Task,
  TaskGroup,
  TaskStatus,
  TeamMember,
  TimeLogFormState,
  TimeLogValidationErrors,
} from '../types';

interface ProjectsListScreenProps {
  project: Project;
  projectHasTasks: boolean;
  hasVisibleTasks: boolean;
  activeTasks: Task[];
  backlogTasks: Task[];
  memberMap: Record<string, TeamMember>;
  onOpenProjectDetails: () => void;
  onOpenFilters: () => void;
  onOpenTask: (taskId: string) => void;
  onOpenProjectPicker: () => void;
  onOpenTaskGroups: () => void;
  onOpenCalendar: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenAddAction: () => void;
  onOpenAddTask: () => void;
}

interface ProjectsTaskGroupsScreenProps {
  project: Project;
  taskGroups: TaskGroup[];
  groupedTasks: Record<string, Task[]>;
  memberMap: Record<string, TeamMember>;
  onOpenProjectDetails: () => void;
  onOpenFilters: () => void;
  onOpenTask: (taskId: string) => void;
  onOpenProjectPicker: () => void;
  onBackToList: () => void;
  onOpenCalendar: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenAddAction: () => void;
}

interface ProjectDetailsScreenProps {
  project: Project;
  reporter: TeamMember;
  assignees: TeamMember[];
  onBack: () => void;
  onOpenCalendar: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenAddAction: () => void;
}

interface TaskDetailsScreenProps {
  task: Task;
  reporter: TeamMember;
  assignee: TeamMember;
  activities: TeamMember[];
  onBack: () => void;
  onOpenTimeTracking: () => void;
  onOpenStatusPicker: () => void;
  onViewMoreActivity: () => void;
  onOpenInfoPortal: () => void;
  onOpenCalendar: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  onOpenAddAction: () => void;
}

interface ProjectsFilterSheetProps {
  visible: boolean;
  filters: ProjectsFilterState;
  periodLabel: string;
  estimateLabel: string;
  priorityLabel: string;
  taskGroups: TaskGroup[];
  reporterOptions: TeamMember[];
  assigneeOptions: TeamMember[];
  assigneeSearch: string;
  matchesFound: number;
  saving: boolean;
  onClose: () => void;
  onOpenPeriodPicker: () => void;
  onToggleTaskGroup: (groupId: string) => void;
  onToggleReporter: (memberId: string) => void;
  onAssigneeSearchChange: (value: string) => void;
  onToggleAssignee: (memberId: string) => void;
  onOpenEstimatePicker: () => void;
  onOpenPriorityPicker: () => void;
  onSave: () => void;
}

interface OptionPickerModalProps {
  visible: boolean;
  title: string;
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

interface TimeTrackingModalProps {
  visible: boolean;
  task: Task | null;
  form: TimeLogFormState;
  errors: TimeLogValidationErrors;
  saving: boolean;
  onClose: () => void;
  onChangeTimeSpent: (value: string) => void;
  onOpenDatePicker: () => void;
  onOpenTimePicker: () => void;
  onChangeDescription: (value: string) => void;
  onSave: () => void;
}

export function ProjectsListScreen({
  project,
  projectHasTasks,
  hasVisibleTasks,
  activeTasks,
  backlogTasks,
  memberMap,
  onOpenProjectDetails,
  onOpenFilters,
  onOpenTask,
  onOpenProjectPicker,
  onOpenTaskGroups,
  onOpenCalendar,
  onOpenMessenger,
  onOpenProfile,
  onOpenAddAction,
  onOpenAddTask,
}: ProjectsListScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenCalendar} onProfile={onOpenProfile} />
      <Text style={styles.pageTitle}>Projects</Text>

      <ProjectPicker
        projectName={project.name}
        onOpenProjects={onOpenProjectPicker}
        onViewDetails={onOpenProjectDetails}
        onOpenFilters={onOpenFilters}
      />

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <Pressable onPress={onOpenTaskGroups}>
          <Text style={styles.smallLink}>{'Task groups ->'}</Text>
        </Pressable>
      </View>

      {!projectHasTasks ? (
        <EmptyProjectState projectName={project.name} onOpenAddTask={onOpenAddTask} />
      ) : (
        <>
          <SectionPill label="Active Tasks" />
          {activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              name={task.name}
              estimate={task.estimate}
              spentTime={task.spentTime}
              assignee={memberMap[task.assigneeId]}
              priority={task.priority}
              status={task.status}
              onPress={() => onOpenTask(task.id)}
            />
          ))}

          <SectionPill label="Backlog" />
          {backlogTasks.map((task) => (
            <TaskCard
              key={task.id}
              name={task.name}
              estimate={task.estimate}
              spentTime={task.spentTime}
              assignee={memberMap[task.assigneeId]}
              priority={task.priority}
              status={task.status}
              onPress={() => onOpenTask(task.id)}
            />
          ))}

          {!hasVisibleTasks ? <Text style={styles.noMatchesText}>No tasks match current filters.</Text> : null}
        </>
      )}

      <FloatingActionButton onPress={projectHasTasks ? onOpenAddAction : onOpenAddTask} />
    </ProjectsLayout>
  );
}

export function ProjectsTaskGroupsScreen({
  project,
  taskGroups,
  groupedTasks,
  memberMap,
  onOpenProjectDetails,
  onOpenFilters,
  onOpenTask,
  onOpenProjectPicker,
  onBackToList,
  onOpenCalendar,
  onOpenMessenger,
  onOpenProfile,
  onOpenAddAction,
}: ProjectsTaskGroupsScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenCalendar} onProfile={onOpenProfile} />
      <Text style={styles.pageTitle}>Projects</Text>

      <ProjectPicker
        projectName={project.name}
        onOpenProjects={onOpenProjectPicker}
        onViewDetails={onOpenProjectDetails}
        onOpenFilters={onOpenFilters}
      />

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <Pressable onPress={onBackToList}>
          <Text style={styles.smallLink}>{'Compact list ->'}</Text>
        </Pressable>
      </View>

      {taskGroups.map((group) => {
        const tasks = groupedTasks[group.id] ?? [];

        return (
          <View key={group.id} style={styles.groupSection}>
            <Text style={styles.groupTitle}>{`${group.label} (${tasks.length} issues)`}</Text>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                name={task.name}
                estimate={task.estimate}
                spentTime={task.spentTime}
                assignee={memberMap[task.assigneeId]}
                priority={task.priority}
                status={task.status}
                onPress={() => onOpenTask(task.id)}
              />
            ))}
          </View>
        );
      })}

      <FloatingActionButton onPress={onOpenAddAction} />
    </ProjectsLayout>
  );
}

export function ProjectDetailsScreen({
  project,
  reporter,
  assignees,
  onBack,
  onOpenCalendar,
  onOpenMessenger,
  onOpenProfile,
  onOpenAddAction,
}: ProjectDetailsScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenCalendar} onProfile={onOpenProfile} />

      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>{'<- Back to Projects'}</Text>
      </Pressable>

      <Text style={styles.detailsTitle}>{project.name}</Text>

      <SurfaceCard>
        <DetailRow label="Project Number" value={project.number} />

        <View style={styles.infoBlock}>
          <Text style={styles.blockLabel}>Description</Text>
          <Text style={styles.bodyText}>{project.description}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.blockLabel}>Reporter</Text>
          <View style={styles.memberRow}>
            <AvatarStack members={[reporter]} maxVisible={1} />
            <Text style={styles.memberName}>{reporter.name}</Text>
          </View>
        </View>

        <View style={styles.metaRowSplit}>
          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Assignees</Text>
            <AvatarStack members={assignees} maxVisible={3} />
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Priority</Text>
            <PriorityLabel priority={project.priority} />
          </View>
        </View>

        <View style={styles.metaBlock}>
          <Text style={styles.blockLabel}>Dead Line</Text>
          <Text style={styles.metaValue}>{project.deadline}</Text>
        </View>

        <Text style={styles.createdText}>{`Created ${project.createdAt}`}</Text>

        <View style={styles.quickActionsRow}>
          <TagChip label="Attach" />
          <TagChip label="Share link" />
        </View>
      </SurfaceCard>

      <FloatingActionButton onPress={onOpenAddAction} />
    </ProjectsLayout>
  );
}

export function TaskDetailsScreen({
  task,
  reporter,
  assignee,
  activities,
  onBack,
  onOpenTimeTracking,
  onOpenStatusPicker,
  onViewMoreActivity,
  onOpenInfoPortal,
  onOpenCalendar,
  onOpenMessenger,
  onOpenProfile,
  onOpenAddAction,
}: TaskDetailsScreenProps) {
  return (
    <ProjectsLayout>
      <TopAppBar onSearch={onOpenMessenger} onNotifications={onOpenCalendar} onProfile={onOpenProfile} />

      <Pressable onPress={onBack}>
        <Text style={styles.backLink}>{'<- Back to Projects'}</Text>
      </Pressable>

      <Text style={styles.detailsTitle}>{task.name}</Text>

      <SurfaceCard>
        <Text style={styles.cardTitle}>Task Info</Text>

        <View style={styles.metaRowSplit}>
          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Reporter</Text>
            <View style={styles.memberRow}>
              <AvatarStack members={[reporter]} maxVisible={1} />
              <Text style={styles.memberName}>{reporter.name}</Text>
            </View>
          </View>

          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Assignee</Text>
            <View style={styles.memberRow}>
              <AvatarStack members={[assignee]} maxVisible={1} />
              <Text style={styles.memberName}>{assignee.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.metaRowSplit}>
          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Priority</Text>
            <PriorityLabel priority={task.priority} />
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.blockLabel}>Dead Line</Text>
            <Text style={styles.metaValue}>{'Feb 23, 2020'}</Text>
          </View>
        </View>

        <View style={styles.timeSummaryCard}>
          <Text style={styles.summaryTitle}>{`${task.loggedTime} logged`}</Text>
          <Text style={styles.summarySub}>{`Original Estimate ${task.originalEstimate}`}</Text>
          <PrimaryButton label="Log time" onPress={onOpenTimeTracking} />
        </View>

        <Text style={styles.createdText}>{'Created May 28, 2020'}</Text>
      </SurfaceCard>

      <SurfaceCard>
        <View style={styles.statusHeader}>
          <StatusBadge status={task.status} />
          <Pressable onPress={onOpenStatusPicker}>
            <Text style={styles.statusAction}>Edit status</Text>
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

        <Pressable onPress={onOpenInfoPortal}>
          <TagChip label="Vision Prototype" />
        </Pressable>
      </SurfaceCard>

      <SurfaceCard>
        <Text style={styles.cardTitle}>Recent Activity</Text>

        {task.activities.map((activity, index) => (
          <ActivityRow
            key={activity.id}
            member={activities[index] || reporter}
            title={activity.title}
            subtitle={activity.subtitle}
          />
        ))}

        <Pressable onPress={onViewMoreActivity}>
          <Text style={styles.linkPrimary}>View more</Text>
        </Pressable>
      </SurfaceCard>

      <FloatingActionButton onPress={onOpenAddAction} />
    </ProjectsLayout>
  );
}

export function ProjectsFilterSheet({
  visible,
  filters,
  periodLabel,
  estimateLabel,
  priorityLabel,
  taskGroups,
  reporterOptions,
  assigneeOptions,
  assigneeSearch,
  matchesFound,
  saving,
  onClose,
  onOpenPeriodPicker,
  onToggleTaskGroup,
  onToggleReporter,
  onAssigneeSearchChange,
  onToggleAssignee,
  onOpenEstimatePicker,
  onOpenPriorityPicker,
  onSave,
}: ProjectsFilterSheetProps) {
  const filteredAssignees = assigneeOptions.filter((member) =>
    member.name.toLowerCase().includes(assigneeSearch.trim().toLowerCase()),
  );

  return (
    <SideSheet
      visible={visible}
      title="Filters"
      onClose={onClose}
      footer={<PrimaryButton label={`Save Filters (${matchesFound})`} onPress={onSave} loading={saving} />}
    >
      <SelectField
        label="Period"
        value={periodLabel}
        placeholder="Select Period"
        onPress={onOpenPeriodPicker}
      />

      <View style={styles.sectionBlock}>
        <Text style={styles.sheetSectionTitle}>Task Group</Text>
        {taskGroups.map((group) => (
          <CheckboxItem
            key={group.id}
            label={group.label}
            checked={filters.taskGroupIds.includes(group.id)}
            onToggle={() => onToggleTaskGroup(group.id)}
          />
        ))}
      </View>

      <View style={styles.sectionBlock}>
        <Text style={styles.sheetSectionTitle}>Reporter</Text>
        {reporterOptions.map((member) => (
          <CheckboxItem
            key={member.id}
            label={member.name}
            checked={filters.reporterIds.includes(member.id)}
            onToggle={() => onToggleReporter(member.id)}
          />
        ))}
      </View>

      <SearchField
        label="Assignees"
        value={assigneeSearch}
        placeholder="Search"
        onChangeText={onAssigneeSearchChange}
      />

      <View style={styles.chipWrap}>
        {filteredAssignees.slice(0, 6).map((member) => {
          const selected = filters.assigneeIds.includes(member.id);
          return (
            <Pressable key={member.id} onPress={() => onToggleAssignee(member.id)}>
              <TagChip label={selected ? `${member.name} x` : member.name} />
            </Pressable>
          );
        })}
      </View>

      <SelectField
        label="Estimate"
        value={estimateLabel}
        placeholder="Select duration"
        onPress={onOpenEstimatePicker}
      />

      <SelectField
        label="Priority"
        value={priorityLabel}
        placeholder="Choose priority"
        onPress={onOpenPriorityPicker}
      />

      <Text style={styles.matchesText}>{`${matchesFound} matches found`}</Text>
    </SideSheet>
  );
}

export function OptionPickerModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: OptionPickerModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.optionOverlay} onPress={onClose}>
        <Pressable style={styles.optionCard} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.optionTitle}>{title}</Text>

          <ScrollView style={styles.optionList} contentContainerStyle={styles.optionListContent}>
            {options.map((option) => {
              const selected = option.value === selectedValue;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    onSelect(option.value);
                    onClose();
                  }}
                  style={[styles.optionRow, selected && styles.optionRowSelected]}
                >
                  <Text style={[styles.optionRowText, selected && styles.optionRowTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function TimeTrackingModal({
  visible,
  task,
  form,
  errors,
  saving,
  onClose,
  onChangeTimeSpent,
  onOpenDatePicker,
  onOpenTimePicker,
  onChangeDescription,
  onSave,
}: TimeTrackingModalProps) {
  if (!task) {
    return null;
  }

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Time Tracking</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <View style={styles.loggedSummary}>
            <Text style={styles.summaryTitle}>{`${task.loggedTime} logged`}</Text>
            <Text style={styles.summarySub}>{`Original Estimate ${task.originalEstimate}`}</Text>
          </View>

          <InputField
            label="Time spent"
            value={form.timeSpent}
            placeholder="1w 4d 6h 40m"
            onChangeText={onChangeTimeSpent}
            error={errors.timeSpent}
          />

          <SelectField
            label="Date"
            value={form.date}
            placeholder="Dec 20, 2020"
            onPress={onOpenDatePicker}
            error={errors.date}
          />

          <SelectField
            label="Time"
            value={form.time}
            placeholder="2:00 PM"
            onPress={onOpenTimePicker}
            error={errors.time}
          />

          <InputField
            label="Work Description"
            value={form.workDescription}
            placeholder="Add some description of the task"
            onChangeText={onChangeDescription}
            multiline
            error={errors.workDescription}
          />

          <PrimaryButton label="Save" onPress={onSave} loading={saving} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  groupSection: {
    gap: spacing.sm,
  },
  groupTitle: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  noMatchesText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: spacing.md,
  },
  backLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  detailsTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
  },
  infoBlock: {
    gap: spacing.xs,
  },
  blockLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  bodyText: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  memberName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  metaRowSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  metaBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  createdText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  timeSummaryCard: {
    backgroundColor: '#edf3fb',
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  summarySub: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusAction: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  attachmentsWrap: {
    gap: spacing.sm,
  },
  linkPrimary: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  sectionBlock: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
  },
  sheetSectionTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  matchesText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  optionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  optionCard: {
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: '75%',
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f6',
  },
  optionList: {
    flexGrow: 0,
  },
  optionListContent: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  optionRow: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  optionRowSelected: {
    borderColor: colors.primary,
    backgroundColor: '#e9f2ff',
  },
  optionRowText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  optionRowTextSelected: {
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.4)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: '700',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4fa',
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  loggedSummary: {
    borderRadius: radii.md,
    backgroundColor: '#edf3fb',
    padding: spacing.md,
    gap: spacing.xs,
  },
});
