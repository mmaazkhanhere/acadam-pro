import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

type Props = {
    isPublished: boolean,
    isCompleted: boolean,
}

const ActionButtons = ({ isPublished, isCompleted }: Props) => {


    return (
        <div className="flex items-center justify-center gap-x-2">
            <Button
                size='sm'
                aria-label="Publish button"
                disabled={!isCompleted}
            >
                {
                    isPublished ? "Unpublished" : "Publish"
                }
            </Button>

            <Button
                variant='destructive'
                size='sm'
                aria-label='Course delete button'
            >
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    )
}

export default ActionButtons