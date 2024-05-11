import Logo from "@/components/logo"
import SidebarRoutes from "./sidebar-routes"

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div
            className="flex flex-col items-center p-4 shadow-md h-full border-r
        overflow-y-auto"
        >
            <Logo />

            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
}

export default Sidebar