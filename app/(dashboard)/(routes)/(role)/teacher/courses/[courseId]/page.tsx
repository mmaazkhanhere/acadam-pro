import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";

import ActionButtons from "./_components/action-button";
import CourseTitleForm from "./_components/course-title-form";
import CourseDescriptionForm from "./_components/course-description-form";
import CourseCategoryForm from "./_components/course-category-form";
import CoursePriceForm from "./_components/course-price-form";
import IsCourseFree from "./_components/course-is-free-form";
import CourseImageForm from "./_components/course-image-form";
import ChapterForm from "./_components/chapter-form";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

type Props = {
	params: {
		courseId: string;
	};
};

const CoursePage = async ({ params }: Props) => {
	const { userId } = auth();

	const admin = await isAdmin(userId as string);
	const teacher = await isTeacher(userId as string);

	if (!userId || !teacher || !admin) {
		redirect("/");
	}

	const course = await prismadb.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			chapters: {
				orderBy: {
					position: "asc",
				},
			},
		},
	});

	const categories = await prismadb.category.findMany({
		orderBy: {
			name: "asc",
		},
	});

	if (!course) {
		redirect("/");
	}

	const requiredFields: any[] = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.categoryLabel,
		course?.chapters.some((chapter) => chapter.isPublished),
	];

	if (!course?.isFree && !admin) {
		requiredFields.push(course?.price);
	}

	const totalFields = requiredFields.length;

	const completedFields = requiredFields.filter((field) =>
		Boolean(field)
	).length;

	const completionText = `(${completedFields}/${totalFields})`;

	const isCompleted = requiredFields.every(Boolean);

	return (
		<div>
			{!course?.isPublished && (
				<Banner
					label="This course is unpublished. It will not be visible to the 
                students"
				/>
			)}

			<div className="flex justify-between items-center w-full mt-5 p-5">
				<div className="flex flex-col ">
					<h1 className="text-2xl">Course Details</h1>

					<span className="text-sm text-gray-500 dark:text-muted-foreground">
						Fields completed {completionText}
					</span>
				</div>

				<ActionButtons
					isPublished={course?.isPublished}
					isCompleted={isCompleted}
					courseId={params.courseId}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full p-5 ">
				<div className="w-full space-y-6">
					<CourseTitleForm
						initialTitle={course?.title}
						courseId={course?.id}
						isPublished={course.isPublished}
					/>

					<CourseDescriptionForm
						initialDescription={course?.description as string}
						isPublished={course.isPublished}
						courseId={course?.id}
					/>

					<CourseImageForm
						initialImage={course.imageUrl as string}
						courseId={course.id}
						isPublished={course.isPublished}
					/>

					<CourseCategoryForm
						initialCategory={course.categoryLabel as string}
						courseId={course.id}
						categories={categories}
						isPublished={course.isPublished}
					/>
				</div>

				<div className="space-y-6">
					<IsCourseFree
						isCourseFree={course.isFree}
						courseId={course.id}
						isPublished={course.isPublished}
					/>

					{!course.isFree && !admin && (
						<CoursePriceForm
							initialPrice={course.price as number}
							courseId={course.id}
							isPublished={course.isPublished}
						/>
					)}

					<ChapterForm
						courseId={course.id}
						course={course}
						isPublished={course.isPublished}
					/>
				</div>
			</div>
		</div>
	);
};

export default CoursePage;
