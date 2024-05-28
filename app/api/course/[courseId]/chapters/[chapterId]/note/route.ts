import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

export const POST = async (
	request: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) => {
	const { body } = await request.json();

	try {
		const { userId } = auth();
		const teacher = await isTeacher(userId as string);
		const admin = await isAdmin(userId as string);

		if (!userId || admin || teacher) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const newNote = await prismadb.notes.create({
			data: {
				authorId: userId,
				body,
				chapterId: params.chapterId,
			},
		});

		return NextResponse.json(newNote);
	} catch (error) {
		console.error("[NEW_NOTE_POST_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
