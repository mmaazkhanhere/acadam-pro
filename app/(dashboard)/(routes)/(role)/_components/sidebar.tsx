import Logo from "@/components/logo"

import SidebarRoutes from "./sidebar-routes"

type Props = {
    teacher?: boolean
}

const Sidebar = ({ teacher }: Props) => {
    return (
        <div
            className="flex flex-col items-center p-4 md:shadow-sm h-full overflow-y-auto"
        >
            <Logo />

            <div className="flex flex-col w-full">
                <SidebarRoutes teacher={teacher} />
            </div>
        </div>
    )
}

export default Sidebar