import { useEffect, useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';

import { createEmptyAddEmployeeForm } from './data/employeesDummyData';
import { AddEmployeeOverlay, EmployeeProfileScreen, EmployeesHomeScreen } from './screens/EmployeesScreens';
import { approveEmployeesDummy, fetchEmployeesSnapshot } from './services/employeesService';
import {
  AddEmployeeFormState,
  AddEmployeeValidationErrors,
  EmployeeProjectSummary,
  EmployeeProfileTab,
  EmployeeSummary,
  EmployeeVacationSummary,
  EmployeesTab,
} from './types';
import { hasAddEmployeeErrors, validateAddEmployee } from './validation';

type EmployeesView = 'home' | 'profile';

interface EmployeesFlowProps {
  onBackToProfile: () => void;
  onOpenMessenger: () => void;
}

export function EmployeesFlow({ onBackToProfile, onOpenMessenger }: EmployeesFlowProps) {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeSummary[]>([]);
  const [projectsByEmployeeId, setProjectsByEmployeeId] = useState<
    Record<string, EmployeeProjectSummary[]>
  >({});
  const [vacationsByEmployeeId, setVacationsByEmployeeId] = useState<
    Record<string, EmployeeVacationSummary[]>
  >({});

  const [view, setView] = useState<EmployeesView>('home');
  const [activeTab, setActiveTab] = useState<EmployeesTab>('list');
  const [profileTab, setProfileTab] = useState<EmployeeProfileTab>('projects');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState<AddEmployeeFormState>(createEmptyAddEmployeeForm);
  const [addErrors, setAddErrors] = useState<AddEmployeeValidationErrors>({ emails: [''] });
  const [savingAdd, setSavingAdd] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchEmployeesSnapshot();
        setEmployees(response.employees);
        setProjectsByEmployeeId(response.projectsByEmployeeId);
        setVacationsByEmployeeId(response.vacationsByEmployeeId);
        setSelectedEmployeeId(response.employees[0]?.id ?? '');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === selectedEmployeeId) ?? employees[0] ?? null,
    [employees, selectedEmployeeId],
  );

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading employees...</Text>;
  }

  if (!selectedEmployee) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>No employees available.</Text>;
  }

  const selectedProjects = (projectsByEmployeeId[selectedEmployee.id] ?? []).map((project) => ({
    ...project,
    assigneeColors: project.assigneeIds
      .map((employeeId: string) => employees.find((member) => member.id === employeeId)?.avatarColor)
      .filter((color): color is string => Boolean(color)),
  }));

  const selectedVacations = vacationsByEmployeeId[selectedEmployee.id] ?? [];

  const openAddModal = () => {
    setAddForm(createEmptyAddEmployeeForm());
    setAddErrors({ emails: [''] });
    setSavingAdd(false);
    setAddModalOpen(true);
  };

  const approve = async () => {
    const errors = validateAddEmployee(addForm);
    setAddErrors(errors);

    if (hasAddEmployeeErrors(errors)) {
      return;
    }

    try {
      setSavingAdd(true);
      const preparedEmails = addForm.emails.map((email) => email.trim()).filter(Boolean);
      const createdEmployees = await approveEmployeesDummy(preparedEmails);

      setEmployees((prev) => [...createdEmployees, ...prev]);
      setProjectsByEmployeeId((prev) => ({
        ...prev,
        ...Object.fromEntries(
          createdEmployees.map((employee) => [
            employee.id,
            [
              {
                id: `${employee.id}-project-new`,
                code: 'PN0001299',
                name: 'New Employee Onboarding',
                createdDate: 'Created Today',
                activeTasks: 3,
                assigneeIds: [employee.id],
                status: 'in-progress',
              },
            ],
          ]),
        ),
      }));
      setVacationsByEmployeeId((prev) => ({
        ...prev,
        ...Object.fromEntries(
          createdEmployees.map((employee) => [
            employee.id,
            [
              {
                id: `${employee.id}-vacation-new`,
                requestType: 'Vacation',
                periodLabel: 'No requests yet',
                durationLabel: '0d',
                status: 'pending',
              },
            ],
          ]),
        ),
      }));

      setAddModalOpen(false);
      Alert.alert('Approved', 'Employees were added in dummy mode.');
    } finally {
      setSavingAdd(false);
    }
  };

  return (
    <>
      {view === 'home' ? (
        <EmployeesHomeScreen
          totalEmployees={employees.length}
          activeTab={activeTab}
          employees={employees}
          onChangeTab={setActiveTab}
          onOpenEmployeeProfile={(employeeId) => {
            setSelectedEmployeeId(employeeId);
            setProfileTab('projects');
            setView('profile');
          }}
          onOpenAddEmployee={openAddModal}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onBackToProfile}
          onOpenNotifications={() => {
            Alert.alert('Notifications', 'Notifications are available in profile settings.');
          }}
        />
      ) : (
        <EmployeeProfileScreen
          employee={selectedEmployee}
          profileTab={profileTab}
          projects={selectedProjects}
          vacations={selectedVacations}
          team={employees}
          onBack={() => setView('home')}
          onChangeTab={setProfileTab}
          onOpenMessenger={onOpenMessenger}
          onOpenProfile={onBackToProfile}
          onOpenNotifications={() => {
            Alert.alert('Notifications', 'Notifications are available in profile settings.');
          }}
        />
      )}

      <AddEmployeeOverlay
        visible={addModalOpen}
        emails={addForm.emails}
        errors={addErrors.emails}
        loading={savingAdd}
        onClose={() => setAddModalOpen(false)}
        onChangeEmail={(index, value) => {
          setAddForm((prev) => {
            const next = [...prev.emails];
            next[index] = value;
            return { ...prev, emails: next };
          });

          setAddErrors((prev) => {
            const next = [...prev.emails];
            next[index] = '';
            return { emails: next };
          });
        }}
        onAddEmailRow={() => {
          setAddForm((prev) => ({ ...prev, emails: [...prev.emails, ''] }));
          setAddErrors((prev) => ({ emails: [...prev.emails, ''] }));
        }}
        onApprove={() => {
          void approve();
        }}
      />
    </>
  );
}
