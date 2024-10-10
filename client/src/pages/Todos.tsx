import { useEffect, useState } from "react"
import TableActions from "@/components/TableActions"
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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CircleUserRound, Plus } from "lucide-react"
import FinishingTodo from "@/components/FinishingTodo"
import CreateTodo from "@/components/CreateTodo"
import { useTodosContext } from "@/hooks/useTodosContext"
import { useAuthContext } from "@/hooks/useAuthContext"

export default function Todos() {
    const { todoState, dispatch } = useTodosContext()
    const { authState } = useAuthContext()

    useEffect(() => {
        const fetchTodos = async () => {
             const response = await fetch("http://localhost:3000/todos", {
                headers: {
                    Authorization: `Bearer ${authState?.user?.token}`,
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
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                            <CircleUserRound />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Fiókom: {authState?.user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Kijelentkezés</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                    {todoState.todos.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400">
                                Nincs teendő
                            </TableCell>
                        </TableRow>
                    )}
                    {todoState.todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell className="font-medium">{todo.title}</TableCell>
                            <TableCell>{todo.description}</TableCell>
                            <TableCell>
                                <FinishingTodo key={todo.id} completed={todo.completed} />
                            </TableCell>
                            <TableCell className="text-right">
                                <TableActions key={todo.id} id={todo.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
