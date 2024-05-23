
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server"

import prismadb from '@/lib/prismadb'

export const POST = async (request: Request, { params }: { params: { courseId: string } }) => {

    const { rating, review } = await request.json()

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const course = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                studentsEnrolled: {
                    some: {
                        id: userId
                    }
                }
            }

        });


        if (!course) {
            return new NextResponse("Couldn't find the course", { status: 401 })
        }

        const courseRating = await prismadb.review.create({
            data: {
                courseId: params.courseId,
                rating,
                description: review,
                authorId: userId
            }
        })

        return NextResponse.json(courseRating)

    } catch (error) {
        console.log(`[RATING_API_ERROR]`, error)
        return new NextResponse('Internal server error', { status: 500 })
    }

}