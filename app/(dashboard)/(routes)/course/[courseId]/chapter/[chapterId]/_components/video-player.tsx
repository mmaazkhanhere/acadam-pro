"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MuxPlayer from "@mux/mux-player-react";

import { useToast } from "@/components/ui/use-toast";

import { useConfettiStore } from "@/hooks/use-confetti-store";

import { cn } from "@/lib/utils";

import { Loader2, Lock } from "lucide-react";

type Props = {
	playbackId?: string;
	title: string;
	chapterId: string;
	courseId: string;
	isLocked?: boolean;
	completeOnEnd?: boolean;
	nextChapterId?: string;
};

const VideoPlayer = ({
	title,
	playbackId,
	chapterId,
	courseId,
	isLocked,
	completeOnEnd,
	nextChapterId,
}: Props) => {
	const [isReady, setIsReady] = useState(false);
	console.log(isReady, isLocked);

	const confetti = useConfettiStore();
	const router = useRouter();
	const { toast } = useToast();

	const onEnd = async () => {
		try {
			/*When the chapter completes, it is marked as completed */
			if (completeOnEnd) {
				await axios.put(
					`/api/course/${courseId}/chapters/${chapterId}/complete`,
					{
						isCompleted: true,
					}
				);
			}

			/*If the current chapter is last chapter, a confetti is displayed */
			if (!nextChapterId) {
				confetti.onOpen();
			}

			toast({
				title: "Chapter completed",
			});
			router.refresh();

			if (nextChapterId) {
				router.push(`/course/${courseId}/chapter/${nextChapterId}`);
			}
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	return (
		<div className=" aspect-video max-w-7xl w-full">
			{isLocked && (
				<div className="flex items-center justify-center h-full bg-slate-800 flex-col gap-y-2 text-white">
					<Lock className="h-8 w-8 dark:text-white" />
					<p className="text-sm">This chapter is locked</p>
				</div>
			)}
			{!isReady && !isLocked && (
				<div className="h-full flex items-center justify-center bg-slate-800">
					<Loader2 className="w-8 h-8 animate-spin text-white" />
				</div>
			)}

			{!isLocked && (
				<MuxPlayer
					title={title}
					playbackId={playbackId}
					className={cn(!isReady && "hidden")}
					onCanPlay={() => setIsReady(true)}
					onEnded={onEnd}
				/>
			)}
		</div>
	);
};

export default VideoPlayer;
