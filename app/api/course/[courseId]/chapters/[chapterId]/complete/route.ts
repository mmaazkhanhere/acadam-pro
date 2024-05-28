import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export const PUT = async (
	request: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) => {
	const { isCompleted } = await request.json();

	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userProgress = await prismadb.userProgress.upsert({
			where: {
				userId_chapterId: {
					userId,
					chapterId: params.chapterId,
				},
			},
			update: {
				isCompleted,
			},
			create: {
				userId,
				chapterId: params.chapterId,
				isCompleted,
			},
		});

		return NextResponse.json(userProgress);
	} catch (error) {
		console.error(`[CHAPTER_COMPLETE_ERROR]`, error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
