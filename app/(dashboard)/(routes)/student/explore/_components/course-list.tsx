import { Category, Course, Review, User } from "@prisma/client"
import CourseCard from "./course-card"

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: { id: string }[];
    reviews: Review[];
    teacher: User
    progress: number;
    studentsEnrolled: User[]
}

type Props = {
    courses: CourseWithProgressWithCategory[];
}

const CourseList = ({ courses }: Props) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                    />
                ))
            }
        </div>
    )
}

export default CourseList