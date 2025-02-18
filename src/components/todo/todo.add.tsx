import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TodoPriorityEnum, TodoStatusEnum } from "../../types/todo";
import { TodoActions } from "../../store/todo/todo.actions";
import { PrioritySelect } from "../select/select.priority";
import { StatusSelect } from "../select/select.status";

export const TodoAddEditModal: React.FC<{ onClose: () => void, todoId?: number }> = ({ onClose, todoId = -1 }) => {
  const todo = useSelector((state: RootState) => state.todos.todosById[todoId] || null);
  const [title, setTitle] = useState(todo?.title || "");
  const [changed, setChanged] = useState(false);
  const [priority] = useState(todo?.priority || TodoPriorityEnum.NONE);
  const [status] = useState(todo?.status || TodoStatusEnum.NOT_STARTED);
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target) {
      const formData = new FormData(e.target as HTMLFormElement);
      const data: Record<string, string> = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value.toString();
      }
      if (todo) {
        dispatch({
          type: TodoActions.EDIT_TODO,
          payload: {
            id: todoId,
            todo: {
              ...data
            }
          }
        });
      } else {
        dispatch({
          type: TodoActions.ADD_TODO,
          payload: {
            todo: {
              ...data
            },
          }
        })
      }
      onClose();
    }
  }

  return <div className="modal">
    <div className="modal_content">
      <form className="form_add" onSubmit={onSubmit}>
        <div className="form_field">
          <input
            className="form_input--name"
            name="title"
            placeholder="Issue title"
            value={title}
            onChange={e => {
              setChanged(true);
              setTitle(e.target.value.trim())
            }}
          />
        </div>
        <PrioritySelect
          defaultValue={priority}
          onChange={() => setChanged(true)}
        />
        <StatusSelect
          defaultValue={status}
          onChange={() => setChanged(true)}
        />
        <div className="modal_footer">
          <button className="btn-secondary" aria-label="Close modal" onClick={onClose}>
            cancel
          </button>
          <button disabled={!title || !changed}>
            {todo ? 'save' : 'create'}
          </button>
        </div>
      </form>
    </div>
  </div>
}
