import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import Sidebar from "./sidebar"

import { Menu } from "lucide-react"

type Props = {}

const MobileSidebar = (props: Props) => {

    return (
        <Sheet>
            <SheetTrigger className="md:hidden transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side={'left'}>
                <Sidebar />
            </SheetContent>
        </Sheet>

    )
}

export default MobileSidebar