
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import prismadb from '@/lib/prismadb'
import CourseSidebar from '../_components/course-sidebar'
import CourseNavbar from '../_components/course-navbar'

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
            <div className='md:pl-60 w-full h-[80px] fixed z-50 inset-y-0'>
                <CourseNavbar
                    course={course}
                />
            </div>

            <div className='w-60 fixed z-50 hidden md:flex flex-col inset-y-0 border-r'>
                <CourseSidebar
                    course={course}
                />
            </div>

            <div className='md:pl-60 mt-[80px]'>
                {children}
            </div>

        </div>
    )
}

export default CourseIdLayout