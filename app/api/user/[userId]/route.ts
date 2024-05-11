
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prismadb from '@/lib/prismadb'

export const PATCH = async (request: Request, { params }: { params: { userId: string } }) => {

    const values = await request.json();

    try {

        const userId = params.userId

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const user = await prismadb.user.update({
            where: {
                id: userId,
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(user)


    } catch (error) {
        console.log('[USER_UPDATE_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}