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

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";

import { Pencil } from "lucide-react";
import { Category } from "@prisma/client";

type Props = {
	initialCategory: string;
	courseId: string;
	categories: Category[];
	isPublished?: boolean;
};

const formSchema = z.object({
	categoryLabel: z.string().min(1),
});

const CourseCategoryForm = ({
	initialCategory,
	courseId,
	categories,
	isPublished,
}: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			categoryLabel: initialCategory,
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/course/${courseId}`, values);
			toast({
				title: "Course category updated",
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

	return (
		<section
			className="p-4 bg-purple-200/50 dark:bg-muted rounded-xl flex flex-col
        space-y-2 md:space-y-4 w-full"
		>
			<div className="flex items-center justify-between">
				<h2 className="md:text-lg font-medium">Course Category</h2>

				<div className="flex items-center gap-x-2 text-sm">
					<AlertDialog>
						<AlertDialogTrigger
							onClick={onClick}
							className="flex items-center gap-x-2"
						>
							<Pencil className="w-4 h-4" />
							<p className="hidden md:block">Edit Category</p>
						</AlertDialogTrigger>
						<AlertDialogContent className="dark:bg-muted">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Edit Course Category
								</AlertDialogTitle>
							</AlertDialogHeader>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<FormField
										control={form.control}
										name="categoryLabel"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Course Category
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select category" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{categories.map(
															(category) => (
																<SelectItem
																	key={
																		category.id
																	}
																	value={
																		category.name
																	}
																>
																	{
																		category.name
																	}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
									<AlertDialogFooter>
										<AlertDialogCancel className="dark:bg-muted-foreground dark:hover:bg-muted-foreground/60">
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
				{initialCategory}
			</p>
		</section>
	);
};

export default CourseCategoryForm;
