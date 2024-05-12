
import { UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { ThemeButton } from "@/components/ui/theme-button"

import MobileSidebar from "./mobile-sidebar"

type Props = {
    teacher?: boolean;
}

const Navbar = ({ teacher }: Props) => {


    return (
        <header
            className="p-4 h-full flex items-center justify-between shadow-sm bg-white"
        >

            <MobileSidebar
            />
            <div className="hidden lg:block" />

            <nav className="flex items-center gap-x-2">
                {
                    teacher && <Button
                        className="hidden md:block"
                    >
                        Create Course
                    </Button>
                }

                <ThemeButton />
                <UserButton />
            </nav>
        </header>
    )
}

export default Navbar