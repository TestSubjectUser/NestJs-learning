export interface Task {
  id: string;
  title: string;
  description: string;
  status: taskStatus;
}

export enum taskStatus {
  DONE = 'DONE',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
}
