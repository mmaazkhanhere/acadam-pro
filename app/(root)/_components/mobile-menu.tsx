"use client"

import { redirect } from 'next/navigation'
import Link from 'next/link'

import { SignOutButton, useAuth } from '@clerk/nextjs'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'

import { LogOut, Menu } from 'lucide-react'

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

                    userId && <Link
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

                {
                    userId && <SignOutButton>
                        <Button variant='ghost'>
                            <LogOut /> Sign Out
                        </Button>

                    </SignOutButton>
                }

            </SheetContent>
        </Sheet>

    )
}

export default MobileMenu