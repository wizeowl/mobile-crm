import { useEffect, useMemo, useState } from 'react';

import {
  AvatarPresetGrid,
  FormModal,
  OptionModal,
  PrimaryButton,
  ProjectFormField,
  ProjectQuickActions,
} from './components/AddProjectPrimitives';
import {
  avatarPresetIds,
  initialAddProjectForm,
  initialAddTaskForm,
  priorityLabelMap,
  projectDateOptions,
  projectPriorityOptions,
  taskEstimateOptions,
} from './data/addProjectDummyData';
import { saveProjectDummy, saveTaskDummy } from './services/addProjectService';
import { Project, Task, TaskGroup, TeamMember } from '../projects/types';
import {
  AddProjectValidationErrors,
  AddTaskValidationErrors,
  PickerOption,
} from './types';
import {
  hasAddProjectErrors,
  hasAddTaskErrors,
  validateAddProject,
  validateAddTask,
} from './validation';

type AddProjectPickerKey = 'startsDate' | 'deadLine' | 'priority' | null;
type AddTaskPickerKey =
  | 'taskGroupId'
  | 'estimate'
  | 'deadLine'
  | 'priority'
  | 'assigneeId'
  | null;

interface AddProjectModalProps {
  visible: boolean;
  reporterId: string;
  onClose: () => void;
  onSaved: (project: Project) => void;
}

interface AddTaskModalProps {
  visible: boolean;
  projectId: string;
  reporterId: string;
  taskGroups: TaskGroup[];
  teamMembers: TeamMember[];
  onClose: () => void;
  onSaved: (task: Task) => void;
}

export function AddProjectModalFlow({ visible, reporterId, onClose, onSaved }: AddProjectModalProps) {
  const [form, setForm] = useState(initialAddProjectForm);
  const [errors, setErrors] = useState<AddProjectValidationErrors>({});
  const [saving, setSaving] = useState(false);
  const [pickerKey, setPickerKey] = useState<AddProjectPickerKey>(null);

  useEffect(() => {
    if (visible) {
      setForm(initialAddProjectForm);
      setErrors({});
      setSaving(false);
      setPickerKey(null);
    }
  }, [visible]);

  const priorityLabel = form.priority ? priorityLabelMap[form.priority] : '';

  const pickerConfig = useMemo(() => getAddProjectPickerConfig(pickerKey), [pickerKey]);

  const onSubmit = async () => {
    const validationErrors = validateAddProject(form);
    setErrors(validationErrors);

    if (hasAddProjectErrors(validationErrors)) {
      return;
    }

    try {
      setSaving(true);
      const response = await saveProjectDummy(form, reporterId);
      onSaved(response);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <FormModal visible={visible} title="Add Project" onClose={onClose}>
        <ProjectFormField
          label="Project Name"
          value={form.projectName}
          placeholder="Project Name"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, projectName: value }));
            setErrors((prev) => ({ ...prev, projectName: undefined }));
          }}
          error={errors.projectName}
        />

        <ProjectFormField
          label="Starts"
          value={form.startsDate ?? ''}
          placeholder="Select Date"
          onPress={() => setPickerKey('startsDate')}
          rightText="C"
          error={errors.startsDate}
        />

        <ProjectFormField
          label="Dead Line"
          value={form.deadLine ?? ''}
          placeholder="Select Date"
          onPress={() => setPickerKey('deadLine')}
          rightText="C"
          error={errors.deadLine}
        />

        <ProjectFormField
          label="Priority"
          value={priorityLabel}
          placeholder="Medium"
          onPress={() => setPickerKey('priority')}
          rightText="v"
          error={errors.priority}
        />

        <ProjectFormField
          label="Description"
          value={form.description}
          placeholder="Add some description of the project"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, description: value }));
          }}
          multiline
        />

        <AvatarPresetGrid
          presets={avatarPresetIds}
          selectedPreset={form.avatarPreset}
          onSelect={(preset) => {
            setForm((prev) => ({ ...prev, avatarPreset: preset }));
          }}
        />

        <ProjectQuickActions />

        <PrimaryButton label="Save Project" loading={saving} onPress={() => void onSubmit()} />
      </FormModal>

      <OptionModal
        visible={pickerKey !== null}
        title={pickerConfig.title}
        options={pickerConfig.options}
        onClose={() => setPickerKey(null)}
        onSelect={(value) => {
          if (pickerKey === 'startsDate') {
            setForm((prev) => ({ ...prev, startsDate: value }));
            setErrors((prev) => ({ ...prev, startsDate: undefined }));
          }

          if (pickerKey === 'deadLine') {
            setForm((prev) => ({ ...prev, deadLine: value }));
            setErrors((prev) => ({ ...prev, deadLine: undefined }));
          }

          if (pickerKey === 'priority') {
            setForm((prev) => ({ ...prev, priority: value as Project['priority'] }));
            setErrors((prev) => ({ ...prev, priority: undefined }));
          }
        }}
      />
    </>
  );
}

