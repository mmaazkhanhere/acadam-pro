
import { auth } from "@clerk/nextjs/server"
import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"
import { isAdmin } from "@/helpers/isAdmin"
import prismadb from '@/lib/prismadb'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {

    const { userId } = auth();

    const admin = isAdmin(userId!);
    const user = await prismadb.user.findUnique({
        where: {
            id: userId!,
        },
        select: {
            userType: true
        }
    });

    const isTeacher = user?.userType === 'Teacher'


    return (
        <main className="h-full">
            <div className="h-[80px] md:pl-60 fixed w-full z-50 inset-y-0">
                <Navbar
                    admin={admin}
                    isTeacher={isTeacher}
                />
            </div>
            <div
                className="w-60 hidden md:flex flex-col fixed z-50 
                inset-y-0"
            >
                <Sidebar />
            </div>
            <div className="pt-[80px] px-4 md:px-0 md:pl-60 h-full">
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout