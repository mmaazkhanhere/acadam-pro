"use client"

import { usePathname } from 'next/navigation'

import { UserButton, useAuth } from '@clerk/nextjs'

import { isAdmin } from '@/helpers/isAdmin'

import { BarChartBig, BookOpen, Compass, Files, LayoutDashboard } from 'lucide-react'
import SidebarItems from './sidebar-items'

type Props = {}

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

const SidebarRoutes = (props: Props) => {

    const pathname = usePathname();

    const { userId } = useAuth();

    const admin = isAdmin(userId!);

    const isTeacherPage = pathname.includes('/teacher') || admin

    const page = isTeacherPage ? teacherRoutes : studentRoutes

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