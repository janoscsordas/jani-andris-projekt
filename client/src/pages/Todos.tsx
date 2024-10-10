import { useState } from "react"
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

const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
]

export default function Todos() {


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
                        <DropdownMenuLabel>Fiókom</DropdownMenuLabel>
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
                {invoices && invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>
                            <FinishingTodo />
                        </TableCell>
                        <TableCell className="text-right">
                            <TableActions />
                        </TableCell>
                    </TableRow>
                ))}
                {invoices.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-400">
                            Nincs teendő
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  )
}
