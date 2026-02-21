import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import { AddEventFlow } from '../addEvent/AddEventFlow';
import { AddProjectModalFlow, AddTaskModalFlow } from '../addProject/AddProjectFlow';
import { AddActionsSheet } from '../fab/components/FabPrimitives';
import { fabActions } from '../fab/data/fabDummyData';
import { FabActionKey } from '../fab/types';
import {
  defaultFilterState,
  estimateOptions,
  initialTimeLogState,
  periodOptions,
  priorityOptions,
} from './data/projectsDummyData';
import {
  OptionPickerModal,
  ProjectDetailsScreen,
  ProjectsFilterSheet,
  ProjectsListScreen,
  ProjectsTaskGroupsScreen,
  TaskDetailsScreen,
  TimeTrackingModal,
} from './screens/ProjectsScreens';
import {
  cloneDefaultFilterState,
  fetchProjectsSnapshot,
  saveProjectsFilters,
  saveTimeLogDummy,
  updateTaskStatusDummy,
} from './services/projectsService';
import {
  ProjectsFilterState,
  ProjectsSnapshot,
  SelectOption,
  Task,
  TaskStatus,
  TimeLogFormState,
  TimeLogValidationErrors,
} from './types';
import { hasTimeLogErrors, validateTimeLog } from './validation';

type MainView = 'list' | 'groups' | 'project-details' | 'task-details';

type PickerType = 'project' | 'period' | 'estimate' | 'priority' | 'status' | 'date' | 'time' | null;

const statusOptions: SelectOption[] = [
  { label: 'To Do', value: 'to-do' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'In Review', value: 'in-review' },
  { label: 'Done', value: 'done' },
];

const dateOptions: SelectOption[] = [
  { label: 'Dec 20, 2020', value: 'Dec 20, 2020' },
  { label: 'Dec 21, 2020', value: 'Dec 21, 2020' },
  { label: 'Dec 22, 2020', value: 'Dec 22, 2020' },
];

const timeOptions: SelectOption[] = [
  { label: '10:00 AM', value: '10:00 AM' },
  { label: '2:00 PM', value: '2:00 PM' },
  { label: '6:30 PM', value: '6:30 PM' },
];

interface ProjectsFlowProps {
  onOpenProfile: () => void;
  onOpenMessenger: () => void;
  onOpenTeamLead: () => void;
  onOpenInfoPortal: () => void;
  onOpenCalendar: () => void;
  onOpenEmployees: () => void;
  onOpenVacations: () => void;
}

