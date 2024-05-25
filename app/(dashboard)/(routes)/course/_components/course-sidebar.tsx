import { Chapter, Course, UserProgress } from "@prisma/client"
import CourseSidebarItem from "./course-sidebar-item";


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
        <div>
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
    )
}

export default CourseSidebar