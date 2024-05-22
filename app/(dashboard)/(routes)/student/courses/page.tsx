
import { getEnrolledCourses } from '@/actions/getEnrolledCourses';
import { isAdmin, isTeacher } from '@/helpers/userCheck';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import EnrolledCourseList from './_components/enrolled-course-list';

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

    console.log(courses)

    return (
        <div>
            <EnrolledCourseList
                courses={courses}
            />
        </div>
    )
}

export default MyCourses