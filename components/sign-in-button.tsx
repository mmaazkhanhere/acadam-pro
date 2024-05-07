"use client"

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

import { Input } from "./ui/input"
import SignUpButton from "./sign-up-button"
import { signIn } from "next-auth/react"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"


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

        console.log('called')
        try {
            const result = await signIn('credentials', { values });

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
                <AlertDialogHeader>
                    <AlertDialogTitle className="lg:text-center">Sign In</AlertDialogTitle>
                    <div className="grid ">
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

                                <AlertDialogFooter className="flex justify-between w-full items-center">
                                    <button className="text-xs mr-44">
                                        New user? <SignUpButton />
                                    </button>

                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        type="submit"
                                    >
                                        Sign In
                                    </AlertDialogAction>

                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </div>
                </AlertDialogHeader>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SignInButton