export function ProjectsFlow({
  onOpenProfile,
  onOpenMessenger,
  onOpenTeamLead,
  onOpenInfoPortal,
  onOpenCalendar,
  onOpenEmployees,
  onOpenVacations,
}: ProjectsFlowProps) {
  const [snapshot, setSnapshot] = useState<ProjectsSnapshot | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingSnapshot, setLoadingSnapshot] = useState(true);

  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const [mainView, setMainView] = useState<MainView>('list');
  const [lastListView, setLastListView] = useState<'list' | 'groups'>('list');

  const [filters, setFilters] = useState<ProjectsFilterState>(cloneDefaultFilterState());
  const [filtersDraft, setFiltersDraft] = useState<ProjectsFilterState>(cloneDefaultFilterState());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savingFilters, setSavingFilters] = useState(false);
  const [assigneeSearch, setAssigneeSearch] = useState('');

  const [activePicker, setActivePicker] = useState<PickerType>(null);

  const [timeTrackingOpen, setTimeTrackingOpen] = useState(false);
  const [timeLogForm, setTimeLogForm] = useState<TimeLogFormState>(initialTimeLogState);
  const [timeLogErrors, setTimeLogErrors] = useState<TimeLogValidationErrors>({});
  const [savingTimeLog, setSavingTimeLog] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [addActionsOpen, setAddActionsOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingSnapshot(true);
        const response = await fetchProjectsSnapshot();
        setSnapshot(response);
        setTasks(response.tasks);
        setSelectedProjectId(response.projects[0]?.id ?? '');
      } finally {
        setLoadingSnapshot(false);
      }
    };

    void load();
  }, []);

  const members = snapshot?.members ?? [];

  const memberMap = useMemo(
    () =>
      members.reduce<Record<string, (typeof members)[number]>>((acc, member) => {
        acc[member.id] = member;
        return acc;
      }, {}),
    [members],
  );

  const projects = snapshot?.projects ?? [];
  const taskGroups = snapshot?.taskGroups ?? [];

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0] ?? null;

  const projectTasks = useMemo(
    () => tasks.filter((task) => task.projectId === selectedProject?.id),
    [tasks, selectedProject?.id],
  );

  const filteredTasks = useMemo(
    () => applyTaskFilters(projectTasks, filters),
    [projectTasks, filters],
  );

  const filteredTaskDraft = useMemo(
    () => applyTaskFilters(projectTasks, filtersDraft),
    [projectTasks, filtersDraft],
  );

  const groupedTasks = useMemo(
    () =>
      taskGroups.reduce<Record<string, Task[]>>((acc, group) => {
        acc[group.id] = filteredTasks.filter((task) => task.groupId === group.id);
        return acc;
      }, {}),
    [filteredTasks, taskGroups],
  );

  const activeTasks = groupedTasks.active ?? [];
  const backlogTasks = groupedTasks.backlog ?? [];
  const projectHasTasks = projectTasks.length > 0;
  const hasVisibleTasks = activeTasks.length + backlogTasks.length > 0;

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? null;

  const projectReporter =
    selectedProject && memberMap[selectedProject.reporterId]
      ? memberMap[selectedProject.reporterId]
      : members[0];

  const selectedTaskReporter =
    selectedTask && memberMap[selectedTask.reporterId]
      ? memberMap[selectedTask.reporterId]
      : projectReporter;

  const selectedTaskAssignee =
    selectedTask && memberMap[selectedTask.assigneeId]
      ? memberMap[selectedTask.assigneeId]
      : projectReporter;

  const selectedTaskActivities =
    selectedTask?.activities.map((activity) => memberMap[activity.userId]).filter(Boolean) ?? [];

  const periodLabel =
    periodOptions.find((option) => option.value === filtersDraft.period)?.label ?? 'Select Period';

  const estimateLabel =
    estimateOptions.find((option) => option.value === filtersDraft.estimate)?.label ??
    'Select duration';

  const priorityLabel =
    priorityOptions.find((option) => option.value === filtersDraft.priority)?.label ??
    'All priorities';

  const projectOptions: SelectOption[] = projects.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const pickerConfig = getPickerConfig({
    activePicker,
    selectedProjectId,
    filtersDraft,
    selectedTask,
    projectOptions,
  });

  if (loadingSnapshot) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading projects...</Text>;
  }

  if (!selectedProject || !projectReporter) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>No projects available.</Text>;
  }

  const openTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setMainView('task-details');
  };

  const openProjectDetails = () => {
    setMainView('project-details');
  };

  const openFilters = () => {
    setFiltersDraft(cloneFilterState(filters));
    setAssigneeSearch('');
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
    setAssigneeSearch('');
  };

  const saveFiltersHandler = async () => {
    try {
      setSavingFilters(true);
      const response = await saveProjectsFilters(filtersDraft);
      setFilters(cloneFilterState(response));
      closeFilters();
    } finally {
      setSavingFilters(false);
    }
  };

  const saveTimeLogHandler = async () => {
    const errors = validateTimeLog(timeLogForm);
    setTimeLogErrors(errors);

    if (hasTimeLogErrors(errors) || !selectedTask) {
      return;
    }

    try {
      setSavingTimeLog(true);
      await saveTimeLogDummy(selectedTask.id, timeLogForm);

      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== selectedTask.id) {
            return task;
          }

          return {
            ...task,
            loggedTime: timeLogForm.timeSpent,
            spentTime: timeLogForm.timeSpent,
          };
        }),
      );

      setTimeTrackingOpen(false);
      setTimeLogErrors({});
      Alert.alert('Saved', 'Time log was saved in dummy mode.');
    } finally {
      setSavingTimeLog(false);
    }
  };

  const openAddActionMenu = () => {
    setAddActionsOpen(true);
  };

  const handleFabAction = (action: FabActionKey) => {
    setAddActionsOpen(false);

    if (action === 'project') {
      setAddProjectOpen(true);
      return;
    }

    if (action === 'task') {
      setAddTaskOpen(true);
      return;
    }

    if (action === 'event') {
      setAddEventOpen(true);
      return;
    }

    if (action === 'request') {
      onOpenVacations();
      return;
    }

    if (action === 'employee') {
      onOpenEmployees();
      return;
    }

    onOpenInfoPortal();
  };

  const screen = (() => {
    if (mainView === 'project-details') {
      return (
        <ProjectDetailsScreen
          project={selectedProject}
          reporter={projectReporter}
          assignees={selectedProject.assigneeIds.map((id) => memberMap[id]).filter(Boolean)}
          onBack={() => setMainView(lastListView)}
          onOpenCalendar={onOpenCalendar}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onOpenProfile}
          onOpenAddAction={openAddActionMenu}
        />
      );
    }

    if (mainView === 'task-details' && selectedTask && selectedTaskReporter && selectedTaskAssignee) {
      return (
        <TaskDetailsScreen
          task={selectedTask}
          reporter={selectedTaskReporter}
          assignee={selectedTaskAssignee}
          activities={selectedTaskActivities}
          onBack={() => setMainView(lastListView)}
          onOpenTimeTracking={() => {
            setTimeLogForm(initialTimeLogState);
            setTimeLogErrors({});
            setTimeTrackingOpen(true);
          }}
          onOpenStatusPicker={() => {
            if (selectedTask.status === 'in-review') {
              onOpenTeamLead();
              return;
            }

            setActivePicker('status');
          }}
          onViewMoreActivity={() => {
            Alert.alert('Activity', 'Dummy activity list is already fully loaded.');
          }}
          onOpenInfoPortal={onOpenInfoPortal}
          onOpenCalendar={onOpenCalendar}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onOpenProfile}
          onOpenAddAction={openAddActionMenu}
        />
      );
    }

    if (mainView === 'groups') {
      return (
        <ProjectsTaskGroupsScreen
          project={selectedProject}
          taskGroups={taskGroups}
          groupedTasks={groupedTasks}
          memberMap={memberMap}
          onOpenProjectDetails={openProjectDetails}
          onOpenFilters={openFilters}
          onOpenTask={(taskId) => {
            setLastListView('groups');
            openTask(taskId);
          }}
          onOpenProjectPicker={() => setActivePicker('project')}
          onBackToList={() => {
            setLastListView('list');
            setMainView('list');
          }}
          onOpenCalendar={onOpenCalendar}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onOpenProfile}
          onOpenAddAction={openAddActionMenu}
        />
      );
    }

    return (
      <ProjectsListScreen
        project={selectedProject}
        projectHasTasks={projectHasTasks}
        hasVisibleTasks={hasVisibleTasks}
        activeTasks={activeTasks}
        backlogTasks={backlogTasks}
        memberMap={memberMap}
        onOpenProjectDetails={openProjectDetails}
        onOpenFilters={openFilters}
        onOpenTask={(taskId) => {
          setLastListView('list');
          openTask(taskId);
        }}
        onOpenProjectPicker={() => setActivePicker('project')}
        onOpenTaskGroups={() => {
          setLastListView('groups');
          setMainView('groups');
        }}
        onOpenCalendar={onOpenCalendar}
        onOpenMessenger={onOpenMessenger}
        onOpenProfile={onOpenProfile}
        onOpenAddAction={openAddActionMenu}
        onOpenAddTask={() => setAddTaskOpen(true)}
      />
    );
  })();

  return (
    <>
      {screen}

      <ProjectsFilterSheet
        visible={filtersOpen}
        filters={filtersDraft}
        periodLabel={periodLabel}
        estimateLabel={estimateLabel}
        priorityLabel={priorityLabel}
        taskGroups={taskGroups}
        reporterOptions={members.slice(0, 5)}
        assigneeOptions={members}
        assigneeSearch={assigneeSearch}
        matchesFound={filteredTaskDraft.length}
        saving={savingFilters}
        onClose={closeFilters}
        onOpenPeriodPicker={() => setActivePicker('period')}
        onToggleTaskGroup={(groupId) => {
          setFiltersDraft((prev) => {
            const selected = prev.taskGroupIds.includes(groupId);
            return {
              ...prev,
              taskGroupIds: selected
                ? prev.taskGroupIds.filter((value) => value !== groupId)
                : [...prev.taskGroupIds, groupId],
            };
          });
        }}
        onToggleReporter={(memberId) => {
          setFiltersDraft((prev) => {
            const selected = prev.reporterIds.includes(memberId);
            return {
              ...prev,
              reporterIds: selected
                ? prev.reporterIds.filter((value) => value !== memberId)
                : [...prev.reporterIds, memberId],
            };
          });
        }}
        onAssigneeSearchChange={setAssigneeSearch}
        onToggleAssignee={(memberId) => {
          setFiltersDraft((prev) => {
            const selected = prev.assigneeIds.includes(memberId);
            return {
              ...prev,
              assigneeIds: selected
                ? prev.assigneeIds.filter((value) => value !== memberId)
                : [...prev.assigneeIds, memberId],
            };
          });
        }}
        onOpenEstimatePicker={() => setActivePicker('estimate')}
        onOpenPriorityPicker={() => setActivePicker('priority')}
        onSave={() => {
          void saveFiltersHandler();
        }}
      />

      <OptionPickerModal
        visible={Boolean(activePicker)}
        title={pickerConfig.title}
        options={pickerConfig.options}
        selectedValue={pickerConfig.selectedValue}
        onSelect={(value) => {
          if (activePicker === 'project') {
            setSelectedProjectId(value);
            setSelectedTaskId('');
            setMainView('list');
            setLastListView('list');
          }

          if (activePicker === 'period') {
            setFiltersDraft((prev) => ({ ...prev, period: value }));
          }

          if (activePicker === 'estimate') {
            setFiltersDraft((prev) => ({ ...prev, estimate: value }));
          }

          if (activePicker === 'priority') {
            setFiltersDraft((prev) => ({
              ...prev,
              priority: value as ProjectsFilterState['priority'],
            }));
          }

          if (activePicker === 'status' && selectedTask) {
            const nextStatus = value as TaskStatus;
            setTasks((prev) =>
              prev.map((task) => (task.id === selectedTask.id ? { ...task, status: nextStatus } : task)),
            );
            void updateTaskStatusDummy(selectedTask.id, nextStatus);
          }

          if (activePicker === 'date') {
            setTimeLogForm((prev) => ({ ...prev, date: value }));
            setTimeLogErrors((prev) => ({ ...prev, date: undefined }));
          }

          if (activePicker === 'time') {
            setTimeLogForm((prev) => ({ ...prev, time: value }));
            setTimeLogErrors((prev) => ({ ...prev, time: undefined }));
          }
        }}
        onClose={() => setActivePicker(null)}
      />

      <TimeTrackingModal
        visible={timeTrackingOpen}
        task={selectedTask}
        form={timeLogForm}
        errors={timeLogErrors}
        saving={savingTimeLog}
        onClose={() => setTimeTrackingOpen(false)}
        onChangeTimeSpent={(value) => {
          setTimeLogForm((prev) => ({ ...prev, timeSpent: value }));
          setTimeLogErrors((prev) => ({ ...prev, timeSpent: undefined }));
        }}
        onOpenDatePicker={() => setActivePicker('date')}
        onOpenTimePicker={() => setActivePicker('time')}
        onChangeDescription={(value) => {
          setTimeLogForm((prev) => ({ ...prev, workDescription: value }));
          setTimeLogErrors((prev) => ({ ...prev, workDescription: undefined }));
        }}
        onSave={() => {
          void saveTimeLogHandler();
        }}
      />

      <AddEventFlow
        visible={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        onSaved={() => {
          Alert.alert('Event saved', 'Event was saved in dummy mode.');
        }}
      />

      <AddProjectModalFlow
        visible={addProjectOpen}
        reporterId={selectedProject.reporterId}
        onClose={() => setAddProjectOpen(false)}
        onSaved={(project) => {
          setSnapshot((prev) => {
            if (!prev) {
              return prev;
            }

            return {
              ...prev,
              projects: [project, ...prev.projects],
            };
          });

          setSelectedProjectId(project.id);
          setMainView('list');
          setLastListView('list');
          Alert.alert('Project saved', 'New project created in dummy mode.');
        }}
      />

      <AddTaskModalFlow
        visible={addTaskOpen}
        projectId={selectedProject.id}
        reporterId={selectedProject.reporterId}
        taskGroups={taskGroups}
        teamMembers={members}
        onClose={() => setAddTaskOpen(false)}
        onSaved={(task) => {
          setTasks((prev) => [task, ...prev]);
          Alert.alert('Task saved', 'Task created in dummy mode.');
        }}
      />

      <AddActionsSheet
        visible={addActionsOpen}
        actions={fabActions}
        onClose={() => setAddActionsOpen(false)}
        onSelect={handleFabAction}
      />
    </>
  );
}

