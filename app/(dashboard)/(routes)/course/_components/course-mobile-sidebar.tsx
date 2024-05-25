import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import CourseSidebar from "./course-sidebar"
import { Chapter, Course, UserProgress } from "@prisma/client";


type Props = {
    course: Course & {
        chapters: (
            Chapter & {
                userProgress: UserProgress[] | null
            }
        )[]
    };
}

const CourseMobileSidebar = ({ course }: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent side={'left'}>
                <CourseSidebar
                    course={course}
                />
            </SheetContent>
        </Sheet >

    )
}

export default CourseMobileSidebar