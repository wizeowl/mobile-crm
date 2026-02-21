export type FabActionKey =
  | 'project'
  | 'task'
  | 'event'
  | 'request'
  | 'employee'
  | 'info-folder';

export interface FabActionItem {
  key: FabActionKey;
  label: string;
  iconLabel: string;
}
