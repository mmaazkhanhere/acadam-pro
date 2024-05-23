
import OverviewCard from "./overview-card"

import { CircleCheck, NotebookPen } from "lucide-react"

import prismadb from '@/lib/prismadb'
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getCompletedCourses } from "@/actions/getCompletedCourse"


type Props = {}

const StudentOverview = async (props: Props) => {

    const { userId } = auth();

    if (!userId) {
        redirect('/')
    }

    const coursesEnrolled = await prismadb.course.findMany({
        where: {
            studentsEnrolled: {
                some: {
                    id: userId
                }
            }
        }
    })

    const coursesCompleted = await getCompletedCourses({ userId });

    console.log(coursesCompleted)

    return (
        <div className="flex flex-col items-start gap-y-5 mt-5">
            <h1 className="text-2xl md:text-3xl font-bold">
                Status
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
                <OverviewCard
                    title='Courses In Progress'
                    value={coursesEnrolled.length}
                    icon={NotebookPen}

                />
                <OverviewCard
                    title='Courses Completed'
                    value={coursesCompleted}
                    icon={CircleCheck}
                    totalCourses={coursesEnrolled.length}
                    completedCourses={coursesCompleted}
                />
            </div>


        </div>
    )
}

export default StudentOverview