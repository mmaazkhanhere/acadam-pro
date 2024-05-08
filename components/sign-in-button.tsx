"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
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

import { Separator } from "@/components/ui/separator"

import { Input } from "./ui/input"

import SignUpButton from "./sign-up-button"
import { useToast } from "./ui/use-toast"

import { BsGithub, BsGoogle } from 'react-icons/bs';



const formSchema = z.object({
    emailAddress: z.string().min(1, {
        message: "Please enter your email address",
    }),
    password: z.string().min(1, {
        message: "Please enter your password",
    }),
})

const SignInButton = () => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            password: "",
        },
    })

    const { toast } = useToast();
    const router = useRouter();

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const { emailAddress, password } = values
            const result = await signIn('credentials', { email: emailAddress, password: password });

            if (result?.ok) {
                toast({
                    title: 'Successful Login',
                    variant: 'default'
                })

                router.push('/dashboard')
            }
        } catch (error) {
            toast({
                title: 'Check your credentials again',
                variant: 'destructive'
            })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className='hover:bg-violet-500 transition duration-300
                            hover:text-white border-violet-500 border
                            px-4 py-1.5 rounded-lg'
            >
                Join Us
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogTitle className="lg:text-center">Sign In</AlertDialogTitle>
                <div className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='emailAddress'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder="Enter your email address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />

                            <AlertDialogFooter
                                className="grid grid-cols-2 w-full mt-5 "
                            >
                                <button
                                    aria-label="Sign Up Button"
                                    type="button"
                                    className="text-xs w-full text-left">
                                    New user? <SignUpButton />
                                </button>

                                <div className="space-x-3 flex items-center place-content-end">


                                    <AlertDialogAction
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className="w-16 lg:w-20 text-xs -mb-2 md:mb-0"
                                    >
                                        Sign In
                                    </AlertDialogAction>
                                    <AlertDialogCancel
                                        disabled={isSubmitting}
                                        className="w-16 lg:w-20 text-xs"
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                </div>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </div>

            </AlertDialogContent>
        </AlertDialog >
    )
}

export default SignInButton