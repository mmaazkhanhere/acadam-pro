import EditorPreview from "@/components/editor-preview";
import { cn } from "@/lib/utils";
import { Notes } from "@prisma/client";
import React from "react";
import { formatRelative, subDays } from "date-fns";
import { Trash2 } from "lucide-react";

type Props = {
	note: Notes;
};

const NoteCard = ({ note }: Props) => {
	const dateFormatted = formatRelative(new Date(note.createdAt), new Date());
	return (
		<article
			className={cn(
				`${note.color} p-2 text-sm rounded-br-3xl flex flex-col justify-between h-full`,
				note.color === "bg-gray-500" && "text-white"
			)}
		>
			<div className="flex flex-col items-start gap-y-2">
				<button className="hover:opacity-85 transition duration-300">
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
