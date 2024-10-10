import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError("")

        const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return
        }

        // set user to local storage
        localStorage.setItem('user', JSON.stringify(json))

        // update the auth context
        dispatch({ type: "LOGIN", payload: json })

        // update loading state
        setIsLoading(false)
    }

    return { login, isLoading, error }
}
