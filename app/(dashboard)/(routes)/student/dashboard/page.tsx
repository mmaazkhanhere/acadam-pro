import { auth } from "@clerk/nextjs/server"

import StudentWelcomeBoard from "./_components/student-welcome-board"

import prismadb from '@/lib/prismadb'
import StudentOverview from "./_components/student-overview"
import EnrolledCourseTable from "./_components/enrolled-courses-table"


type Props = {}

const StudentDashboard = async (props: Props) => {

    const { userId } = auth();

    const user = await prismadb.user.findUnique({
        where: {
            id: userId as string
        },
        select: {
            name: true
        }
    })

    return (
        <div className="p-4">
            <StudentWelcomeBoard
                name={user?.name as string}
            />
            <StudentOverview />

            <EnrolledCourseTable />
        </div>
    )
}

export default StudentDashboard