/*An api route to publish or unpublish a course that is accessible to teacher and
admin only */

import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const PATCH = async (
	request: Request,
	{ params }: { params: { courseId: string } }
) => {
	const body = await request.json();
	try {
		const { userId } = auth();
		const teacher = await isTeacher(userId as string);
		const admin = await isAdmin(userId as string);

		if (!userId || (!admin && !teacher)) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await prismadb.course.findUnique({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
		});

		if (!course) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const courseChapters = await prismadb.course.findUnique({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
			select: {
				chapters: true,
			},
		});

		const publishedChapters = courseChapters?.chapters.every(
			(chapter) => chapter.isPublished
		);

		if (!publishedChapters) {
			return new NextResponse("Chapters not published", { status: 406 });
		}

		const updatedCourse = await prismadb.course.update({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
			data: {
				isPublished: body.isPublished,
			},
		});

		return NextResponse.json(updatedCourse);
	} catch (error) {
		console.log("[COURSE_PUBLISH_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
