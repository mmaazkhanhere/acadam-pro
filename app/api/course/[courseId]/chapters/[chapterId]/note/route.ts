/**An api endpoint to create a note. It is accessible to student only */

import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const POST = async (
	request: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) => {
	const req = await request.json();
	const { body, color } = req;

	try {
		const { userId } = auth();
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const teacher = await isTeacher(userId as string);
		const admin = await isAdmin(userId as string);

		if (teacher || admin) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const newNote = await prismadb.notes.create({
			data: {
				authorId: userId,
				body: body,
				color: color,
				chapterId: params.chapterId,
			},
		});

		return NextResponse.json(newNote);
	} catch (error) {
		console.error("[NEW_NOTE_POST_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
