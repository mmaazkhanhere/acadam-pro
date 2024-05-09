"use client"

import { ThemeButton } from "@/components/theme-button";
import { usePathname, useRouter } from "next/navigation"
import SearchInput from "./search-input";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { isTeacher } from "@/helpers/isTeacher";
import { Button } from "@/components/ui/button";

type Props = {
    teacher?: boolean
}

const Navbar = ({ teacher }: Props) => {

    const pathname = usePathname();
    const router = useRouter();

    const isSearchPage = pathname.includes('/search');

    const { data } = useSession();

    const onClick = () => {
        router.push('/')
    }

    return (
        <nav className="p-4 border-b h-full flex justify-between items-center bg-white shadow-sm">

            <div>

                <button
                    onClick={onClick}
                >
                    <ArrowLeft />
                </button>

                {
                    isSearchPage && <div className="hidden md:block">
                        <SearchInput />
                    </div>

                }
            </div>


            <div className="">
                {
                    teacher && <Button>
                        Create Course
                    </Button>
                }
                <ThemeButton />
            </div>

        </nav>
    )
}

export default Navbar