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

import { Pencil } from "lucide-react";

type Props = {
	initialTitle: string;
	chapterId: string;
	courseId: string;
	coursePublished?: boolean;
	chapterPublished?: boolean;
};

const formSchema = z.object({
	title: z.string().min(2),
});

const ChapterTitleForm = ({
	initialTitle,
	chapterId,
	courseId,
	coursePublished,
	chapterPublished,
}: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: initialTitle,
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(
				`/api/course/${courseId}/chapters/${chapterId}`,
				values
			);
			toast({
				title: "Chapter title updated",
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
			if (chapterPublished) {
				if (coursePublished) {
					await axios.patch(`/api/course/${courseId}/publish`, {
						isPublished: false,
					});
				}
				await axios.patch(
					`/api/course/${courseId}/chapters/${chapterId}/publish`,
					{ isPublished: false }
				);
				router.refresh();
			}
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	return (
		<section
			className="p-4 bg-purple-200/50 dark:bg-muted rounded-xl flex flex-col
            space-y-2 md:space-y-4 w-full"
		>
			<div className="flex items-center justify-between">
				<h2 className="md:text-lg font-medium">Chapter Title</h2>

				<div className="flex items-center gap-x-2 text-sm">
					<AlertDialog>
						<AlertDialogTrigger
							onClick={onClick}
							className="flex items-center gap-x-2"
						>
							<Pencil className="w-4 h-4" />
							<p className="hidden md:block">Edit Title</p>
						</AlertDialogTrigger>
						<AlertDialogContent className="dark:bg-muted">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Edit Chapter Title
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
													Course title
												</FormLabel>
												<FormControl>
													<Input
														placeholder={
															initialTitle
														}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
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
			</div>

			<p className="text-sm text-gray-600 dark:text-muted-foreground">
				{initialTitle}
			</p>
		</section>
	);
};

export default ChapterTitleForm;
