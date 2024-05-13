
import { Banner } from "@/components/banner"
import prismadb from "@/lib/prismadb"

type Props = {
    params: {
        courseId: string
    }
}

const CoursePage = async ({ params }: Props) => {

    const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    return (
        <div>
            {
                !course?.isPublished && <Banner
                    label='This course is unpublished. It will not be visible to the 
                students'
                />
            }
        </div>
    )
}

export default CoursePage