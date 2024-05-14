
import { Banner } from "@/components/banner"
import prismadb from "@/lib/prismadb"
import ActionButtons from "./_components/action-button"
import CourseTitleForm from "./_components/course-title-form"
import { redirect } from "next/navigation"

type Props = {
    params: {
        courseId: string
    }
}

const CoursePage = async ({ params }: Props) => {

    const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                orderBy: {
                    position: 'asc'
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    if (!course) {
        redirect('/')
    }

    const requiredFields = [
        course?.title,
        course?.description,
        course?.imageUrl,
        course?.categoryLabel,
        course?.chapters.some(chapter => chapter.isPublished),
        course?.isFree,
        course?.price,
    ]

    const totalFields = requiredFields.length;

    const completedFields = requiredFields.filter(field => Boolean(field)).length;

    const completionText = `(${completedFields}/${totalFields})`

    const isCompleted = requiredFields.every(Boolean)

    return (
        <div>
            {
                !course?.isPublished && <Banner
                    label='This course is unpublished. It will not be visible to the 
                students'
                />
            }

            <div className="flex justify-between items-center w-full mt-5 p-5">
                <div className="flex flex-col ">
                    <h1 className="text-2xl">
                        Course Details
                    </h1>

                    <span className="text-sm text-gray-500">
                        Fields completed {completionText}
                    </span>
                </div>

                <ActionButtons
                    isPublished={course?.isPublished}
                    isCompleted={isCompleted}
                />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full p-5">
                <div className="w-full">
                    <CourseTitleForm
                        initialTitle={course?.title}
                        courseId={course?.id}
                    />
                </div>
            </div>
        </div>
    )
}

export default CoursePage