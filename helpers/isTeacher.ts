import prismadb from "@/lib/prismadb"

export const isTeacher = async (userId?: string) => {

    const user = await prismadb.user.findUnique({
        where: {
            id: userId,
            userType: 'Teacher'
        }
    })

    return userId === user?.id
}