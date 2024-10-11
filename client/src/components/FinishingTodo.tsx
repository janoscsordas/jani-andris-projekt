import { Checkbox } from "@/components/ui/checkbox"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useTodosContext } from "@/hooks/useTodosContext"
import { useState } from "react"


export default function FinishingTodo({ completed, id }: { completed: boolean, id: string }) {
    const { dispatch } = useTodosContext()
    const { authState } = useAuthContext()

    // Local state for optimistic UI updates
    const [localCompleted, setLocalCompleted] = useState(completed)

    const handleToggle = async (id: string) => {
        const newCompleted = !localCompleted
        // update local state
        setLocalCompleted(newCompleted)

        const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authState?.user?.token}`,
            },
            body: JSON.stringify({ completed: newCompleted }),
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "TOGGLE_TODO", payload: json.todo._id })
        } else {
            setLocalCompleted(completed)
        }
    }

    return (
        <div className="flex items-center">
            <Checkbox
                checked={localCompleted} // Use local state for instant UI feedback
                id={id}
                onCheckedChange={() => handleToggle(id)}
            />
        </div>
    )
}
