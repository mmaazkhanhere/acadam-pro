"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"

import { Pencil } from 'lucide-react'
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

type Props = {
    biography?: string
}

const formSchema = z.object({
    biography: z.string().min(2, {
        message: ' Description must be at least 2 characters'
    })
})

const BiographyEditForm = ({ biography }: Props) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            biography: biography
        }
    })

    const onSubmit = () => {
        console.log('onSubmit')
    }

    return (
        <div className='flex items-center justify-center gap-x-4 pt-2'>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Pencil />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit your biography</AlertDialogTitle>
                        </AlertDialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="biography"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Biography</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Write about yourself'
                                                    {...field}
                                                    className="min-h-[200px]"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is brief overview about you.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit">Edit</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>

                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default BiographyEditForm