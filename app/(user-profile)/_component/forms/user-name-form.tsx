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

import { Input } from "@/components/ui/input"

import { Pencil } from 'lucide-react'
import { useRouter } from "next/navigation"

type Props = {
    name?: string
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: ' Name must be at least 2 characters'
    })
})

const UserNameForm = ({ name }: Props) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name
        }
    })

    const onSubmit = () => {
        console.log('onSubmit')
    }

    return (
        <div className='flex items-center justify-center gap-x-4 pt-5'>
            <h2 className='text-3xl font-bold text-white'>
                {name}
            </h2>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Pencil />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit your name</AlertDialogTitle>
                        </AlertDialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder={name} {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
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

export default UserNameForm