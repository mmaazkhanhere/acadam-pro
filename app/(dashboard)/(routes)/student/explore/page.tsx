
import { redirect } from 'next/navigation'
import CategoryList from './_components/category-list'
import SearchInput from './_components/search-input'
import CourseList from './_components/course-list'

import prismadb from '@/lib/prismadb'


type Props = {
    searchParams: {
        title: string;
        category: string
    }
}

const Explore = async ({ searchParams }: Props) => {

    const categories = await prismadb.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    const courses = await prismadb.course.findMany({
        where: {
            isPublished: true
        },
        include: {
            reviews: true,
            teacher: true,
            chapters: true,
            studentsEnrolled: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });

    if (!categories || !courses) {
        redirect('/')
    }

    return (
        <div className='p-4'>
            <SearchInput />

            <div className='space-y-5'>
                <CategoryList
                    categories={categories}
                />

                <CourseList
                    courses={courses}
                />
            </div>

        </div>
    )
}

export default Explore