function getPickerConfig({
  activePicker,
  selectedProjectId,
  filtersDraft,
  selectedTask,
  projectOptions,
}: {
  activePicker: PickerType;
  selectedProjectId: string;
  filtersDraft: ProjectsFilterState;
  selectedTask: Task | null;
  projectOptions: SelectOption[];
}): {
  title: string;
  options: SelectOption[];
  selectedValue: string;
} {
  if (activePicker === 'project') {
    return {
      title: 'Select Project',
      options: projectOptions,
      selectedValue: selectedProjectId,
    };
  }

  if (activePicker === 'period') {
    return {
      title: 'Select Period',
      options: periodOptions,
      selectedValue: filtersDraft.period ?? 'all',
    };
  }

  if (activePicker === 'estimate') {
    return {
      title: 'Estimate',
      options: estimateOptions,
      selectedValue: filtersDraft.estimate,
    };
  }

  if (activePicker === 'priority') {
    return {
      title: 'Priority',
      options: priorityOptions,
      selectedValue: filtersDraft.priority,
    };
  }

  if (activePicker === 'status') {
    return {
      title: 'Task Status',
      options: statusOptions,
      selectedValue: selectedTask?.status ?? 'to-do',
    };
  }

  if (activePicker === 'date') {
    return {
      title: 'Date',
      options: dateOptions,
      selectedValue: dateOptions[0].value,
    };
  }

  if (activePicker === 'time') {
    return {
      title: 'Time',
      options: timeOptions,
      selectedValue: timeOptions[1].value,
    };
  }

  return {
    title: 'Select',
    options: [],
    selectedValue: '',
  };
}

