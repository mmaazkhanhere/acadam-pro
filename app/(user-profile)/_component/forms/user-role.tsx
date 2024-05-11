"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Pencil } from 'lucide-react'
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@clerk/nextjs"


type Props = {
    userType?: string
}

const formSchema = z.object({
    userType: z
        .string({
            required_error: "Please select a role.",
        })
})

const UserRole = ({ userType }: Props) => {

    const { userId } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userType: ''
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
        <div className='flex items-center justify-center gap-x-4 pt-2 lg:pt-5'>
            <p className='lg:text-xl text-white'>
                {
                    !userType ? 'No role selected' : userType
                }
            </p>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Pencil className="w-4 h-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit your role</AlertDialogTitle>
                        </AlertDialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="userType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Student">Student</SelectItem>
                                                    <SelectItem value="Teacher">Teacher</SelectItem>
                                                </SelectContent>
                                            </Select>

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

export default UserRole