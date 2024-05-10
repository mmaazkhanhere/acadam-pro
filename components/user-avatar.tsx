import { auth } from "@clerk/nextjs/server"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import prismadb from '@/lib/prismadb'
import Link from "next/link";


export async function UserAvatar() {

    const { userId } = auth();

    const user = await prismadb.user.findUnique({
        where: {
            id: userId as string
        },
        select: {
            imageUrl: true,
        }
    })

    return (
        <Link
            href={`/user/${userId}`}
        >
            <Avatar>
                <AvatarImage src={user?.imageUrl!} alt="User Avatar" />
                <AvatarFallback>AV</AvatarFallback>
            </Avatar>
        </Link>

    )
}