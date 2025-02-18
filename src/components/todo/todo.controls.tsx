import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { debounced } from "../../utils";
import { TodoActions } from "../../store/todo/todo.actions";
import { SEARCH_DEBOUNCE_TIME } from "../../constants";
import { StatusSelect } from "../select/select.status";
import { PrioritySelect } from "../select/select.priority";
import { TodoAddEditModal } from "./todo.add";

export const TodoControls = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { priority, status } = useSelector((state: RootState) => state.todos.filters);

  const dispatch = useDispatch();

  const toggleShowModal = () => {
    setShowAddModal(!showAddModal);
  };

  const setPage = (val: number) => {
    dispatch({
      type: TodoActions.UPDATE_PAGE,
      payload: {
        currentPage: val
      }
    });
  }

  const setTitleFilter = debounced((e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.trim();
    try {
      dispatch({
        type: TodoActions.UPDATE_FILTER,
        payload: {
          filters: {
            title: value || ''
          }
        }
      });
    } catch (e) {
      console.error("error in filtering todos", e);
    }
    setPage(1);
  }, SEARCH_DEBOUNCE_TIME);

  const setFilter = (key: string, value: string) => {
    dispatch({
      type: TodoActions.UPDATE_FILTER,
      payload: {
        filters: {
          [key]: value
        }
      }
    });
    setPage(1);
  };

  return <>
    <div className="todo_controls">
      <input type="search" placeholder="Search by title" onChange={setTitleFilter} />
      <StatusSelect defaultValue={status} onChange={(value) => setFilter('status', value)} extraOptions={['ALL']} />
      <PrioritySelect defaultValue={priority} onChange={(value) => setFilter('priority', value)} extraOptions={['ALL']} />
      <button onClick={toggleShowModal}>add</button>
    </div>
    {showAddModal && <TodoAddEditModal onClose={toggleShowModal} />}
  </>
}
