import { isTeacher } from '@/helpers/isAdmin'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import CourseCreationForm from './_component/course-creation-form'
import prismadb from '@/lib/prismadb'

type Props = {
    params: {
        role: string
    }
}

const CourseCreation = async ({ params }: Props) => {

    const { userId } = auth();

    const role = params.role;
    const teacher = await isTeacher(userId!)

    const categories = await prismadb.category.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    if (!teacher || role !== 'teacher') {
        redirect('/')
    }

    return (
        <section className='flex flex-col items-start p-4'>
            <h1 className='text-2xl font-bold'>
                Create your course
            </h1>
            <p className='text-gray-500 italic text-sm'>
                Please fill the following fields to create a course. The values
                can be changed later on
            </p>

            <CourseCreationForm
                categories={categories}
            />
        </section>
    )
}

export default CourseCreation