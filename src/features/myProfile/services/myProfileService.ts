import { myProfileSnapshot } from '../data/myProfileDummyData';
import {
  MyProfileSnapshot,
  SettingsState,
  VacationRequest,
} from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchMyProfileSnapshot(): Promise<MyProfileSnapshot> {
  await sleep(450);

  return {
    ...myProfileSnapshot,
    projects: [...myProfileSnapshot.projects],
    team: [...myProfileSnapshot.team],
    vacationRequests: [...myProfileSnapshot.vacationRequests],
    notifications: [...myProfileSnapshot.notifications],
    settings: {
      expandedSection: myProfileSnapshot.settings.expandedSection,
      notifications: { ...myProfileSnapshot.settings.notifications },
    },
  };
}

export async function submitVacationRequestDummy(
  request: VacationRequest,
): Promise<VacationRequest> {
  await sleep(600);
  return request;
}

export async function saveProfileSettingsDummy(
  settings: SettingsState,
): Promise<SettingsState> {
  await sleep(250);
  return settings;
}
