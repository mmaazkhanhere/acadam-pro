import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
import axios from 'axios'
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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { useToast } from "./ui/use-toast"

import { BsGithub, BsGoogle } from 'react-icons/bs';


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Please enter your name",
    }),
    username: z.string().min(1, {
        message: "Please enter your username",
    }),
    password: z.string().min(1, {
        message: "Please enter your password",
    }),
    emailAddress: z.string().min(1, {
        message: "Please enter correct email address",
    }),
    role: z.string().min(1, {
        message: "Please select a role",
    }),
})

type Props = {}

const SignUpButton = (props: Props) => {

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            emailAddress: "",
            password: "",
            role: ''
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            await axios.post('/api/register', values);

            const { emailAddress, password } = values

            const result = await signIn('credentials', { email: emailAddress, password: password });

            if (result?.ok) {
                toast({
                    title: 'Successful Register'
                });
                router.push('/dashboard');
            }
            else {
                toast({
                    title: 'Something went wrong',
                    variant: 'destructive'
                })
            }
        } catch (error: any) {

            console.error('[USER_SIGNUP_ONSUBMIT_FUNCTION_ERROR]')

            if (axios.isAxiosError(error) && error?.response?.status === 405) {
                toast({
                    title: 'User already registered',
                    variant: 'destructive'
                })
            }
        }
    };


    return (
        <AlertDialog

        >
            <AlertDialogTrigger
                className="text-purple-500 hover:underline hover:text-purple-400 
                transition duration-300"
            >
                Sign Up
            </AlertDialogTrigger>
            <AlertDialogContent
            >
                <AlertDialogTitle className="text-center">Sign Up</AlertDialogTitle>
                <div className="grid grid-cols-1 items-start gap-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g Jack Smith"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g jacksmith"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name='emailAddress'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder="e.g jacksmith@example.com"
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
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name='role'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>

                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Role</SelectLabel>
                                                    <SelectItem value="student">Student</SelectItem>
                                                    <SelectItem value="Teacher">Teacher</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />

                            <AlertDialogFooter className="mt-3">


                                <AlertDialogCancel disabled={isSubmitting}>
                                    Cancel
                                </AlertDialogCancel>

                                <AlertDialogAction
                                    type="submit"
                                    disabled={!isValid || isSubmitting}

                                >
                                    Sign up
                                </AlertDialogAction>

                            </AlertDialogFooter>

                        </form>
                    </Form>
                </div>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SignUpButton