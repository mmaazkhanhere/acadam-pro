"use client"

import React from "react"
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


type Props = {}

const formSchema = z.object({
    review: z.string().min(1, {
        message: 'Please provide a valid review'
    })
})

const RatingButton = (props: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            review: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <React.Fragment>
            <AlertDialog>
                <AlertDialogTrigger
                    className="text-xs bg-purple-500 py-1.5 px-4 text-white rounded-xl
            hover:bg-purple-400 transition duration-300"
                >
                    Rate Course
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Rate the course?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tell us what do you like about the course and what you don&apos;t.
                            How we can improve
                        </AlertDialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="review"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl className="flex flex-col">
                                                <Textarea
                                                    placeholder="Write your review here..."
                                                    className="min-h-[150px]"
                                                    maxLength={500}
                                                    {...field}
                                                />
                                                <p className="text-xs text-gray-400">
                                                    {field.value}/500
                                                </p>
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
                                    <AlertDialogAction
                                        type="submit"
                                    >
                                        Rate
                                    </AlertDialogAction>
                                </AlertDialogFooter>

                            </form>
                        </Form>
                    </AlertDialogHeader>

                </AlertDialogContent>
            </AlertDialog>
        </React.Fragment>


    )
}

export default RatingButton