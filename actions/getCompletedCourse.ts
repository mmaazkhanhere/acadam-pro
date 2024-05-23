import prismadb from '@/lib/prismadb'

type GetCourses = {
    userId: string;
}

export const getCompletedCourses = async ({ userId }: GetCourses): Promise<number> => {
    try {
        const courses = await prismadb.course.findMany({
            where: {
                studentsEnrolled: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    }
                }
            },
        });

        let completedCoursesCount = 0;

        for (const course of courses) {
            const completedChaptersCount = await prismadb.userProgress.count({
                where: {
                    userId,
                    chapterId: {
                        in: course.chapters.map(chapter => chapter.id),
                    },
                    isCompleted: true,
                },
            });

            const isCompleted = completedChaptersCount === course.chapters.length;

            if (isCompleted) {
                completedCoursesCount += 1;
            }
        }

        return completedCoursesCount;

    } catch (error) {
        console.log('[GET_COMPLETED_COURSES_COUNT]', error);
        return 0;
    }
}
