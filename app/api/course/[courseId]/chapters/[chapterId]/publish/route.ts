/**An api endpoint to publish or unplish a chapter. This endpoint is
 * accessible to admin and teacher only
 */

import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const PATCH = async (
	request: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) => {
	const body = await request.json();

	try {
		const { userId } = auth();
		const teacher = isTeacher(userId as string);
		const admin = isAdmin(userId as string);

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

		const { isPublished } = body;

		const updatedChapter = await prismadb.chapter.update({
			where: {
				id: params.chapterId,
				courseId: params.courseId,
			},
			data: {
				isPublished,
			},
		});

		return NextResponse.json(updatedChapter);
	} catch (error) {
		console.error("[CHAPTER_PUBLISH_API_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
