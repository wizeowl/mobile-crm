export interface VacationEmployeeBalance {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  vacations: number;
  sickLeave: number;
  workRemotely: number;
}

export interface VacationsSnapshot {
  employees: VacationEmployeeBalance[];
}
