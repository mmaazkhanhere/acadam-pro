/**An api route to update or delete a course that is accessible to teacher and
 * admin only
 */

import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

const { video } = new Mux({
	tokenId: process.env["MUX_TOKEN_ID"],
	tokenSecret: process.env["MUX_TOKEN_SECRET"],
});

export const DELETE = async (
	req: Request,
	{ params }: { params: { courseId: string } }
) => {
	try {
		const { userId } = auth();
		const admin = isAdmin(userId as string);
		const teacher = isTeacher(userId as string);

		if (!userId || (!admin && !teacher)) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await prismadb.course.findUnique({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
			include: {
				chapters: {
					select: {
						muxData: true,
					},
				},
			},
		});

		if (!course) {
			return new NextResponse("Cannot find the course", { status: 406 });
		}

		for (const chapter of course.chapters) {
			if (chapter.muxData?.assetId) {
				await video.assets.delete(chapter.muxData.assetId);
			}
		}

		const deletedCourse = await prismadb.course.delete({
			where: {
				id: params.courseId,
			},
		});

		return NextResponse.json(deletedCourse);
	} catch (error) {
		console.error(`[COURSE_DELETE_API_ERROR]`, error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};

export const PATCH = async (
	request: Request,
	{ params }: { params: { courseId: string } }
) => {
	const body = await request.json();

	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const admin = await isAdmin(userId as string);
		const teacher = await isTeacher(userId as string);

		if (!admin && !teacher) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await prismadb.course.findUnique({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
		});

		if (!course) {
			return new NextResponse("Cannot find the course", { status: 406 });
		}

		let updatedCourse;

		if (Object.keys(body).includes("isFree")) {
			console.log("Pro Loop");
			if (!body.isFree && admin) {
				updatedCourse = await prismadb.course.update({
					where: {
						id: params.courseId,
						teacherId: userId,
					},
					data: {
						isFree: false,
						price: 19.99,
						isPro: true,
					},
				});
			} else {
				console.log("Free Loop");
				updatedCourse = await prismadb.course.update({
					where: {
						id: params.courseId,
						teacherId: userId,
					},
					data: {
						isFree: true,
						price: 0,
						isPro: false,
					},
				});
			}

			return NextResponse.json(updatedCourse);
		}

		updatedCourse = await prismadb.course.update({
			where: {
				id: params.courseId,
				teacherId: userId,
			},
			data: {
				...body,
			},
		});

		console.log(updatedCourse);

		return NextResponse.json(updatedCourse);
	} catch (error) {
		console.log("[COURSE_UPDATE_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
