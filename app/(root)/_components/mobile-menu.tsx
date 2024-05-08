"use client"

import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'

import { Menu } from 'lucide-react'
import { useSession } from 'next-auth/react'

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

    const { status } = useSession();

    const onClick = (href: string) => {
        redirect(href)
    }

    return (
        <Sheet >
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
                        <button
                            key={route.label}
                            onClick={() => onClick(route.href)}
                            className='flex flex-col items-center'
                            aria-label={`${route.label} button`}
                        >
                            {route.label}
                        </button>

                    ))
                }

                {

                    status == 'authenticated' && <Link
                        href={`/dashboard`}
                    >
                        <Button
                            onClick={() => onClick('/dashboard')}
                            size='sm'
                            className='w-full md:hidden'
                            aria-label='Dashboard Button'
                        >
                            Dashboard
                        </Button>
                    </Link>


                }

            </SheetContent>
        </Sheet>

    )
}

export default MobileMenu