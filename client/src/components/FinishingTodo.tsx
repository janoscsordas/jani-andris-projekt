import { Checkbox } from "@/components/ui/checkbox"


export default function FinishingTodo({ completed }: { completed: boolean }) {
    return (
        <div className="flex items-center">
            <Checkbox checked={completed} />
        </div>
    )
}
