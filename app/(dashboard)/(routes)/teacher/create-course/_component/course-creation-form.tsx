"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { Switch } from "@/components/ui/switch"

import { Category } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"
import FileUpload from "@/components/file-upload"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import axios from "axios"





type Props = {
    categories: Category[]
}

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().min(1),
    categoryLabel: z.string().min(1),
    price: z.coerce.number(),
    isFree: z.boolean()
})

const CourseCreationForm = ({ categories }: Props) => {

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            imageUrl: '',
            categoryLabel: '',
            price: 0,
            isFree: false
        }
    })

    const { isValid, isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/course', values);
            if (response.status === 200) {
                toast({
                    title: "Course created"
                })
                router.push(`/teacher/courses/${response.data.id}`)
            }
        } catch (error) {

            console.log(error);

            toast({
                title: "Something went wrong",
                variant: 'destructive',
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 mt-10"
            >
                <div className="w-full space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g Film Animation"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="min-h-[200px]"
                                        placeholder="e.g This is a course about..."
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.name}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full space-y-5">

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Image</FormLabel>
                                <FormControl>
                                    <div>
                                        {
                                            form.watch('imageUrl') == '' ? (
                                                <FileUpload
                                                    endpoint="courseImage"
                                                    onChange={field.onChange}
                                                />
                                            ) : (
                                                <Image
                                                    src={form.watch('imageUrl')}
                                                    alt='Form Image'
                                                    width={500}
                                                    height={500}
                                                />
                                            )
                                        }

                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {
                        !form.watch('isFree') && <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    }


                    <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-x-4">
                                <FormLabel>Is course free?</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </div>

                <Button
                    type="submit"
                    className="w-20 mt-5"
                    disabled={!isValid || isSubmitting}
                >
                    Create
                </Button>
            </form>
        </Form>
    )
}

export default CourseCreationForm