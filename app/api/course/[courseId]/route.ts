import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb"


export const PATCH = async (request: Request, { params }: { params: { courseId: string } }) => {
    const body = await request.json();
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                teacherId: userId

            }
        })

        if (!course) {
            return new NextResponse('Cannot find the course', { status: 406 });
        }

        const updatedCourse = await prismadb.course.update({
            where: {
                id: params.courseId,
                teacherId: userId
            },
            data: {
                ...body
            }
        })

        return NextResponse.json(updatedCourse)

    } catch (error) {
        console.log('[COURSE_UPDATE_ERROR]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}