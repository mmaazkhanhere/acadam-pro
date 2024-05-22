
import { Course, Review, User } from "@prisma/client"
type Props = {
    course: Course & {
        chapters: { id: string }[];
        reviews: Review[] | null;
        teacher: User
        progress: number | null;
    }
}

const EnrolledCourseCard = (props: Props) => {
    return (
        <div>EnrolledCourseCard</div>
    )
}

export default EnrolledCourseCard