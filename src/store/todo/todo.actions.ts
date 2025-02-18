import { Todo, TodoPriorityEnum, TodoStatusEnum } from "../../types/todo";

export const TodoActions = {
  "ADD_TODO": "ADD_TODO",
  "EDIT_TODO": "EDIT_TODO",
  "DELETE_TODO": "DELETE_TODO",
  "UPDATE_SORT": "UPDATE_SORT",
  "UPDATE_FILTER": "UPDATE_FILTER",
  "UPDATE_PAGE_SIZE": "UPDATE_PAGE_SIZE",
  "UPDATE_PAGE": "UPDATE_PAGE",
}

export type TodoActionType = {
  type: keyof typeof TodoActions,
  payload?: {
    id?: number,
    todo?: Todo,
    sortBy?: keyof Todo,
    sortOrder?: 'asc' | 'desc',
    pageSize?: number,
    currentPage?: number,
    filters?: {
      title?: string,
      status?: TodoStatusEnum | 'ALL',
      priority?: TodoPriorityEnum | 'ALL'
    }
  }
};

export default {};
