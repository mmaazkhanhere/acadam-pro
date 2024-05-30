import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import ActionButtons from "../../_components/action-button";
import BackButton from "./_components/back-button";

import prismadb from "@/lib/prismadb";
import ChapterTitleForm from "./_components/chapter-titlte-form";
import { Banner } from "@/components/banner";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccess from "./_components/chapter-access";
import ChapterVideoForm from "./_components/chapter-video-form";
import ChapterActionButtons from "./_components/chapter-action-buttons";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

type Props = {
	params: {
		courseId: string;
		chapterId: string;
	};
};

const ChapterPage = async ({ params }: Props) => {
	const { userId } = auth();

	const admin = await isAdmin(userId as string);
	const teacher = await isTeacher(userId as string);

	if (!userId || !admin || !teacher) {
		redirect("/");
	}

	const course = await prismadb.course.findUnique({
		where: {
			id: params.courseId,
			teacherId: userId,
		},
		select: {
			isFree: true,
			isPublished: true,
		},
	});

	const chapter = await prismadb.chapter.findUnique({
		where: {
			id: params.chapterId,
			courseId: params.courseId,
		},
		include: {
			muxData: true,
		},
	});

	if (!chapter) {
		redirect(`/teacher/courses/${params.courseId}`);
	}

	if (!course) {
		redirect("/");
	}

	const requiredFields = [
		chapter?.title,
		chapter?.description,
		chapter?.videoUrl,
	];

	const totalFields = requiredFields.length;

	const completedFields = requiredFields.filter((field) =>
		Boolean(field)
	).length;

	const completionText = `${completedFields}/${totalFields}`;

	const isCompleted = requiredFields.every(Boolean);

	return (
		<section>
			{!chapter?.isPublished && (
				<Banner
					label="This chapter is not published. It will not be visible to the 
                students"
				/>
			)}
			<div className="p-5 mt-8">
				<BackButton courseId={params.courseId} />
			</div>

			<div className="flex items-center justify-between w-full p-5">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-2xl">Create Chapter</h1>
					<p className="text-sm text-gray-500 dark:text-muted-foreground">
						Fields Completed ({completionText})
					</p>
				</div>

				<ChapterActionButtons
					isPublished={chapter?.isPublished}
					isCompleted={isCompleted}
					courseId={params.courseId}
					chapterId={params.chapterId}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full p-5">
				<div className="w-full space-y-6">
					<ChapterTitleForm
						chapterId={params.chapterId}
						courseId={params.courseId}
						initialTitle={chapter?.title}
						coursePublished={course.isPublished}
						chapterPublished={chapter?.isPublished}
					/>

					<ChapterDescriptionForm
						chapterId={params.chapterId}
						courseId={params.courseId}
						initialDescription={chapter?.description as string}
						coursePublished={course.isPublished}
						chapterPublished={chapter?.isPublished}
					/>

					{!course.isFree && (
						<ChapterAccess
							chapterId={params.chapterId}
							courseId={params.courseId}
							availability={chapter?.isFree}
							coursePublished={course.isPublished}
							chapterPublished={chapter?.isPublished}
						/>
					)}
				</div>

				<div>
					<ChapterVideoForm
						initialData={chapter!}
						courseId={params.courseId}
						chapterId={params.chapterId}
						coursePublished={course.isPublished}
						chapterPublished={chapter?.isPublished}
					/>
				</div>
			</div>
		</section>
	);
};

export default ChapterPage;
