import { Course, User } from "@prisma/client"
import { CircleDollarSign, LibraryBig, Users } from "lucide-react"

type Props = {
    user: User & { coursesTeaching: (Course & { studentsEnrolled: User[] })[] }
}

const Metrics = ({ user }: Props) => {
    return (
        <section className="w-full grid grid-cols-3 gap-5 mt-5">

            <div className="flex flex-col items-center shadow-lg p-4 bor rounded-xl">
                <div className="flex items-center gap-x-2">
                    <LibraryBig className="w-6 h-6" />
                    <h2 className="text-xl font-bold">
                        Total Courses
                    </h2>
                </div>

                <p className="text-3xl pt-2">
                    {user.coursesTeaching.length} <span className="text-xl ml-1">Courses</span>
                </p>
            </div>

            <div className="flex flex-col items-center shadow-lg p-4 bor rounded-xl">
                <div className="flex items-center gap-x-2">
                    <Users className="w-6 h-6" />
                    <h2 className="text-xl font-bold">
                        Total Students
                    </h2>
                </div>

                <p className="text-3xl pt-2">
                    {user.coursesTeaching.reduce((acc, course) => acc + course.studentsEnrolled.length, 0)}<span className="text-xl ml-1">Students</span>
                </p>
            </div>

            <div className="flex flex-col items-center shadow-lg p-4 bor rounded-xl">
                <div className="flex items-center gap-x-2">
                    <CircleDollarSign className="w-6 h-6" />
                    <h2 className="text-xl font-bold">
                        Current Month
                    </h2>
                </div>

                <p className="text-3xl pt-2">
                    {user.coursesTeaching.reduce((acc, course) => acc + course.studentsEnrolled.length, 0)}<span className="text-xl ml-1">Students</span>
                </p>
            </div>
        </section>
    )
}

export default Metrics