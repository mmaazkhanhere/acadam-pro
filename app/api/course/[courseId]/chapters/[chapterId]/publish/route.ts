import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export const PATCH = async (
	request: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) => {
	const body = await request.json();

	try {
		const { userId } = auth();

		if (!userId) {
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
