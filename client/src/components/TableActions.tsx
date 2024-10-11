import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { useTodosContext } from "@/hooks/useTodosContext"
import { useAuthContext } from "@/hooks/useAuthContext"


export default function TableActions({ id }: { id: string }) {
    const { dispatch } = useTodosContext()
    const { authState } = useAuthContext()

    const handleDelete = async (id: string) => {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authState?.user?.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "REMOVE_TODO", payload: json.todo._id })
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Műveletek</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:text-red-300 focus:bg-red-950 cursor-pointer" onClick={() => handleDelete(id)}>Törlés</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
