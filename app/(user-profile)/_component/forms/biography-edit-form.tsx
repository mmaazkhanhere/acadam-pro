"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import axios from "axios"

import { useAuth } from "@clerk/nextjs"

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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"

import { useToast } from "@/components/ui/use-toast"

import { Pencil } from 'lucide-react'



type Props = {
    biography?: string
}

const formSchema = z.object({
    biography: z.string().min(2, {
        message: ' Description must be at least 2 characters'
    })
})

const BiographyEditForm = ({ biography }: Props) => {

    const { userId } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            biography: biography
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            await axios.patch(`/api/user/${userId}`, values)
            toast({
                title: 'User updated'
            })

            router.refresh()
        }
        catch (error) {
            console.log(error)
            toast({
                title: 'Something went wrong'
            })
        }
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
                                    <AlertDialogAction
                                        disabled={!isValid || isSubmitting}
                                        type="submit">
                                        Edit
                                    </AlertDialogAction>
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