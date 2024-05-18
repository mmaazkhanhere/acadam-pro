"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

import { Trash } from "lucide-react"


type Props = {
    isPublished: boolean,
    isCompleted: boolean,
    courseId: string
}

const ActionButtons = ({ isPublished, isCompleted, courseId }: Props) => {

    const router = useRouter();
    const { toast } = useToast();

    const onClick = async () => {
        try {
            await axios.patch(`/api/course/${courseId}/publish`, { isPublished })
            toast({
                title: 'Course published',
            })

            router.refresh();
        } catch (error: any) {

            if (axios.isAxiosError(error) && error.response?.status === 406) {
                toast({
                    title: 'Publish the chapters',
                    variant: 'destructive'
                })
            } else {
                toast({
                    title: 'Something went wrong',
                    variant: 'destructive'
                })
            }
        }
    }


    return (
        <div className="flex items-center justify-center gap-x-2">
            <Button
                size='sm'
                aria-label="Publish button"
                disabled={!isCompleted}
                onClick={onClick}
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