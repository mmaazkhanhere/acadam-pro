
import Logo from "@/components/logo";

import CourseSidebarItem from "./course-sidebar-item";

import { Chapter, Course, UserProgress } from "@prisma/client"


type Props = {
    course: Course & {
        chapters: (
            Chapter & {
                userProgress: UserProgress[] | null
            }
        )[]
    };
}

const CourseSidebar = ({ course }: Props) => {
    return (
        <div
            className="flex flex-col items-center p-4 md:shadow-sm h-full overflow-y-auto"
        >

            <Logo />

            <div className="flex flex-col w-full mt-10">
                <p className="text-lg text-center font-bold mb-4">
                    {course.title}
                </p>
                {
                    course.chapters.map((chapter) => (
                        <CourseSidebarItem
                            key={chapter.id}
                            label={chapter.title}
                            id={chapter.id}
                            isLocked={!chapter.isFree}
                            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                            courseId={course.id}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default CourseSidebar