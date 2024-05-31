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

import { Switch } from "@/components/ui/switch";

import { useToast } from "@/components/ui/use-toast";

import { Pencil } from "lucide-react";

type Props = {
	isCourseFree: boolean;
	courseId: string;
	isPublished?: boolean;
};

const formSchema = z.object({
	isFree: z.coerce.boolean(),
});

const IsCourseFree = ({ isCourseFree, courseId, isPublished }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			isFree: isCourseFree,
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/course/${courseId}`, values);
			toast({
				title: "Course availability updated",
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
				<h2 className="md:text-lg font-medium">Is Course Free</h2>

				<div className="flex items-center gap-x-2 text-sm">
					<AlertDialog>
						<AlertDialogTrigger
							onClick={onClick}
							className="flex items-center gap-x-2"
						>
							<Pencil className="w-4 h-4" />
							<p className="hidden md:block">Edit Availability</p>
						</AlertDialogTrigger>
						<AlertDialogContent className="dark:bg-muted">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Edit Course Availability
								</AlertDialogTitle>
							</AlertDialogHeader>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<FormField
										control={form.control}
										name="isFree"
										render={({ field }) => (
											<FormItem className="flex items-center gap-x-2">
												<FormLabel>
													Is course free?
												</FormLabel>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
												<FormMessage />
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
				{isCourseFree ? "Free" : "Paid"}
			</p>
		</section>
	);
};

export default IsCourseFree;
