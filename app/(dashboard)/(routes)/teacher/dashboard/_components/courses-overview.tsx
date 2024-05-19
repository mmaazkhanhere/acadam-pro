
import { auth } from "@clerk/nextjs/server"

import CourseOverviewCard from "./course-overview-card";

import prismadb from '@/lib/prismadb'


type Props = {}

const CoursesOverview = async (props: Props) => {

    const { userId } = auth();

    const courses = await prismadb.course.findMany({
        where: {
            teacherId: userId
        },
        include: {
            reviews: true
        }
    })

    return (
        <section className="w-full flex flex-col items-start p-4">
            {
                courses.map((course) => (
                    <CourseOverviewCard
                        key={course.id}
                        course={course}
                    />
                ))
            }
        </section>
    )
}

export default CoursesOverview