import { vacationsSnapshot } from '../data/vacationsDummyData';
import { VacationsSnapshot } from '../types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchVacationsSnapshot(): Promise<VacationsSnapshot> {
  await sleep(350);

  return {
    employees: vacationsSnapshot.employees.map((employee) => ({ ...employee })),
  };
}
