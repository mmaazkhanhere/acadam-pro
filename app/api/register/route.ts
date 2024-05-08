import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prismadb from '@/lib/prismadb'
import bcrypt from "bcryptjs"

export const POST = async (request: Request) => {

    const body = await request.json();

    try {

        const { name, username, emailAddress, password, role } = body

        if (!name || !username || !emailAddress || !password || !role) {
            return new NextResponse('Missing details', { status: 400 })
        }

        const existingUser = await prismadb.user.findUnique({
            where: {
                username: username,
                emailAddress: emailAddress,
            }
        })

        if (existingUser) {
            return new NextResponse('User already exists', { status: 405 })
        }
        else {
            const hashedPassword = await bcrypt.hash(body.password, 12)

            const user = await prismadb.user.create({
                data: {
                    name: body.name,
                    username: body.username,
                    emailAddress: body.emailAddress,
                    hashedPassword,
                    role: body.role
                }
            })

            return NextResponse.json(user)
        }

    } catch (error) {
        console.error('[REGISTER_API]', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}