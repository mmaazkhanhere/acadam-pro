import React from "react";
import prismadb from "@/lib/prismadb";
import { Chapter } from "@prisma/client";

type ChapterProps = {
	userId: string;
	courseId: string;
	chapterId: string;
};

export const getChapter = async ({
	userId,
	courseId,
	chapterId,
}: ChapterProps) => {
	try {
		/*Get the course having specified courseId and check if it is published or not */
		const course = await prismadb.course.findUnique({
			where: {
				id: courseId,
				isPublished: true,
			},
		});

		/*get the chapter of the course with specified chapterId and ensure it is published */
		const chapter = await prismadb.chapter.findUnique({
			where: {
				id: chapterId,
				isPublished: true,
			},
		});

		/*If no course or chapter found, raise an error */
		if (!course || !chapter) {
			throw new Error("Course or Chapter not found");
		}

		let muxData = null; //variable to hold the mux video data
		let nextChapter: Chapter | null = null; //variable to hold next chapter

		/*If the course is free, get the mux video data and next chapter. We dont want paid 
        chapters to be accessible so that's why the check is done */
		if (course.isFree) {
			muxData = await prismadb.muxData.findUnique({
				where: {
					chapterId: chapterId,
				},
			});

			/*get all the chapters that are greater in position than the current chapter and
            arrange it in ascending order */
			nextChapter = await prismadb.chapter.findFirst({
				where: {
					courseId: courseId,
					isPublished: true,
					position: {
						gt: chapter.position,
					},
				},
				orderBy: {
					position: "asc",
				},
			});
		}

		/*get the current user progress for the current chapter */
		const userProgress = await prismadb.userProgress.findFirst({
			where: {
				chapterId,
				userId,
			},
		});

		return {
			course,
			chapter,
			muxData,
			nextChapter,
			userProgress,
		};
	} catch (error) {
		console.log(`[GET_CHAPTER_ACTION_ERROR]`);
		return {
			course: null,
			chapter: null,
			muxData: null,
			nextChapter: null,
			userProgress: null,
		};
	}
};
