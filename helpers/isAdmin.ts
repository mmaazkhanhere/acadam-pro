import prismadb from '@/lib/prismadb'

export const isTeacher = async (userId: string) => {
    const user = await prismadb.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            userType: true
        }
    });

    return user?.userType === 'Teacher';
}

export const isAdmin = async (userId: string) => {
    return process.env.NEXT_PUBLIC_ADMIN_ID === userId
}