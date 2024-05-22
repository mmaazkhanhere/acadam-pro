
import prismadb from '@/lib/prismadb'

export const getProgress = async (userId: string, courseId: string): Promise<number> => {

    try {

        const publishedChapters = await prismadb.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true
            },
            select: {
                id: true
            }
        });

        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

        const validCompletedChapters = await prismadb.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        });

        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;
        return progressPercentage;

    } catch (error) {
        console.log('[GET_COURSE_PROGRESS_ACTION_ERROR]', error);
        return 0;
    }

}