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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"


type Props = {}

const formSchema = z.object({
    review: z.string().min(1, {
        message: 'Please provide a valid review'
    }),
    rating: z.number().min(1, {
        message: 'Please provide a valid rating'
    })
})

const RatingButton = (props: Props) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            review: '',
            rating: 0
        }
    })

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div>

            <AlertDialog>
                <AlertDialogTrigger
                    className="bg-purple-500 text-white py-1.5 px-4 text-xs rounded-xl"
                >
                    Rate Course
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader >
                        <AlertDialogTitle>Review for the course</AlertDialogTitle>
                        <AlertDialogDescription className="text-xs">
                            Tell us what was good about the course and what was not good about it.
                            How we can further improve ourselves. Your opinion matters
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem className="space-x-2">
                                        <FormLabel>Rate the course</FormLabel>
                                        <FormControl className="space-x-4">
                                            <>
                                                {
                                                    [1, 2, 3, 4, 5].map((rating) => (
                                                        <button
                                                            key={rating}
                                                            type="button"
                                                            className={cn(
                                                                'px-2 py-1 border rounded-lg text-xs',
                                                                field.value == rating ? 'bg-purple-400 text-white' : 'bg-gray-200/60'
                                                            )}
                                                            onClick={() => field.onChange(rating)}
                                                        >
                                                            {rating}
                                                        </button>
                                                    ))
                                                }
                                            </>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="review"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Review Body</FormLabel>
                                        <FormControl className="flex flex-col">
                                            <>
                                                <Textarea
                                                    placeholder="Write your review here..."
                                                    className="min-h-[180px]"
                                                    maxLength={500}
                                                    {...field}
                                                />
                                                <p className="text-xs text-gray-500">{field.value.length}/500</p>
                                            </>
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


    )
}

export default RatingButton