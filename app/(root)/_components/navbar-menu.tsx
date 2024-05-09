"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

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

const NavbarMenu = (props: Props) => {

    const pathName = usePathname();

    return (
        <nav className='flex items-center gap-x-6'>
            {
                routes.map((route) => (
                    <Link
                        key={route.label}
                        href={route.href}
                        className={cn(
                            'hidden lg:block hover:opacity-75 hover:underline underline-offset-4 hover:decoration-purple-500 transition duration-300 ',
                            pathName === route.href && 'underline decoration-purple-500 underline-offset-4'
                        )}
                    >
                        {route.label}
                    </Link>
                ))
            }


        </nav>
    )
}

export default NavbarMenu