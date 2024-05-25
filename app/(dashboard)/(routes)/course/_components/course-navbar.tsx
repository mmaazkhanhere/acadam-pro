"use client"

import { useRouter } from "next/navigation"

import { UserButton } from "@clerk/nextjs";


import { ThemeButton } from "@/components/ui/theme-button";
;

import { ArrowLeft, LogOut } from "lucide-react";
import CourseMobileSidebar from "./course-mobile-sidebar";


type Props = {}

const CourseNavbar = (props: Props) => {

    const router = useRouter();


    const onClick = () => {
        router.push('/student/dashboard');
    }

    return (
        <div
            className="p-4 h-full flex items-center justify-between shadow-sm bg-white dark:bg-muted-foreground/10"
        >
            <div className="flex items-center gap-x-4">
                <button
                    type="button"
                    aria-label="Back button"
                    onClick={onClick}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="blck md:hidden">
                    <CourseMobileSidebar />
                </div>
            </div>


            <div className="flex items-center gap-x-4">
                <ThemeButton />
                <UserButton />

            </div>
        </div>
    )
}

export default CourseNavbar