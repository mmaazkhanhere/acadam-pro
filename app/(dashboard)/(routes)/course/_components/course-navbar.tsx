"use client"

import { useRouter } from "next/navigation"

import { UserButton } from "@clerk/nextjs";


import { ThemeButton } from "@/components/ui/theme-button";
;

import { ArrowLeft, LogOut } from "lucide-react";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseCreationForm from "../../(role)/teacher/create-course/_component/course-creation-form";


type Props = {
    course: Course & {
        chapters: (
            Chapter & {
                userProgress: UserProgress[] | null
            }
        )[]
    };
}

const CourseNavbar = ({ course }: Props) => {

    const router = useRouter();


    const onClick = () => {
        router.push('/student/dashboard');
    }

    return (
        <div
            className="p-4 h-full flex items-center justify-between shadow-sm bg-white dark:bg-muted-foreground/10"
        >
            <div className="flex items-center gap-x-4">
                <div className="md:hidden">
                    <CourseMobileSidebar
                        course={course}
                    />
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