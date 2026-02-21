import { employeesSnapshot } from '../data/employeesDummyData';
import { EmployeeSummary, EmployeesSnapshot } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchEmployeesSnapshot(): Promise<EmployeesSnapshot> {
  await sleep(420);

  return {
    employees: employeesSnapshot.employees.map((employee) => ({ ...employee })),
    projectsByEmployeeId: Object.fromEntries(
      Object.entries(employeesSnapshot.projectsByEmployeeId).map(([employeeId, projects]) => [
        employeeId,
        projects.map((project) => ({ ...project, assigneeIds: [...project.assigneeIds] })),
      ]),
    ),
    vacationsByEmployeeId: Object.fromEntries(
      Object.entries(employeesSnapshot.vacationsByEmployeeId).map(([employeeId, vacations]) => [
        employeeId,
        vacations.map((vacation) => ({ ...vacation })),
      ]),
    ),
  };
}

export async function approveEmployeesDummy(emails: string[]): Promise<EmployeeSummary[]> {
  await sleep(380);

  return emails.map((email, index) => createEmployeeFromEmail(email, index));
}

function createEmployeeFromEmail(email: string, index: number): EmployeeSummary {
  const [local] = email.split('@');
  const nameParts = local
    .replace(/[^a-z0-9._-]/gi, '')
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

  const fallbackName = `Member ${index + 1}`;
  const displayName =
    nameParts.length > 0 ? `${nameParts.join(' ')}${nameParts.length === 1 ? ' User' : ''}` : fallbackName;

  const seniorityPool: EmployeeSummary['seniority'][] = ['Junior', 'Middle', 'Senior'];

  return {
    id: `emp-new-${Date.now()}-${index}`,
    name: displayName,
    email,
    gender: index % 2 === 0 ? 'Male' : 'Female',
    birthDate: 'Apr 12, 1995',
    age: 25,
    position: 'Product Designer',
    seniority: seniorityPool[index % seniorityPool.length],
    avatarColor: index % 2 === 0 ? '#a8c9f1' : '#e4c1bd',
    company: 'Cadabra',
    location: 'NYC, New York, USA',
    phone: '+1 675 346 00-00',
    skype: `New ${index + 1}`,
    role: 'Product Designer',
    backlogTasks: 0,
    inProgressTasks: 0,
    inReviewTasks: 0,
  };
}
