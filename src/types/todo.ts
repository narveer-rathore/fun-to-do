export enum TodoStatusEnum {
  IN_PROGRESS = 'in_progress',
  NOT_STARTED = 'not_started',
  COMPLETED = 'completed',
};

export enum TodoPriorityEnum {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
};

export type Todo = {
  id: number,
  title: string,
  status: TodoStatusEnum,
  priority: TodoPriorityEnum,
}
