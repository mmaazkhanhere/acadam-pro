/**An api route to create new course accessible to teacher and admin only */

import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const POST = async (request: Request) => {
	const body = await request.json();
	const { isFree } = body;
	try {
		const { userId } = auth();
		const admin = await isAdmin(userId as string);
		const teacher = await isTeacher(userId as string);

		if (!userId || (!admin && !teacher)) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		let courseData = {
			...body,
			teacherId: userId,
		};

		if (admin && !isFree) {
			courseData.isPro = true;
			courseData.price = 20;
		}

		const course = await prismadb.course.create({
			data: courseData,
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSE_CREATION_API]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
