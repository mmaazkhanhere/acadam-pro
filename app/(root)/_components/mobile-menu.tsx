"use client"

import React from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Logo from '@/components/logo'
import { redirect } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}


const routes = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Pricing',
        href: '/pricing'
    },
    {
        label: 'Blog',
        href: '/blog'
    },
    {
        label: 'Contact',
        href: '/contact'
    }
]

const MobileMenu = (props: Props) => {

    const { userId } = useAuth();

    const onClick = (href: string) => {
        redirect(href)
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='w-7 h-7' />
            </SheetTrigger>
            <SheetContent
                side={'left'}
                className='flex flex-col items-center mb-5 w-full md:w-[500px]'
            >
                <Logo />
                {
                    routes.map((route) => (
                        <>
                            <button
                                key={route.label}
                                onClick={() => onClick(route.href)}
                                className='flex flex-col items-center'
                            >
                                {route.label}
                            </button>

                        </>

                    ))
                }

                {

                    userId && <Link
                        href={`/dashboard`}
                    >
                        <Button
                            size='sm'
                            className='w-full'
                        >
                            My Courses
                        </Button>
                    </Link>


                }

            </SheetContent>
        </Sheet>

    )
}

export default MobileMenu