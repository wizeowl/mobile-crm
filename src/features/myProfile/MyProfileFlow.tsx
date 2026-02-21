import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import {
  buildVacationRequestFromForm,
  emptyAddRequestForm,
  monthDays,
  profileTabs,
  requestTypeOptions,
  timeOptions,
} from './data/myProfileDummyData';
import {
  AddRequestModal,
  MyProfileMainScreen,
  NotificationsModal,
  OptionPickerModal,
  ProfileSettingsScreen,
} from './screens/MyProfileScreens';
import {
  fetchMyProfileSnapshot,
  saveProfileSettingsDummy,
  submitVacationRequestDummy,
} from './services/myProfileService';
import {
  AddRequestFormState,
  AddRequestValidationErrors,
  MyProfileSnapshot,
  ProfileTab,
  SettingsState,
  TeamMember,
  VacationRequestType,
} from './types';
import { hasAddRequestErrors, validateAddRequest } from './validation';

type MyProfileView = 'profile' | 'settings';
type TimePickerType = 'from' | 'to' | null;

interface MyProfileFlowProps {
  onBackToProjects: () => void;
  onOpenMessenger: () => void;
  onOpenEmployees: () => void;
}

export function MyProfileFlow({
  onBackToProjects,
  onOpenMessenger,
  onOpenEmployees,
}: MyProfileFlowProps) {
  const [snapshot, setSnapshot] = useState<MyProfileSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<MyProfileView>('profile');
  const [activeTab, setActiveTab] = useState<ProfileTab>('projects');

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [timePicker, setTimePicker] = useState<TimePickerType>(null);

  const [vacationDaysLeft, setVacationDaysLeft] = useState(0);
  const [vacations, setVacations] = useState<MyProfileSnapshot['vacationRequests']>([]);
  const [settings, setSettings] = useState<SettingsState | null>(null);

  const [requestForm, setRequestForm] = useState<AddRequestFormState>(emptyAddRequestForm);
  const [requestErrors, setRequestErrors] = useState<AddRequestValidationErrors>({});
  const [sendingRequest, setSendingRequest] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchMyProfileSnapshot();
        setSnapshot(response);
        setVacations(response.vacationRequests);
        setVacationDaysLeft(response.vacationDaysLeft);
        setSettings(response.settings);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const team = snapshot?.team ?? [];

  const teamMap = useMemo(
    () =>
      team.reduce<Record<string, TeamMember>>((acc, member) => {
        acc[member.id] = member;
        return acc;
      }, {}),
    [team],
  );

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading profile...</Text>;
  }

  if (!snapshot || !settings) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Profile is unavailable.</Text>;
  }

  const settingsState = settings;

  const saveSettings = (next: SettingsState) => {
    setSettings(next);
    void saveProfileSettingsDummy(next);
  };

  const openAddRequest = () => {
    setRequestForm(emptyAddRequestForm);
    setRequestErrors({});
    setRequestOpen(true);
  };

  const submitRequest = async () => {
    const errors = validateAddRequest(requestForm, vacationDaysLeft);
    setRequestErrors(errors);

    if (hasAddRequestErrors(errors)) {
      return;
    }

    const nextId = `vr-${Date.now()}`;
    const payload = buildVacationRequestFromForm(requestForm, nextId);

    try {
      setSendingRequest(true);
      const response = await submitVacationRequestDummy(payload);
      setVacations((prev) => [response, ...prev]);

      if (requestForm.type === 'vacation' && requestForm.mode === 'days') {
        setVacationDaysLeft((prev) => Math.max(prev - requestForm.selectedDays.length, 0));
      }

      setRequestOpen(false);
      Alert.alert('Request sent', 'Your request has been submitted in dummy mode.');
    } finally {
      setSendingRequest(false);
    }
  };

  const calculatedHoursLabel = useMemo(() => {
    if (requestForm.mode !== 'hours') {
      return '0h';
    }

    const from = toMinutes(requestForm.fromTime);
    const to = toMinutes(requestForm.toTime);

    if (from === null || to === null || to <= from) {
      return '0h';
    }

    const duration = to - from;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  }, [requestForm.fromTime, requestForm.mode, requestForm.toTime]);

  return (
    <>
      {view === 'profile' ? (
        <MyProfileMainScreen
          user={snapshot.user}
          tab={activeTab}
          tabs={profileTabs}
          projects={snapshot.projects}
          team={snapshot.team}
          vacations={vacations}
          teamMap={teamMap}
          onTabChange={setActiveTab}
          onOpenSettings={() => setView('settings')}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenAddRequest={openAddRequest}
          onOpenMessenger={onOpenMessenger}
          onOpenEmployees={onOpenEmployees}
          onBackToProjects={onBackToProjects}
        />
      ) : (
        <ProfileSettingsScreen
          settings={settingsState}
          onBack={() => setView('profile')}
          onOpenMessenger={onOpenMessenger}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onToggleSection={(section) => {
            const next: SettingsState = {
              ...settingsState,
              expandedSection: settingsState.expandedSection === section ? null : section,
            };

            saveSettings(next);
          }}
          onToggleIssueActivity={(value) => {
            saveSettings({
              ...settingsState,
              notifications: {
                ...settingsState.notifications,
                issueActivity: value,
              },
            });
          }}
          onToggleTrackingActivity={(value) => {
            saveSettings({
              ...settingsState,
              notifications: {
                ...settingsState.notifications,
                trackingActivity: value,
              },
            });
          }}
          onToggleNewComments={(value) => {
            saveSettings({
              ...settingsState,
              notifications: {
                ...settingsState.notifications,
                newComments: value,
              },
            });
          }}
          onToggleQuietAfterNine={(value) => {
            saveSettings({
              ...settingsState,
              notifications: {
                ...settingsState.notifications,
                quietAfterNine: value,
              },
            });
          }}
        />
      )}

      <NotificationsModal
        visible={notificationsOpen}
        notifications={snapshot.notifications}
        onClose={() => setNotificationsOpen(false)}
      />

      <AddRequestModal
        visible={requestOpen}
        form={requestForm}
        errors={requestErrors}
        dayGrid={monthDays}
        requestTypeOptions={requestTypeOptions}
        calculatedHoursLabel={calculatedHoursLabel}
        sending={sendingRequest}
        onClose={() => setRequestOpen(false)}
        onChangeType={(value: VacationRequestType) => {
          setRequestForm((prev) => ({ ...prev, type: value }));
          setRequestErrors((prev) => ({ ...prev, selectedDays: undefined }));
        }}
        onChangeMode={(value) => {
          setRequestForm((prev) => ({ ...prev, mode: value }));
          setRequestErrors({});
        }}
        onSelectDay={(day) => {
          setRequestForm((prev) => {
            if (prev.mode === 'hours') {
              return { ...prev, selectedDays: [day] };
            }

            if (prev.selectedDays.length === 0) {
              return { ...prev, selectedDays: [day] };
            }

            if (prev.selectedDays.length === 1 && prev.selectedDays[0] !== day) {
              const start = Math.min(prev.selectedDays[0], day);
              const end = Math.max(prev.selectedDays[0], day);
              const range = Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
              return { ...prev, selectedDays: range };
            }

            return { ...prev, selectedDays: [day] };
          });

          setRequestErrors((prev) => ({ ...prev, selectedDays: undefined }));
        }}
        onOpenFromTime={() => setTimePicker('from')}
        onOpenToTime={() => setTimePicker('to')}
        onChangeComment={(value) => {
          setRequestForm((prev) => ({ ...prev, comment: value }));
        }}
        onSubmit={() => {
          void submitRequest();
        }}
      />

      <OptionPickerModal
        visible={timePicker !== null}
        title={timePicker === 'from' ? 'From time' : 'To time'}
        options={timeOptions}
        onClose={() => setTimePicker(null)}
        onSelect={(value) => {
          if (timePicker === 'from') {
            setRequestForm((prev) => ({ ...prev, fromTime: value }));
            setRequestErrors((prev) => ({ ...prev, fromTime: undefined }));
          }

          if (timePicker === 'to') {
            setRequestForm((prev) => ({ ...prev, toTime: value }));
            setRequestErrors((prev) => ({ ...prev, toTime: undefined }));
          }
        }}
      />
    </>
  );
}

function toMinutes(value: string): number | null {
  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (match[3] === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (match[3] === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}
