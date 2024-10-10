import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function CreateTodo() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState("")

    const handleTodoCreation = async () => {
        setIsPending(true)

        const response = await fetch("http://localhost:3000/todos/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, completed: false }),
        })

        if (!response.ok) {
            const errorData = await response.json()

            setError(errorData.error)
            setIsPending(false)
            return
        }

        const data = await response.json()

        if (data) {
            setTitle("")
            setDescription("")
            setIsPending(false)
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
