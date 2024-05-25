
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server"

import prismadb from '@/lib/prismadb'
import CourseCard from "./_components/course-card";
import Image from "next/image";
import { isAdmin, isTeacher } from "@/helpers/userCheck";

type Props = {}

const CoursesHomepage = async (props: Props) => {

    const { userId } = auth();

    const admin = await isAdmin(userId as string)
    const teacher = await isTeacher(userId as string)

    if (!userId || !admin || !teacher) {
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
                        admin={admin}
                    />
                ))
            }
            {
                courses.length === 0 && <div className="flex flex-col items-center justify-center w-full">
                    <Image
                        src='/nothing-found.png'
                        alt="Nothing found picture"
                        width={400}
                        height={400}
                    />

                </div>
            }
        </div>
    )
}

export default CoursesHomepage