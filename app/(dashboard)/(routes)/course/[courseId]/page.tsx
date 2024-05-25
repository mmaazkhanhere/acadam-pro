
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

type Props = {
    params: {
        courseId: string
    }
}

const CourseIdPage = async ({ params }: Props) => {

    console.log(params.courseId)

    const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId,
            isPublished: true
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                orderBy: {
                    position: 'asc'
                }
            },
        },

    })

    if (!course) {
        redirect('/')
    }

    return redirect(`/course/${course.id}/chapter/${course.chapters[0].id}`)
}

export default CourseIdPage