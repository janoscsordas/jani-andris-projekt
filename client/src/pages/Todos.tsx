import { useEffect } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CircleUserRound, Plus } from "lucide-react"
import CreateTodo from "@/components/CreateTodo"
import { useTodosContext } from "@/hooks/useTodosContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import TodoTable from "@/components/TodoTable"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useLogout } from "@/hooks/useLogout"

// import { useNavigate } from "react-router-dom"

export default function Todos() {
    const { todoState, dispatch } = useTodosContext()
    const { authState } = useAuthContext()

    const  { logout } = useLogout()

    // const navigate = useNavigate()

    useEffect(() => {
        const fetchTodos = async () => {
             const response = await fetch("http://localhost:3000/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authState?.user?.token}`,
                    "userId": authState?.user?.id
                }
             })

             const json = await response.json()

             if (response.ok) {
                dispatch({ type: "SET_TODOS", payload: json.todos })
             }
        }

        if (authState?.user) {
            fetchTodos()
        }
    }, [dispatch, authState?.user])

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="w-[95%] sm:w-[85%] md:w-[75%] h-screen bg-background mx-auto">
            <section className="flex justify-between items-end pt-52 mb-6 mx-2">
                <div>
                    <h1 className="text-3xl font-semibold">TODO Listád</h1>
                    <p className="text-gray-400">Itt láthatod a teendőidet</p>
                </div>
                <div className="flex items-center gap-6">
                    <Dialog>
                        <DialogTrigger>
                            <Plus />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Új teendő</DialogTitle>
                            <DialogDescription>
                                Itt hozhat létre új teendőt.
                            </DialogDescription>
                            </DialogHeader>

                            {/* create todo component */}
                            <CreateTodo />

                        </DialogContent>
                    </Dialog>
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <CircleUserRound />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Fiókom: <strong>{authState?.user?.name}</strong></DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem>Kijelentkezés</DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Biztosan ki akar jelentkezni?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Ha kijelentkezik, később újra be kell jelentkeznie.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Mégse</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout}>Kijelentkezés</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cím</TableHead>
                        <TableHead>Rövid leírás</TableHead>
                        <TableHead>Státusz</TableHead>
                        <TableHead className="text-right">Műveletek</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TodoTable todoState={todoState} />
                </TableBody>
            </Table>
        </div>
    )
}
