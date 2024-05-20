
import { auth } from '@clerk/nextjs/server'

import prismadb from '@/lib/prismadb'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';


type Props = {
}

const CoursesList = async (props: Props) => {

    const { userId } = auth();

    const courses = await prismadb.course.findMany({
        where: {
            teacherId: userId as string
        },
        include: {
            reviews: true
        }
    })

    return (
        <DataTable
            columns={columns}
            data={courses}
        />
    )
}

export default CoursesList