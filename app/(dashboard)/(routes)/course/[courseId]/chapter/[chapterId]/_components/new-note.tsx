"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";

import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import TextEditor from "@/components/text-editor";

type Props = {
	chapterId: string;
	courseId: string;
};

const formSchema = z.object({
	body: z.string().min(1),
});

const NewNote = ({ chapterId, courseId }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			body: "",
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(
				`/api/course/${courseId}/chapters/${chapterId}/note`,
				{ values }
			);
			toast({
				title: "Note created",
			});
			router.refresh();
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger
				className="flex items-center gap-x-2 bg-purple-500 hover:bg-purple-400 px-6 py-2 
            text-white rounded-xl text-sm transition-all duration-300"
			>
				<PlusCircle className="w-4 h-4 hidden md:block " />
				New Note
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Create a new note</AlertDialogTitle>
				</AlertDialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="body"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body</FormLabel>
									<FormControl>
										<TextEditor {...field} />
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
								Create
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default NewNote;
