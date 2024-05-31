import prismadb from "@/lib/prismadb";
import { Category, Course, Review, User } from "@prisma/client";
import { getProgress } from "./getProgress";

type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: { id: string }[];
	reviews: Review[] | null;
	teacher: User;
	progress: number | null;
	studentEnrolled: User[];
};

type GetCourses = {
	userId: string;
	title: string;
	categoryLabel: string;
};

export const getAllCourses = async ({
	userId,
	title,
	categoryLabel,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
	try {
		const courses = await prismadb.course.findMany({
			where: {
				isPublished: true,
				title: {
					contains: title,
				},
				categoryLabel,
			},
			include: {
				category: true,
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

		const courseWithProgress: CourseWithProgressWithCategory[] =
			await Promise.all(
				courses.map(async (course) => {
					if (course.purchases.length == 0 && !course.isFree) {
						return {
							...course,
							progress: null,
							studentEnrolled: course.studentsEnrolled,
						};
					}

					const progressPercentage = await getProgress(
						userId,
						course.id
					);
					return {
						...course,
						progress: progressPercentage,
						studentEnrolled: course.studentsEnrolled,
					};
				})
			);

		return courseWithProgress;
	} catch (error) {
		console.log("[GET_ALL_COURSES_ACTION]", error);
		return [];
	}
};
