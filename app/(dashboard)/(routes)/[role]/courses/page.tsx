
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server"

import prismadb from '@/lib/prismadb'
import CourseCard from "./_components/course-card";

type Props = {}

const CoursesHomepage = async (props: Props) => {

    const { userId } = auth();

    if (!userId) {
        return redirect('/')
    }

    const courses = await prismadb.course.findMany({
        where: {
            teacherId: userId,
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    return (
        <div>
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

export default CoursesHomepage