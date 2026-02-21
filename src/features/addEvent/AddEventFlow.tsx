import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import {
  EventField,
  EventFormModal,
  EventOptionPicker,
  EventRepeatSwitch,
  PrimaryButton,
  RepeatCadenceTabs,
  WeekdayChipGroup,
  CheckboxRow,
} from './components/AddEventPrimitives';
import {
  categoryOptions,
  createEmptyAddEventForm,
  priorityOptions,
  dateOptions,
  timeOptions,
  weekdayOptions,
} from './data/addEventDummyData';
import { saveEventDummy } from './services/addEventService';
import { AddEventValidationErrors, EventOption, SavedEvent } from './types';
import { hasAddEventErrors, validateAddEvent } from './validation';
import { colors } from '../../theme/tokens';

type PickerKey = 'category' | 'priority' | 'date' | 'time' | 'repeatTime' | null;

interface AddEventFlowProps {
  visible: boolean;
  onClose: () => void;
  onSaved?: (event: SavedEvent) => void;
}

export function AddEventFlow({ visible, onClose, onSaved }: AddEventFlowProps) {
  const [form, setForm] = useState(createEmptyAddEventForm);
  const [errors, setErrors] = useState<AddEventValidationErrors>({});
  const [saving, setSaving] = useState(false);
  const [pickerKey, setPickerKey] = useState<PickerKey>(null);

  useEffect(() => {
    if (visible) {
      setForm(createEmptyAddEventForm());
      setErrors({});
      setSaving(false);
      setPickerKey(null);
    }
  }, [visible]);

  const pickerConfig = useMemo(() => getPickerConfig(pickerKey), [pickerKey]);

  const categoryLabel = optionLabel(categoryOptions, form.category, 'Corporate Event');
  const priorityLabel = optionLabel(priorityOptions, form.priority, 'Medium');

  const submit = async () => {
    const validationErrors = validateAddEvent(form);
    setErrors(validationErrors);

    if (hasAddEventErrors(validationErrors)) {
      return;
    }

    try {
      setSaving(true);
      const response = await saveEventDummy(form);
      onSaved?.(response);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <EventFormModal visible={visible} title="Add Event" onClose={onClose}>
        <EventField
          label="Event Name"
          value={form.eventName}
          placeholder="Katy's Birthday"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, eventName: value }));
            setErrors((prev) => ({ ...prev, eventName: undefined }));
          }}
          error={errors.eventName}
        />

        <EventField
          label="Event Category"
          value={categoryLabel}
          placeholder="Select category"
          onPress={() => setPickerKey('category')}
          rightText="v"
          error={errors.category}
        />

        <EventField
          label="Priority"
          value={priorityLabel}
          placeholder="Select priority"
          onPress={() => setPickerKey('priority')}
          rightText="v"
          error={errors.priority}
        />

        <EventField
          label="Date"
          value={form.date ?? ''}
          placeholder="Select Date"
          onPress={() => setPickerKey('date')}
          rightText="C"
          error={errors.date}
        />

        <EventField
          label="Time"
          value={form.time ?? ''}
          placeholder="Select Time"
          onPress={() => setPickerKey('time')}
          rightText="C"
          error={errors.time}
        />

        <EventField
          label="Description"
          value={form.description}
          placeholder="Add some description of the event"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, description: value }));
          }}
          multiline
        />

        <EventRepeatSwitch
          value={form.repeatEnabled}
          onChange={(value) => {
            setForm((prev) => ({ ...prev, repeatEnabled: value }));
            if (!value) {
              setErrors((prev) => ({ ...prev, repeatDays: undefined, repeatTime: undefined }));
            }
          }}
        />

        {form.repeatEnabled ? (
          <>
            <Text style={styles.repeatSectionLabel}>Complete this task</Text>
            <RepeatCadenceTabs
              value={form.repeatCadence}
              onChange={(value) => {
                setForm((prev) => ({ ...prev, repeatCadence: value }));
              }}
            />

            <WeekdayChipGroup
              days={weekdayOptions}
              selectedDays={form.repeatDays}
              onToggle={(day) => {
                setForm((prev) => {
                  if (prev.repeatEveryDay) {
                    return prev;
                  }

                  const selected = prev.repeatDays.includes(day);
                  const repeatDays = selected
                    ? prev.repeatDays.filter((value) => value !== day)
                    : [...prev.repeatDays, day];

                  return { ...prev, repeatDays };
                });

                setErrors((prev) => ({ ...prev, repeatDays: undefined }));
              }}
              error={errors.repeatDays}
            />

            <CheckboxRow
              label="Repeat every day"
              value={form.repeatEveryDay}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  repeatEveryDay: value,
                  repeatDays: value ? [...weekdayOptions] : [],
                }));
                setErrors((prev) => ({ ...prev, repeatDays: undefined }));
              }}
            />

            <EventField
              label="Time"
              value={form.repeatTime ?? ''}
              placeholder="Select Time"
              onPress={() => setPickerKey('repeatTime')}
              rightText="C"
              error={errors.repeatTime}
            />
          </>
        ) : null}

        <PrimaryButton label="Save Event" loading={saving} onPress={() => void submit()} />
      </EventFormModal>

      <EventOptionPicker
        visible={pickerKey !== null}
        title={pickerConfig.title}
        options={pickerConfig.options}
        onClose={() => setPickerKey(null)}
        onSelect={(value) => {
          if (pickerKey === 'category') {
            setForm((prev) => ({ ...prev, category: value }));
            setErrors((prev) => ({ ...prev, category: undefined }));
          }

          if (pickerKey === 'priority') {
            setForm((prev) => ({ ...prev, priority: value }));
            setErrors((prev) => ({ ...prev, priority: undefined }));
          }

          if (pickerKey === 'date') {
            setForm((prev) => ({ ...prev, date: value }));
            setErrors((prev) => ({ ...prev, date: undefined }));
          }

          if (pickerKey === 'time') {
            setForm((prev) => ({ ...prev, time: value }));
            setErrors((prev) => ({ ...prev, time: undefined }));
          }

          if (pickerKey === 'repeatTime') {
            setForm((prev) => ({ ...prev, repeatTime: value }));
            setErrors((prev) => ({ ...prev, repeatTime: undefined }));
          }
        }}
      />
    </>
  );
}

function getPickerConfig(
  pickerKey: PickerKey,
): {
  title: string;
  options: EventOption[];
} {
  if (pickerKey === 'category') {
    return {
      title: 'Event Category',
      options: categoryOptions,
    };
  }

  if (pickerKey === 'priority') {
    return {
      title: 'Priority',
      options: priorityOptions,
    };
  }

  if (pickerKey === 'date') {
    return {
      title: 'Date',
      options: dateOptions,
    };
  }

  if (pickerKey === 'time' || pickerKey === 'repeatTime') {
    return {
      title: 'Time',
      options: timeOptions,
    };
  }

  return {
    title: 'Select',
    options: [],
  };
}

function optionLabel(options: EventOption[], value: string | null, fallback: string): string {
  if (!value) {
    return '';
  }

  return options.find((option) => option.value === value)?.label ?? fallback;
}

const styles = StyleSheet.create({
  repeatSectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
