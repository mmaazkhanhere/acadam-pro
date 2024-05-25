"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { useToast } from "@/components/ui/use-toast"

import { Pencil } from "lucide-react"



type Props = {
    initialTitle: string
    courseId: string
}


const formSchema = z.object({
    title: z.string().min(2)
})

const CourseTitleForm = ({ initialTitle, courseId }: Props) => {

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialTitle
        }
    })

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/course/${courseId}`, values);
            toast({
                title: 'Course title updated',
            })

            router.refresh();

        } catch (error) {
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }

    return (

        <section
            className="p-4 bg-purple-200/50 dark:bg-muted rounded-xl flex flex-col
        space-y-4 w-full"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">
                    Course Title
                </h2>

                <div className="flex items-center gap-x-2 text-sm">

                    <AlertDialog>
                        <AlertDialogTrigger className="flex items-center gap-x-2">
                            <Pencil className="w-4 h-4" />
                            Edit Title
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Edit Course Title</AlertDialogTitle>
                            </AlertDialogHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={initialTitle}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            type="submit"
                                            disabled={!isValid || isSubmitting}
                                        >
                                            Save
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </Form>

                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>

            <p className="text-sm text-gray-600">
                {initialTitle}
            </p>
        </section>
    )
}

export default CourseTitleForm