import { auth } from "@clerk/nextjs/server"

import UserDetail from "./user-detail"

import prismadb from '@/lib/prismadb'

type Props = {}

const UserHero = async (props: Props) => {

    const { userId } = auth();

    const user = await prismadb.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
            biography: true,
            userType: true,
        }
    })

    return (
        <section
            className="absolute w-full left-0 bg-purple-500 text-white h-[250px]"
        >
            <UserDetail user={user} />

        </section>
    )
}

export default UserHero