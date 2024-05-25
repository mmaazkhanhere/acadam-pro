
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import prismadb from '@/lib/prismadb'
import CourseSidebar from '../_components/course-sidebar'

type Props = {
    children: React.ReactNode
    params: {
        courseId: string
    }
}

const CourseIdLayout = async ({ children, params }: Props) => {

    const { userId } = auth();

    if (!userId) {
        return redirect('/')
    }

    const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    });

    if (!course) {
        return redirect('/');
    }



    return (

        <div className='h-full'>
            <div className='w-60 fixed z-50 hidden md:flex flex-col inset-y-0 border-r'>
                <CourseSidebar
                    course={course}
                />
            </div>
            <div className='pl-60'>
                {children}
            </div>

        </div>
    )
}

export default CourseIdLayout