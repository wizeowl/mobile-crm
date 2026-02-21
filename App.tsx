import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AuthFlow } from './src/features/auth/AuthFlow';
import { CalendarFlow } from './src/features/calendar/CalendarFlow';
import { EmployeesFlow } from './src/features/employees/EmployeesFlow';
import { InfoPortalFlow } from './src/features/infoPortal/InfoPortalFlow';
import { MessengerFlow } from './src/features/messenger/MessengerFlow';
import { MyProfileFlow } from './src/features/myProfile/MyProfileFlow';
import { ProjectsFlow } from './src/features/projects/ProjectsFlow';
import { TeamLeadFlow } from './src/features/teamLead/TeamLeadFlow';
import { VacationsFlow } from './src/features/vacations/VacationsFlow';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [workspaceRoute, setWorkspaceRoute] = useState<
    | 'projects'
    | 'my-profile'
    | 'messenger'
    | 'employees'
    | 'team-lead'
    | 'info-portal'
    | 'calendar'
    | 'vacations'
  >('projects');

  return (
    <>
      <StatusBar style="dark" />
      {!signedIn ? (
        <AuthFlow
          onSignedIn={() => {
            setSignedIn(true);
            setWorkspaceRoute('projects');
          }}
        />
      ) : workspaceRoute === 'projects' ? (
        <ProjectsFlow
          onOpenProfile={() => setWorkspaceRoute('my-profile')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
          onOpenTeamLead={() => setWorkspaceRoute('team-lead')}
          onOpenInfoPortal={() => setWorkspaceRoute('info-portal')}
          onOpenCalendar={() => setWorkspaceRoute('calendar')}
          onOpenEmployees={() => setWorkspaceRoute('employees')}
          onOpenVacations={() => setWorkspaceRoute('vacations')}
        />
      ) : workspaceRoute === 'my-profile' ? (
        <MyProfileFlow
          onBackToProjects={() => setWorkspaceRoute('projects')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
          onOpenEmployees={() => setWorkspaceRoute('employees')}
        />
      ) : workspaceRoute === 'employees' ? (
        <EmployeesFlow
          onBackToProfile={() => setWorkspaceRoute('my-profile')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
        />
      ) : workspaceRoute === 'team-lead' ? (
        <TeamLeadFlow
          onBackToProjects={() => setWorkspaceRoute('projects')}
          onOpenProfile={() => setWorkspaceRoute('my-profile')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
        />
      ) : workspaceRoute === 'info-portal' ? (
        <InfoPortalFlow
          onOpenProfile={() => setWorkspaceRoute('my-profile')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
        />
      ) : workspaceRoute === 'calendar' ? (
        <CalendarFlow
          onOpenProfile={() => setWorkspaceRoute('my-profile')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
        />
      ) : workspaceRoute === 'vacations' ? (
        <VacationsFlow
          onOpenProfile={() => setWorkspaceRoute('my-profile')}
          onOpenMessenger={() => setWorkspaceRoute('messenger')}
        />
      ) : (
        <MessengerFlow onOpenProfile={() => setWorkspaceRoute('my-profile')} />
      )}
    </>
  );
}
