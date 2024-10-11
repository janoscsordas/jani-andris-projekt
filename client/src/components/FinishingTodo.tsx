import { Checkbox } from "@/components/ui/checkbox"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useTodosContext } from "@/hooks/useTodosContext"

export default function FinishingTodo({ completed, id }: { completed: boolean, id: string }) {
    const { authState } = useAuthContext()
    const { dispatch } = useTodosContext()

    const handleToggle = async (id: string) => {
        const newCompleted = !completed

        // Sync with the backend
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
        }
    }

    return (
        <div className="flex items-center">
            <Checkbox
                checked={completed} // Reflect the `completed` state passed from parent
                id={id}
                onCheckedChange={() => handleToggle(id)} // Optimistic UI first, then backend sync
            />
        </div>
    )
}
