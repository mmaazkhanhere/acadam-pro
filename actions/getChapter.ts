/*this function retrieves information about a specific chapter within a course */

import prismadb  from "@/lib/prismadb";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
    try {

        //check if the current user has purchased the course
        const purchase = await prismadb.purchase.findFirst({
            where: {
                userId,
                courseId
            }
        });


        //get the course price
        const course = await prismadb.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
            select: {
                price: true
            }
        });

        console.log(course)

        //get the chapter that is published
        const chapter = await prismadb.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        });

        //if no chapter or course found, throw new error
        if (!chapter || !course) {
            throw new Error("Chapter or Course not found")
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        //if user has purchased the course, course attachment is fetched
        if (purchase) {
            attachments = await prismadb.attachment.findMany({
                where: {
                    courseId: courseId
                }
            });
        }

        //if chapter is free and is purchased get the video data
        if (chapter.isFree || purchase) {
            muxData = await prismadb.muxData.findUnique({
                where: {
                    chapterId: chapterId,
                }
            });

            //get the next chapter
            nextChapter = await prismadb.chapter.findFirst({
                where: {
                    courseId: chapterId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position,
                    }
                },
                orderBy: {
                    position: "asc"
                }
            })
        }

        //get the user progress for that chapter
        const userProgress = await prismadb.userProgress.findFirst({
            where: {
                userId,
                chapterId
            }
        });

        return {
            chapter, course, muxData, attachments, nextChapter, userProgress, purchase
        }

    } catch (error) {
        console.error("[GET_CHAPTER]", error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: null,
            nextChapter: null,
            userProgress: null,
            purchase: null,
        }
    }
}