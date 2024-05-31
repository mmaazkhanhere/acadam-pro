import prismadb from "@/lib/prismadb";

import { Course, Review, User } from "@prisma/client";
import { getProgress } from "./getProgress";

type CourseWithProgress = Course & {
	chapters: { id: string }[];
	reviews: Review[] | null;
	teacher: User;
	progress: number | null;
};

type GetCourses = {
	userId: string;
};

export const getEnrolledCourses = async ({
	userId,
}: GetCourses): Promise<CourseWithProgress[]> => {
	try {
		const courses = await prismadb.course.findMany({
			where: {
				studentsEnrolled: {
					some: {
						id: userId,
					},
				},
			},
			include: {
				chapters: {
					where: {
						isPublished: true,
					},
					select: {
						id: true,
					},
				},
				studentsEnrolled: true,
				reviews: true,
				teacher: true,
				purchases: {
					where: {
						userId,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const courseWithProgress: CourseWithProgress[] = await Promise.all(
			courses.map(async (course) => {
				const progressPercentage = await getProgress(userId, course.id);
				return {
					...course,
					progress: progressPercentage,
				};
			})
		);

		return courseWithProgress;
	} catch (error) {
		console.log("[GET_ALL_COURSES_ACTION]", error);
		return [];
	}
};
