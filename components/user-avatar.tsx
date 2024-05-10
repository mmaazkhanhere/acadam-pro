
import Link from "next/link";

import { auth } from "@clerk/nextjs/server"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import prismadb from '@/lib/prismadb'


import React from 'react'
import { cn } from "@/lib/utils";


type Props = {
    userPage?: boolean
}

export async function UserAvatar({ userPage }: Props) {

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
            <Avatar
                className={cn(
                    userPage && ` w-40 h-40 ring-offset-2 border-8 border-white`
                )}
            >
                <AvatarImage src={user?.imageUrl!} alt="User Avatar" />
                <AvatarFallback>AV</AvatarFallback>
            </Avatar>
        </Link>

    )
}