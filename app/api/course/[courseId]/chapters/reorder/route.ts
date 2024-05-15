import { NextResponse } from "next/server"

import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs/server"

export const PUT = async (request: Request, { params }: { params: { courseId: string } }) => {

    const { list } = await request.json();

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
        });

        if (!course) {
            return new NextResponse('No course found', { status: 406 });
        }

        for (let chapter of list) {
            await prismadb.chapter.update({
                where: {
                    id: chapter.id,
                },
                data: {
                    position: chapter.position
                }
            })
        };

        return new NextResponse('Chapter Reordered', { status: 200 })

    } catch (error) {
        console.log('[CHAPTER_REORDER_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }

}