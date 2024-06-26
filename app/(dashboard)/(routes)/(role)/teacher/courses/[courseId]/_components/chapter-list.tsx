"use client";

import { useEffect, useState } from "react";
import { Chapter } from "@prisma/client";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Grip, Pencil } from "lucide-react";

type Props = {
	items: Chapter[];
	onReorder: (updateDate: { id: string; position: number }[]) => void;
	onEdit: (id: string) => void;
};

const ChapterList = ({ items, onReorder, onEdit }: Props) => {
	const [isMounted, setIsMounted] = useState(false);
	const [chapters, setChapters] = useState(items);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		setChapters(items);
	}, [items]);

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(chapters);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		const startIndex = Math.min(
			result.source.index,
			result.destination.index
		);
		const endIndex = Math.max(
			result.source.index,
			result.destination.index
		);

		const updatedChapters = items.slice(startIndex, endIndex + 1);
		setChapters(items);

		const bulkUpdateData = updatedChapters.map((chapter) => ({
			id: chapter.id,
			position: items.findIndex((item) => item.id === chapter.id),
		}));

		onReorder(bulkUpdateData);
	};

	if (!isMounted) {
		return null;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="chapters">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{chapters.map((chapter, index) => (
							<Draggable
								key={chapter.id}
								draggableId={chapter.id}
								index={index}
							>
								{(provided) => (
									<div
										className={cn(
											"flex items-center gap-x-2 bg-gray-200 border-slate-200 border text-slate-700 rounded-md mb-2 md:mb-4 text-xs md:text-sm",
											chapter.isPublished &&
												"bg-purple-500 border-purple-600 text-white hover:bg-purple-300"
										)}
										ref={provided.innerRef}
										{...provided.draggableProps}
									>
										<div
											className={cn(
												"px-2 py-2 md:py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
												chapter.isPublished &&
													"hover:bg-purple-300"
											)}
											{...provided.dragHandleProps}
										>
											<ArrowUpDown className="h-5 w-5" />
										</div>

										{chapter.title}

										<div className="ml-auto pr-2 flex items-center gap-x-2">
											{chapter.isFree && (
												<Badge className="bg-white text-black hover:bg-gray-200 text-[10px] md:text-xs">
													Free
												</Badge>
											)}
											<Badge
												className={cn(
													"bg-slate-500",
													chapter.isPublished &&
														"bg-purple-200 text-black hover:bg-purple-100 text-[10px] md:text-xs"
												)}
											>
												{chapter.isPublished
													? "Published"
													: "Draft"}
											</Badge>

											<Pencil
												onClick={() =>
													onEdit(chapter.id)
												}
												className="w-4 h-4 cursor-pointer hover:opacity-75"
											/>
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ChapterList;
