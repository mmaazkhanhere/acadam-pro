import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb"
import { isAdmin } from "@/helpers/userCheck";

export const POST = async (request: Request) => {
    const body = await request.json();

    try {

        const { userId } = auth();

        const { isFree } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const admin = await isAdmin(userId);

        let course;

        if (admin && !isFree) {
            course = await prismadb.course.create({
                data: {
                    isPro: true,
                    price: 20,
                    ...body,
                    teacherId: userId
                }
            })
        }
        else {
            course = await prismadb.course.create({
                data: {
                    ...body,
                    teacherId: userId
                }
            })
        }

        return NextResponse.json(course)

    } catch (error) {
        console.log('[COURSE_CREATION_API]', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}