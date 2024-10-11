import { createContext, useReducer, useEffect, ReactNode } from "react";

type AuthContextProps = {
    authState: AuthState;
    dispatch: (action: AuthAction) => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type User = {
    id: string
    name: string
    email: string
    token: string
}

type AuthState = {
    user: User;
    dispatch?: React.Dispatch<AuthAction>;
}

type AuthAction = {
    type: "LOGIN" | "LOGOUT";
    payload?: any;
}

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        dispatch: () => {}
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : null

        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ authState: state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}
