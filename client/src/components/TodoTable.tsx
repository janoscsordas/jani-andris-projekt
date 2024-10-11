import FinishingTodo from "./FinishingTodo";
import TableActions from "./TableActions";
import { TableCell, TableRow } from "./ui/table";

export default function TodoTable({ todoState }: { todoState: any }) {

    return (
        <>
            {todoState.todos.map((todo: any, index: number) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">{todo.title}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>
                        <FinishingTodo completed={todo.completed} id={todo._id} />
                    </TableCell>
                    <TableCell className="text-right">
                        <TableActions id={todo._id} />
                    </TableCell>
                </TableRow>
            ))}
            {todoState.todos.length === 0 && (
                <TableRow key={1}>
                    <TableCell colSpan={4} className="text-center text-gray-400">
                        Nincs teendő
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
