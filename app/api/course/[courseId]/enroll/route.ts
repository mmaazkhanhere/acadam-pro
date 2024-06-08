/*An api route that enrolls the student in a course and is accessible to student
only */
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const PATCH = async (
	request: Request,
	{ params }: { params: { courseId: string } }
) => {
	try {
		const { userId } = auth();

		const admin = await isAdmin(userId as string);
		const teacher = await isTeacher(userId as string);

		if (!userId || (!admin && !teacher)) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const enrollUser = await prismadb.course.update({
			where: {
				id: params.courseId,
			},
			data: {
				studentsEnrolled: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return NextResponse.json(enrollUser);
	} catch (error) {
		console.error(`[STUDENT_ENROLL_API_ERROR]`, { error });
		return new NextResponse("Internal server error", { status: 500 });
	}
};
