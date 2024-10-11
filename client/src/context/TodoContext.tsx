import { createContext, ReactNode, useReducer } from "react";

type TodoContextProps = {
    todoState: TodoState;
    dispatch: (action: TodoAction) => void;
}

export const TodosContext = createContext({} as TodoContextProps);

type Todo = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

type TodoState = {
    todos: Todo[];
    dispatch?: React.Dispatch<TodoAction>
}

type TodoAction = {
    type: string;
    payload?: any;
}

export const todosReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
      case "SET_TODOS":
        return {
          todos: Array.isArray(action.payload!) ? action.payload! : [action.payload!],
        };
      case "ADD_TODO":
        return {
          todos: [action.payload!, ...state.todos],
        };
      case "REMOVE_TODO":
        return {
          todos: state.todos.filter(todo => todo.id !== action.payload!.id),
        };
      case "TOGGLE_TODO":
        return {
          todos: state.todos.map(todo => todo.id === action.payload!.id ? {...todo, completed: !todo.completed} : todo),
        };
      default:
        return state;
    }
};

export const TodosContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todosReducer, {
        todos: [],
        dispatch: () => {}
    })

    return (
        <TodosContext.Provider value={{ todoState: state, dispatch }}>
             { children }
        </TodosContext.Provider>
    )
}
