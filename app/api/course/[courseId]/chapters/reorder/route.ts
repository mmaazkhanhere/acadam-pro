/**An api endpoint that makes a put request to change the order of chapter
 * arranged. This route is accessible to teacher and admin only
 */

import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const PUT = async (
	request: Request,
	{ params }: { params: { courseId: string } }
) => {
	const { list } = await request.json();

	try {
		const { userId } = auth();
		const teacher = isTeacher(userId as string);
		const admin = isAdmin(userId as string);

		if (!userId || !admin || !teacher) {
			return new NextResponse("Unauthorized", { status: 401 });
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

		for (let chapter of list) {
			await prismadb.chapter.update({
				where: {
					id: chapter.id,
				},
				data: {
					position: chapter.position,
				},
			});
		}

		return new NextResponse("Chapter Reordered", { status: 200 });
	} catch (error) {
		console.log("[CHAPTER_REORDER_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
