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

import { Chapter, Course } from "@prisma/client";

import { PlusCircle } from "lucide-react";
import ChapterList from "./chapter-list";

type Props = {
	course: Course & { chapters: Chapter[] };
	courseId: string;
	isPublished: boolean;
};

const formSchema = z.object({
	title: z.string().min(2),
});

const ChapterForm = ({ course, courseId, isPublished }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/course/${courseId}/chapters`, values);
			toast({
				title: `${form.getValues("title")} is created`,
			});
			router.refresh();
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	const onClick = async () => {
		try {
			if (isPublished) {
				await axios.patch(`/api/course/${courseId}/publish`, {
					isPublished: false,
				});
			}

			router.refresh();
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	const onReorder = async (
		updateData: { id: string; position: number }[]
	) => {
		try {
			await axios.put(`/api/course/${courseId}/chapters/reorder`, {
				list: updateData,
			});

			toast({
				title: "Course Reordered",
			});

			router.refresh();
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	const onEdit = (id: string) => {
		router.push(`/teacher/courses/${courseId}/chapters/${id}`);
	};

	return (
		<section
			className="p-4 bg-purple-200/50 dark:bg-muted rounded-xl flex flex-col
            space-y-4 w-full"
		>
			<div className="flex items-center justify-between">
				<h2 className="md:text-lg font-medium">Course Chapters</h2>

				<div className="flex items-center gap-x-2 text-sm">
					<AlertDialog>
						<AlertDialogTrigger
							aria-label="Edit button"
							onClick={onClick}
							className="flex items-center gap-x-2"
						>
							<PlusCircle className="w-5 h-5" />
							<p className="hidden md:block">Add Chapter</p>
						</AlertDialogTrigger>
						<AlertDialogContent className="dark:bg-muted">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Create Chapter
								</AlertDialogTitle>
							</AlertDialogHeader>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Chapter title
												</FormLabel>
												<FormControl>
													<Input
														placeholder="e.g Introduction to Designing"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<AlertDialogFooter>
										<AlertDialogCancel
											aria-label="Cancel button"
											className="dark:bg-muted-foreground dark:hover:bg-muted-foreground/60"
										>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											aria-label="Create button"
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
				</div>
			</div>

			{!course.chapters.length ? (
				<p className="text-sm text-gray-600 italic">No Chapters</p>
			) : (
				<ChapterList
					items={course.chapters || []}
					onEdit={onEdit}
					onReorder={onReorder}
				/>
			)}
		</section>
	);
};

export default ChapterForm;
