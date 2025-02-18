import { TodoActions, TodoActionType } from "./todo.actions";
import { initialState } from "./todo.initialstate"


export const todoReducer = (state = initialState, action: TodoActionType) => {
  switch (action.type) {
    case TodoActions.ADD_TODO: {
      try {
        const { todo } = action?.payload || {};
        if (todo) {
          const newId = Date.now();
          const newState = structuredClone(state);
          newState.todoIds = [newId, ...state.todoIds];
          newState.todosById[newId] = todo;
          return newState;
        }
      } catch (e) {
        console.error("failure in ADD_TODO", action, e);
        return state;
      }
      console.error("invalid payload ADD_TODO", action);
      return state;
    }
    case TodoActions.EDIT_TODO: {
      try {
        const { id, todo } = action?.payload || {};
        if (id && todo) {
          const newState = structuredClone(state);
          newState.todosById[id] = todo;
          return newState;
        }
      } catch (e) {
        console.error("failure in EDIT_TODO", action, e);
        return state;
      }
      console.error("invalid payload EDIT_TODO", action);
      return state;
    };
    case TodoActions.DELETE_TODO: {
      try {
        const { id } = action.payload || {};
        if (id) {
          const newState = structuredClone(state);
          newState.todoIds = state.todoIds.filter(todoId => todoId !== id)
          delete newState.todosById[id];
          return newState;
        }
      } catch (e) {
        console.error("failure in DELETE_TODO", action, e);
        return state;
      }
      console.error("invalid payload in DELETE_TODO", action);
      return state;
    }
    case TodoActions.UPDATE_SORT: {
      try {
        const { sortBy, sortOrder } = action.payload || {};
        if (sortBy && sortOrder) {
          const newState = structuredClone(state);
          newState.sortBy = sortBy;
          newState.sortOrder = sortOrder;
          return newState;
        }
      } catch (e) {
        console.error("failure in UPDATE_SORT", action, e);
        return state;
      }
      console.error("invalid payload in UPDATE_SORT", action);
      return state;
    }
    case TodoActions.UPDATE_FILTER: {
      try {
        const {
          title = state.filters.title,
          status = state.filters.status,
          priority = state.filters.priority
        } = action.payload?.filters || {};
        const newState = structuredClone(state);
        newState.filters = {
          title: title || '',
          status: status || state.filters.status,
          priority: priority || state.filters.priority
        };
        return newState;
      } catch (e) {
        console.error("failure in UPDATE_FILTER", action, e);
        return state;
      }
    }
    case TodoActions.UPDATE_PAGE_SIZE: {
      try {
        const { pageSize } = action.payload || {};
        if (pageSize) {
          const newState = structuredClone(state);
          newState.pageSize = pageSize;
          return newState;
        }
      } catch (e) {
        console.error("failure in UPDATE_PAGE_SIZE", action, e);
        return state;
      }
      console.error("invalid payload in UPDATE_PAGE_SIZE", action);
      return state;
    }
    case TodoActions.UPDATE_PAGE: {
      try {
        const { currentPage } = action.payload || {};
        if (currentPage) {
          const newState = structuredClone(state);
          newState.currentPage = currentPage;
          return newState;
        }
      } catch (e) {
        console.error("failure in UPDATE_PAGE", action, e);
        return state;
      }
      console.error("invalid payload in UPDATE_PAGE", action);
      return state;
    }
    default: {
      console.log("state", state)
      return state;
    }
  }
};

export default todoReducer;
