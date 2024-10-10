import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useTodosContext } from '@/hooks/useTodosContext'
import { useAuthContext } from '@/hooks/useAuthContext'

export default function CreateTodo() {
    const { dispatch } = useTodosContext()
    const { authState } = useAuthContext()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState("")

    const handleTodoCreation = async () => {
        setIsPending(true)

        if (!authState.user) {
            setIsPending(false)
            setError("Nincs bejelentkezve!")
            return
        }

        const response = await fetch("http://localhost:3000/todos/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authState.user?.token}`
            },
            body: JSON.stringify({ userId: authState.user.id, title, description, completed: false })
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsPending(false)
            return
        }

        if (json) {
            setTitle("")
            setDescription("")
            setIsPending(false)
            dispatch({ type: "ADD_TODO", payload: json.todo })
        }
    }

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title">
                    Cím
                </Label>
                <Input
                    required={true}
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isPending}
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description">
                    Rövid leírás
                </Label>
                <Input
                    required={true}
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isPending}
                    className="col-span-3"
                />
            </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Button
                    onClick={() => handleTodoCreation()}
                    disabled={isPending}>
                        Létrehozás
                </Button>
            </div>
        </>
    )
}
