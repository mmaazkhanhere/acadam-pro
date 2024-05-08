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

import { Separator } from "@/components/ui/separator"

import { Input } from "./ui/input"

import SignUpButton from "./sign-up-button"
import { useToast } from "./ui/use-toast"
import AuthSocialButton from "./auth-social-button"

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

    const socialAction = (action: string) => {
        signIn(action).then((callback) => {
            if (callback?.error) {
                toast({
                    title: 'Invalid credentials',
                    variant: 'destructive'
                })
            }
            if (callback?.ok && !callback.error) {
                toast({
                    title: 'Successful Login',

                })
            }
        })
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

                                <AlertDialogFooter className="flex justify-between w-full items-center lg:mt-5">
                                    <button
                                        aria-label="Sign Up Button"
                                        type="button"
                                        className="text-xs lg:mr-44">
                                        New user? <SignUpButton />
                                    </button>

                                    <AlertDialogCancel disabled={isSubmitting}>
                                        Cancel
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Sign In
                                    </AlertDialogAction>

                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </div>
                </AlertDialogHeader>


                <Separator />

                <div className="justify-center flex gap-x-4">
                    <AuthSocialButton
                        icon={BsGithub}
                        onClick={() => socialAction('github')}
                        label="Sign in with Github"
                    />

                    <AuthSocialButton
                        icon={BsGoogle}
                        onClick={() => socialAction('google')}
                        label="Sign in with Google"
                    />
                </div>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SignInButton