import { Todo, TodoPriorityEnum, TodoStatusEnum } from "../../types/todo"
import todosApiResponse from "./../../assets/todos-api.json"

export type TodosInitialStateType = {
  todosById: Record<number, Todo>
  todoIds: number[],
  sortBy: keyof Todo,
  sortOrder: 'asc' | 'desc',
  pageSize: number,
  currentPage: number,
  filters: {
    title: string,
    status: TodoStatusEnum | 'ALL',
    priority: TodoPriorityEnum | 'ALL'
  }
}

const todosById: Record<number, Todo> = {};
const todoIds = [];
for (let i = 0; i < todosApiResponse.length; i++) {
  const todo = todosApiResponse[i];
  todosById[todo.id] = todo as Todo;
  todoIds.push(todo.id);
}

export const initialState: TodosInitialStateType = {
  todosById: todosById,
  todoIds: todoIds,
  sortBy: 'title',
  pageSize: 10,
  currentPage: 1,
  sortOrder: 'asc',
  filters: {
    title: '',
    status: 'ALL',
    priority: 'ALL',
  }
};
