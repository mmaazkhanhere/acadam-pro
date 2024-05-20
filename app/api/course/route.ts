import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { isAdmin } from "@/helpers/userCheck";

export const POST = async (request: Request) => {
    const body = await request.json();

    try {
        const { userId } = auth();
        const { isFree } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const admin = await isAdmin(userId);

        let courseData = {
            ...body,
            teacherId: userId,
        };

        if (admin && !isFree) {
            courseData.isPro = true;
            courseData.price = 20;
        }

        const course = await prismadb.course.create({
            data: courseData,
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log('[COURSE_CREATION_API]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
