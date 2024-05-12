"use client"

import { usePathname } from 'next/navigation'

import { useAuth } from '@clerk/nextjs'

import { isTeacher } from '@/helpers/isAdmin'

import { BarChartBig, BookOpen, Compass, Files, LayoutDashboard } from 'lucide-react'
import SidebarItems from './sidebar-items'

type Props = {
    teacher?: boolean;
}

const studentRoutes = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        href: '/student/dashboard',
    },
    {
        icon: BookOpen,
        label: 'My Courses',
        href: `/student/dashboard/courses`
    },
    {
        icon: Compass,
        label: 'Explore',
        href: '/student/dashboard/explore'
    },
]


const teacherRoutes = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        href: '/teacher/dashboard',
    },
    {
        icon: Files,
        label: 'My Courses',
        href: '/teacher/dashboard/my-courses',
    },
    {
        icon: BarChartBig,
        label: 'Analytics',
        href: '/teacher/dashboard/analytics',
    },
]

const SidebarRoutes = ({ teacher }: Props) => {

    const pathname = usePathname();

    const page = teacher ? teacherRoutes : studentRoutes

    return (
        <div className='flex flex-col w-full mt-10 '>
            <div>
                {
                    page.map((route) => (
                        <SidebarItems
                            key={route.href}
                            icon={route.icon}
                            label={route.label}
                            href={route.href}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default SidebarRoutes