import { Todo, TodoPriorityEnum, TodoStatusEnum } from "./types/todo";

export const PRIORITY_DROPDOWN_LABELS = {
  "ALL": "All",
  [TodoPriorityEnum.NONE]: "None",
  [TodoPriorityEnum.URGENT]: "Urgent",
  [TodoPriorityEnum.HIGH]: "High",
  [TodoPriorityEnum.MEDIUM]: "Medium",
  [TodoPriorityEnum.LOW]: "Low",
}


export const STATUS_DROPDOWN_LABELS = {
  "ALL": "All",
  [TodoStatusEnum.NOT_STARTED]: 'Not Started',
  [TodoStatusEnum.IN_PROGRESS]: 'In Progress',
  [TodoStatusEnum.COMPLETED]: 'Completed'
};

export const SORT_BY: Record<string, keyof Todo> = {
  TITLE: "title",
  STATUS: "status",
  PRIORITY: "priority"
}

export const SEARCH_DEBOUNCE_TIME = 300;

export const ALL_SELECTION_VALUE = 'ALL';
