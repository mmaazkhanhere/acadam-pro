"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { Trash } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
    isPublished: boolean,
    isCompleted: boolean,
    courseId: string,
    chapterId: string,
}

const ChapterActionButtons = ({ isPublished, isCompleted, courseId, chapterId }: Props) => {

    const router = useRouter();
    const { toast } = useToast();

    const onClick = async () => {
        if (isCompleted) {
            try {
                await axios.patch(`/api/course/${courseId}/chapters/${chapterId}/publish`, { isPublished });
                toast({
                    title: 'Action Successful'
                });
                router.refresh();
            } catch (error) {
                console.error(error);
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
                className={cn(
                    isPublished && 'bg-white border border-black text-black'
                )}
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

export default ChapterActionButtons