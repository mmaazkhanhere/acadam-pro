
import { getEnrolledCourses } from '@/actions/getEnrolledCourses';
import { isAdmin, isTeacher } from '@/helpers/userCheck';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import EnrolledCourseCard from './_components/enrolled-course-card';

type Props = {}

const MyCourses = async (props: Props) => {

    const { userId } = auth();

    const teacher = await isTeacher(userId as string);
    const admin = await isAdmin(userId as string);

    if (!userId || teacher || admin) {
        redirect('/')
    }

    const courses = await getEnrolledCourses({ userId })

    if (courses.length === 0) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <Image
                    src='/nothing-found.jpg'
                    alt='Nothing found'
                    width={500}
                    height={500}
                />
            </div>
        )
    }

    return (
        <div className='flex flex-col items-start p-4'>

            <h1 className='text-2xl font-bold'>
                Courses Enrolled
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 w-full'>
                {
                    courses.map((course) => (
                        <EnrolledCourseCard
                            key={course.id}
                            course={course}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default MyCourses