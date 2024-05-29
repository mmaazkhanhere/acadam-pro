/**An api endpoint to delete a note. This endpoint is accessible to student only */

import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { isAdmin, isTeacher } from "@/helpers/userCheck";
import prismadb from "@/lib/prismadb";

export const DELETE = async (
	request: Request,
	{
		params,
	}: {
		params: { courseId: string; chapterId: string; noteId: string };
	}
) => {
	try {
		const { userId } = auth();
		const teacher = await isTeacher(userId as string);
		const admin = await isAdmin(userId as string);

		if (!userId || teacher || admin) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const deletedNote = await prismadb.notes.delete({
			where: {
				id: params.noteId,
				authorId: userId,
				chapterId: params.chapterId,
			},
		});

		return NextResponse.json(deletedNote);
	} catch (error) {
		console.error(`[NOTE_DELETE_API_ERROR]`, error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
