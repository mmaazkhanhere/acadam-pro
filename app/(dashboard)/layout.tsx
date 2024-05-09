import { auth } from "@/auth"
import Navbar from "./components/navbar"
import Sidebar from "./components/sidebar"
import { isTeacher } from "@/helpers/isTeacher"
import { redirect } from "next/navigation"

type Props = {
    children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {

    const user = await auth();

    if (!user) {
        redirect('/')
    }

    console.log(user.user?.id)
    const teacher = await isTeacher(user.user?.id)

    return (
        <main className="h-full">
            <div className="h-[80px] pl-60 fixed w-full z-50 inset-y-0">
                <Navbar
                    teacher={teacher}
                />
            </div>
            <div
                className="w-60 hidden md:flex flex-col fixed z-50 
                inset-y-0"
            >
                <Sidebar />
            </div>
            <div className="pt-[80px] pl-60 h-full">
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout