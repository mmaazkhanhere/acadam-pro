import { Course, Review } from "@prisma/client"

type Props = {
    course: Course & { reviews: Review[] }
}

const CourseOverviewCard = ({ course }: Props) => {

    const totalRatings = course.reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = course.reviews.length > 0 ? totalRatings / course.reviews.length : 0

    return (
        <article
            className="w-full flex items-center justify-between p-2 shadow-md border-xl"
        >

        </article>
    )
}

export default CourseOverviewCard