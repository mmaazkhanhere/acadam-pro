"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import { formatRelative } from "date-fns";

import EditorPreview from "@/components/editor-preview";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { Notes } from "@prisma/client";

import { Trash2 } from "lucide-react";

type Props = {
	note: Notes;
	courseId: string;
	chapterId: string;
};

const NoteCard = ({ note, courseId, chapterId }: Props) => {
	const dateFormatted = formatRelative(new Date(note.createdAt), new Date());
	const { toast } = useToast();
	const router = useRouter();

	const onDelete = async () => {
		try {
			await axios.delete(
				`/api/course/${courseId}/chapters/${chapterId}/note/${note.id}`
			);

			toast({
				title: "Note deleted",
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
		<article
			className={cn(
				`${note.color} p-2 text-sm rounded-br-3xl flex flex-col justify-between h-full dark:text-black`,
				note.color === "bg-gray-500" &&
					"text-white dark:text-muted-foreground"
			)}
		>
			<div className="flex flex-col items-start gap-y-2">
				<button
					aria-label="Delete Button"
					onClick={onDelete}
					type="button"
					className="hover:opacity-85 transition duration-300"
				>
					<Trash2
						className={cn(
							"w-4 h-4 text-black",
							note.color === "bg-gray-500" && "text-white"
						)}
					/>
				</button>

				<EditorPreview value={note.body as string} />
			</div>

			<p
				className={cn(
					"text-xs text-gray-500",
					note.color === "bg-gray-500" && "text-gray-200"
				)}
			>
				Created{" "}
				<span className="font-medium text-xs">{dateFormatted}</span>
			</p>
		</article>
	);
};

export default NoteCard;
