import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useMemo, useState } from "react";
import { ALL_SELECTION_VALUE, SORT_BY } from "../../constants";
import { Todo } from "../../types/todo";
import { TodoActions } from "../../store/todo/todo.actions";
import { TodoItem } from "./todo.item";
import { Pagination } from "./todo.pagination";

export const TodosList = ({ todos }: { todos: number[] }) => {
  const todosById = useSelector((state: RootState) => state.todos.todosById);
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);
  const sortOrder = useSelector((state: RootState) => state.todos.sortOrder);
  const pageSize = useSelector((state: RootState) => state.todos.pageSize);
  const currentPage = useSelector((state: RootState) => state.todos.currentPage);
  const [totalPages, setTotalPages] = useState(1);

  const { title, priority, status } = useSelector((state: RootState) => state.todos.filters);

  const dispatch = useDispatch();

  const filtered = useMemo(() => {
    const todoClone = [...todos].filter(t => {
      if (title && !todosById[t].title.replace(" ", "").toLowerCase().includes(title.toLowerCase())) {
        console.log("returning false for title", title, todosById[t].title);
        return false;
      }
      if (priority !== ALL_SELECTION_VALUE && priority !== todosById[t].priority) {
        return false;
      }
      if (status !== ALL_SELECTION_VALUE && status !== todosById[t].status) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOrder === 'desc') {
        return String(todosById[b as number][sortBy]).localeCompare(String(todosById[a][sortBy]));
      }
      return String(todosById[a as number][sortBy]).localeCompare(String(todosById[b][sortBy]));
    });
    setTotalPages(Math.ceil(todoClone.length / pageSize));
    return todoClone.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [todos, todosById, sortBy, sortOrder, title, priority, status, pageSize, currentPage]);

  const updateSort = (key: keyof Todo) => {
    const nextOrder = (key === sortBy) ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    console.log("updateSort", key, nextOrder);
    dispatch({
      type: TodoActions.UPDATE_SORT,
      payload: {
        sortBy: key,
        sortOrder: nextOrder
      }
    });
  }

  const getSortIcon = (key: string) => {
    if (sortBy === key) {
      return sortOrder === 'asc' ? 'fa-caret-down' : 'fa-caret-up';
    }
    return 'fa-sort';
  }

  const setPageSize = (val: string) => {
    const value = parseInt(val, 10);
    dispatch({
      type: TodoActions.UPDATE_PAGE_SIZE,
      payload: {
        pageSize: value
      }
    });
  }

  const setPage = (val: number) => {
    dispatch({
      type: TodoActions.UPDATE_PAGE,
      payload: {
        currentPage: val
      }
    });
  }

  return <>
    <Pagination setPageSize={setPageSize} setPage={setPage} page={currentPage} totalPages={totalPages} />
    <ul className="todos_list">
      <li className="todos_item todos_item--header">
        <button className="todos_cell todo_cell--2x" onClick={() => updateSort(SORT_BY.TITLE)}>
          Title
          <i className={`fa ${getSortIcon(SORT_BY.TITLE)} ${sortBy === SORT_BY.TITLE ? 'active' : ''}`}></i>
        </button>
        <button className="todos_cell" onClick={() => updateSort(SORT_BY.STATUS)}>
          Status
          <i className={`fa ${getSortIcon(SORT_BY.STATUS)} ${sortBy === SORT_BY.STATUS ? 'active' : ''}`}></i>
        </button>
        <button className="todos_cell" onClick={() => updateSort(SORT_BY.PRIORITY)}>
          Priority
          <i className={`fa ${getSortIcon(SORT_BY.PRIORITY)} ${sortBy === SORT_BY.PRIORITY ? 'active' : ''}`}></i>
        </button>
        <div className="todos_actions">
          {/* bulk actions ? */}
        </div>
      </li>
      {
        filtered.map(todoId =>
          <TodoItem key={todoId} todoId={todoId} />
        )
      }
    </ul>
  </>
}
