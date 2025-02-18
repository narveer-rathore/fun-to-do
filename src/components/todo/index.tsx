import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./todo.css";
import { TodoControls } from "./todo.controls";
import { TodoList } from "./todo.list";

export const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.todoIds);

  return <div className="todos_container">
    <TodoControls />
    <TodoList todos={todos} />
  </div>;
}

export default Todos;
