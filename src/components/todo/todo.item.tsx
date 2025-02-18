import { useDispatch, useSelector } from "react-redux";
import { PRIORITY_DROPDOWN_LABELS, STATUS_DROPDOWN_LABELS } from "../../constants";
import { RootState } from "../../store/store";
import { useState } from "react";
import { TodoActions } from "../../store/todo/todo.actions";
import { TodoAddEditModal } from "./todo.add";

export const TodoItem: React.FC<{ todoId: number }> = ({ todoId }) => {
  const todo = useSelector((state: RootState) => state.todos.todosById[todoId]);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  if (!todo) {
    return null;
  }

  const deleteTodo = () => {
    if (confirm("Do you want to delete '" + todo.title + "' ?")) {
      dispatch({
        type: TodoActions.DELETE_TODO,
        payload: {
          id: todoId
        }
      });
    }
  }

  return <>
    <li className="todos_item">
      <p className="todos_cell todo_cell--2x" title={todo.title} onClick={() => setEditMode(true)}>
        {todo.title}
      </p>
      <p className="todos_cell" title={STATUS_DROPDOWN_LABELS[todo.status]}>
        {STATUS_DROPDOWN_LABELS[todo.status]}
      </p>
      <p className="todos_cell" title={PRIORITY_DROPDOWN_LABELS[todo.priority]}>
        {PRIORITY_DROPDOWN_LABELS[todo.priority]}
      </p>
      <div className="todos_actions">
        <button className="--icon">
          <i className="fa fa-edit"></i>
        </button>
        <button className="--icon" onClick={deleteTodo}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
    {editMode && <TodoAddEditModal
      todoId={todoId}
      onClose={() => setEditMode(false)}
    />}
  </>
};
