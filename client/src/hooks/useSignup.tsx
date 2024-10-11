import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState("")

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true)
        setError("")

        const response = await fetch("http://localhost:3000/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return
        }

        setIsLoading(false)
        setSuccess("Sikeres regisztráció! Átugrás a bejelentkezés oldalra 3 mp múlva!")
    }

    return { signup, isLoading, error, success }
}
