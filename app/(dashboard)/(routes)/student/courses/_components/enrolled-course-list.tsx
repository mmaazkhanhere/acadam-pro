
import { Course, Review, User } from "@prisma/client"
import EnrolledCourseCard from "./enrolled-course-card";

type CourseWithProgress = Course & {
    chapters: { id: string }[];
    reviews: Review[] | null;
    teacher: User
    progress: number | null;
}

type Props = {
    courses: CourseWithProgress[]
}

const EnrolledCourseList = ({ courses }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            {
                courses.map((course) => (
                    <EnrolledCourseCard
                        key={course.id}
                        course={course}
                    />
                ))
            }
        </div>
    )
}

export default EnrolledCourseList