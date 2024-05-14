
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb"


export const POST = async (request: Request, { params }: { params: { courseId: string } }) => {

    const body = await request.json();

    try {
        const { userId } = auth();
        const { title } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!title) {
            return new NextResponse('Missing Details', { status: 400 })
        }

        const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                teacherId: userId
            }
        })

        if (!course) {
            return new NextResponse('No course found', { status: 406 })
        }

        const lastChapter = await prismadb.chapter.findFirst({
            where: {
                courseId: params.courseId
            },
            orderBy: {
                position: 'desc'
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await prismadb.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPosition
            }
        });

        return NextResponse.json(chapter);

    } catch (error) {
        console.error(['CHAPTERS_CREATION_ERROR'], error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}