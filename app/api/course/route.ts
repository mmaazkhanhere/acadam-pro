import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb"

export const POST = async (request: Request) => {
    const body = await request.json();

    try {
        //const { title, description, imageUrl, price, isFree } = body;
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const course = await prismadb.course.create({
            data: {
                ...body,
                teacherId: userId
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log('[COURSE_CREATION_API]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}