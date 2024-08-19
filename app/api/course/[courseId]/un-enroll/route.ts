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

		if (!userId) {
			// If user is not authenticated
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const admin = await isAdmin(userId as string);
		const teacher = await isTeacher(userId as string);

		if (admin || teacher) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const unenrollUser = await prismadb.course.update({
			where: {
				id: params.courseId,
			},
			data: {
				studentsEnrolled: {
					disconnect: {
						id: userId,
					},
				},
			},
		});

		return NextResponse.json(unenrollUser);
	} catch (error) {
		console.error(`[STUDENT_UNENROLL_API_ERROR]`, { error });
		return new NextResponse("Internal server error", { status: 500 });
	}
};