function cloneFilterState(filters: ProjectsFilterState): ProjectsFilterState {
  return {
    ...filters,
    taskGroupIds: [...filters.taskGroupIds],
    reporterIds: [...filters.reporterIds],
    assigneeIds: [...filters.assigneeIds],
  };
}

function applyTaskFilters(tasks: Task[], filters: ProjectsFilterState): Task[] {
  let next = [...tasks];

  if (filters.taskGroupIds.length > 0) {
    next = next.filter((task) => filters.taskGroupIds.includes(task.groupId));
  }

  if (filters.reporterIds.length > 0) {
    next = next.filter((task) => filters.reporterIds.includes(task.reporterId));
  }

  if (filters.assigneeIds.length > 0) {
    next = next.filter((task) => filters.assigneeIds.includes(task.assigneeId));
  }

  if (filters.priority !== defaultFilterState.priority) {
    next = next.filter((task) => task.priority === filters.priority);
  }

  if (filters.estimate) {
    next = next.filter((task) => matchEstimatePreset(task.estimate, filters.estimate));
  }

  if (filters.period && filters.period !== 'all') {
    next = applyPeriodPreset(next, filters.period);
  }

  return next;
}

function applyPeriodPreset(tasks: Task[], period: string): Task[] {
  if (period === 'today') {
    return tasks.slice(0, 3);
  }

  if (period === 'week') {
    return tasks.slice(0, 5);
  }

  return tasks;
}

function matchEstimatePreset(taskEstimate: string, filterValue: string): boolean {
  if (filterValue === '8h') {
    return taskEstimate.includes('h') && !taskEstimate.includes('d');
  }

  if (filterValue === '1-2d') {
    return /(^|\s)(1|2)d/i.test(taskEstimate);
  }

  if (filterValue === '3d+') {
    const match = taskEstimate.match(/(\d+)d/i);
    if (!match) {
      return false;
    }

    return Number(match[1]) >= 3;
  }

  return true;
}
