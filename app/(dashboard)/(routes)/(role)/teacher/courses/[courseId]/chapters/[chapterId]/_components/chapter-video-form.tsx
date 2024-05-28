"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import MuxPlayer from "@mux/mux-player-react";

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

import { AlertCircleIcon, Pencil } from "lucide-react";

import { Chapter, MuxData } from "@prisma/client";

type Props = {
	initialData: Chapter & { muxData: MuxData | null };
	courseId: string;
	chapterId: string;
	coursePublished?: boolean;
	chapterPublished?: boolean;
};

const formSchema = z.object({
	videoUrl: z.string().min(2),
});

const ChapterVideoForm = ({
	initialData,
	courseId,
	chapterId,
	coursePublished,
	chapterPublished,
}: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			videoUrl: "",
		},
	});

	const { isValid, isSubmitting } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(
				`/api/course/${courseId}/chapters/${initialData.id}`,
				values
			);
			toast({
				title: "Chapter video updated",
			});

			form.resetField("videoUrl");

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
        space-y-4 w-full"
		>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-medium">Chapter Video</h2>

				<div className="flex items-center gap-x-2 text-sm">
					<AlertDialog>
						<AlertDialogTrigger
							onClick={onClick}
							className="flex items-center gap-x-2"
						>
							<Pencil className="w-4 h-4" />
							Edit Video
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Edit Chapter Video
								</AlertDialogTitle>
							</AlertDialogHeader>

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<FormField
										control={form.control}
										name="videoUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Course Image
												</FormLabel>
												<FormControl>
													<div>
														{form.watch(
															"videoUrl"
														) == "" ? (
															<FileUpload
																endpoint="chapterVideo"
																onChange={
																	field.onChange
																}
															/>
														) : (
															<MuxPlayer
																playbackId={
																	initialData
																		.muxData
																		?.playbackId ||
																	""
																}
															/>
														)}
													</div>
												</FormControl>
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

			<div className="overflow-hidden">
				{!initialData.muxData?.playbackId ? (
					<div className="flex items-center text-sm text-red-400 gap-x-2">
						<AlertCircleIcon />
						No video uploaded
					</div>
				) : (
					<MuxPlayer
						playbackId={initialData.muxData?.playbackId || ""}
					/>
				)}
			</div>
		</section>
	);
};

export default ChapterVideoForm;
