import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"



export default function TableActions({ id }: { id: string }) {
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Műveletek</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-orange-500 focus:text-orange-300 focus:bg-orange-950 cursor-pointer">Szerkesztés</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:text-red-300 focus:bg-red-950 cursor-pointer">Törlés</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
