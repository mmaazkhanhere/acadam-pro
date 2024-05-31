"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
} from "@/components/ui/form";

import FileUpload from "@/components/file-upload";

import { useToast } from "@/components/ui/use-toast";

import { Pencil } from "lucide-react";

type Props = {
	initialImage: string;
	courseId: string;
	isPublished?: boolean;
};

const formSchema = z.object({
	imageUrl: z.string().min(2),
});

const CourseImageForm = ({ initialImage, courseId, isPublished }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			imageUrl: "",
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/course/${courseId}`, values);
			toast({
				title: "Course image updated",
			});

			form.resetField("imageUrl");

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
            space-y-4 w-full"
		>
			<div className="flex items-center justify-between">
				<h2 className="md:text-lg font-medium">Course Image</h2>

				<div className="flex items-center gap-x-2 text-sm">
					<AlertDialog>
						<AlertDialogTrigger
							onClick={onClick}
							className="flex items-center gap-x-2"
						>
							<Pencil className="w-4 h-4" />
							<p className="hidden md:block">Edit Image</p>
						</AlertDialogTrigger>
						<AlertDialogContent className="dark:bg-muted">
							<AlertDialogHeader>
								<AlertDialogTitle>
									Edit Course Image
								</AlertDialogTitle>
							</AlertDialogHeader>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<FormField
										control={form.control}
										name="imageUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Course Image
												</FormLabel>
												<FormControl>
													<div>
														{form.watch(
															"imageUrl"
														) == "" ? (
															<FileUpload
																endpoint="courseImage"
																onChange={
																	field.onChange
																}
															/>
														) : (
															<Image
																src={form.watch(
																	"imageUrl"
																)}
																alt="Form Image"
																width={500}
																height={500}
															/>
														)}
													</div>
												</FormControl>
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

			<div className="overflow-hidden">
				<Image
					src={initialImage}
					alt="Course Image"
					width={500}
					height={500}
					className="rounded-xl"
				/>
			</div>
		</section>
	);
};

export default CourseImageForm;
