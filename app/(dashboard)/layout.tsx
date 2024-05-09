
import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"

type Props = {
    children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {


    return (
        <main className="h-full">
            <div className="h-[80px] pl-60 fixed w-full z-50 inset-y-0">
                <Navbar />
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