export function AddTaskModalFlow({
  visible,
  projectId,
  reporterId,
  taskGroups,
  teamMembers,
  onClose,
  onSaved,
}: AddTaskModalProps) {
  const [form, setForm] = useState(initialAddTaskForm);
  const [errors, setErrors] = useState<AddTaskValidationErrors>({});
  const [saving, setSaving] = useState(false);
  const [pickerKey, setPickerKey] = useState<AddTaskPickerKey>(null);

  useEffect(() => {
    if (visible) {
      setForm({
        ...initialAddTaskForm,
        taskGroupId: taskGroups[0]?.id ?? null,
      });
      setErrors({});
      setSaving(false);
      setPickerKey(null);
    }
  }, [visible, taskGroups]);

  const taskGroupOptions: PickerOption[] = taskGroups.map((group) => ({
    label: group.label,
    value: group.id,
  }));

  const assigneeOptions: PickerOption[] = teamMembers.map((member) => ({
    label: member.name,
    value: member.id,
  }));

  const pickerConfig = useMemo(
    () => getAddTaskPickerConfig(pickerKey, taskGroupOptions, assigneeOptions),
    [pickerKey, taskGroupOptions, assigneeOptions],
  );

  const taskGroupLabel =
    taskGroupOptions.find((option) => option.value === form.taskGroupId)?.label ?? '';
  const assigneeLabel =
    assigneeOptions.find((option) => option.value === form.assigneeId)?.label ?? '';
  const priorityLabel = form.priority ? priorityLabelMap[form.priority] : '';

  const submit = async () => {
    const validationErrors = validateAddTask(form);
    setErrors(validationErrors);

    if (hasAddTaskErrors(validationErrors)) {
      return;
    }

    try {
      setSaving(true);
      const response = await saveTaskDummy(form, projectId, reporterId, taskGroups);
      onSaved(response);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <FormModal visible={visible} title="Add Task" onClose={onClose}>
        <ProjectFormField
          label="Task Name"
          value={form.taskName}
          placeholder="Task Name"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, taskName: value }));
            setErrors((prev) => ({ ...prev, taskName: undefined }));
          }}
          error={errors.taskName}
        />

        <ProjectFormField
          label="Task Group"
          value={taskGroupLabel}
          placeholder="Select group"
          onPress={() => setPickerKey('taskGroupId')}
          rightText="v"
          error={errors.taskGroupId}
        />

        <ProjectFormField
          label="Estimate"
          value={form.estimate ?? ''}
          placeholder="Select duration"
          onPress={() => setPickerKey('estimate')}
          rightText="C"
          error={errors.estimate}
        />

        <ProjectFormField
          label="Dead Line"
          value={form.deadLine ?? ''}
          placeholder="Select Date"
          onPress={() => setPickerKey('deadLine')}
          rightText="C"
          error={errors.deadLine}
        />

        <ProjectFormField
          label="Priority"
          value={priorityLabel}
          placeholder="Medium"
          onPress={() => setPickerKey('priority')}
          rightText="v"
          error={errors.priority}
        />

        <ProjectFormField
          label="Assignee"
          value={assigneeLabel}
          placeholder="Select Assignee"
          onPress={() => setPickerKey('assigneeId')}
          rightText="v"
          error={errors.assigneeId}
        />

        <ProjectFormField
          label="Description"
          value={form.description}
          placeholder="Add some description of the task"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, description: value }));
          }}
          multiline
        />

        <ProjectQuickActions />

        <PrimaryButton label="Save Task" loading={saving} onPress={() => void submit()} />
      </FormModal>

      <OptionModal
        visible={pickerKey !== null}
        title={pickerConfig.title}
        options={pickerConfig.options}
        onClose={() => setPickerKey(null)}
        onSelect={(value) => {
          if (pickerKey === 'taskGroupId') {
            setForm((prev) => ({ ...prev, taskGroupId: value }));
            setErrors((prev) => ({ ...prev, taskGroupId: undefined }));
          }

          if (pickerKey === 'estimate') {
            setForm((prev) => ({ ...prev, estimate: value }));
            setErrors((prev) => ({ ...prev, estimate: undefined }));
          }

          if (pickerKey === 'deadLine') {
            setForm((prev) => ({ ...prev, deadLine: value }));
            setErrors((prev) => ({ ...prev, deadLine: undefined }));
          }

          if (pickerKey === 'priority') {
            setForm((prev) => ({ ...prev, priority: value as Project['priority'] }));
            setErrors((prev) => ({ ...prev, priority: undefined }));
          }

          if (pickerKey === 'assigneeId') {
            setForm((prev) => ({ ...prev, assigneeId: value }));
            setErrors((prev) => ({ ...prev, assigneeId: undefined }));
          }
        }}
      />
    </>
  );
}

function getAddProjectPickerConfig(
  key: AddProjectPickerKey,
): {
  title: string;
  options: PickerOption[];
} {
  if (key === 'startsDate') {
    return {
      title: 'Starts',
      options: projectDateOptions,
    };
  }

  if (key === 'deadLine') {
    return {
      title: 'Dead Line',
      options: projectDateOptions,
    };
  }

  if (key === 'priority') {
    return {
      title: 'Priority',
      options: projectPriorityOptions,
    };
  }

  return {
    title: 'Select',
    options: [],
  };
}

function getAddTaskPickerConfig(
  key: AddTaskPickerKey,
  taskGroupOptions: PickerOption[],
  assigneeOptions: PickerOption[],
): {
  title: string;
  options: PickerOption[];
} {
  if (key === 'taskGroupId') {
    return {
      title: 'Task Group',
      options: taskGroupOptions,
    };
  }

  if (key === 'estimate') {
    return {
      title: 'Estimate',
      options: taskEstimateOptions,
    };
  }

  if (key === 'deadLine') {
    return {
      title: 'Dead Line',
      options: projectDateOptions,
    };
  }

  if (key === 'priority') {
    return {
      title: 'Priority',
      options: projectPriorityOptions,
    };
  }

  if (key === 'assigneeId') {
    return {
      title: 'Assignee',
      options: assigneeOptions,
    };
  }

  return {
    title: 'Select',
    options: [],
  };
}
