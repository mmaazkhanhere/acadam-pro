/**An api route to create a new chapter for a course and is accessible to teacher and
 * admin only
 */
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const POST = async (
	request: Request,
	{ params }: { params: { courseId: string } }
) => {
	const body = await request.json();
	const { title } = body;
	try {
		const { userId } = auth();
		const admin = isAdmin(userId as string);
		const teacher = isTeacher(userId as string);

		if (!userId || (!admin && !teacher)) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!title) {
			return new NextResponse("Missing Details", { status: 400 });
		}

		const course = await prismadb.course.findUnique({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
		});

		if (!course) {
			return new NextResponse("No course found", { status: 406 });
		}

		const lastChapter = await prismadb.chapter.findFirst({
			where: {
				courseId: params.courseId,
			},
			orderBy: {
				position: "desc",
			},
		});

		const newPosition = lastChapter ? lastChapter.position + 1 : 1;

		const chapter = await prismadb.chapter.create({
			data: {
				title,
				courseId: params.courseId,
				position: newPosition,
			},
		});

		return NextResponse.json(chapter);
	} catch (error) {
		console.error(["CHAPTERS_CREATION_ERROR"], error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
