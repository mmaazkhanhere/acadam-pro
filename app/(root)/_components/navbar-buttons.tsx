
"use client"

import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { ThemeButton } from '@/components/theme-button'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import SignInButton from '@/components/sign-in-button'


type Props = {}

const NavbarButtons = (props: Props) => {

    const router = useRouter();
    const { status } = useSession();

    console.log(status)

    return (
        <nav className='flex items-center gap-x-2 md:gap-x-4'>

            {
                status == 'authenticated' ? (
                    <UserAvatar />
                ) : (

                    <SignInButton />
                )
            }

            {
                status == 'authenticated' && <Link
                    href={`/dashboard`}
                >
                    <Button
                        size='sm'
                        className='hidden md:block'
                    >
                        Dashboard
                    </Button>
                </Link>

            }

            <ThemeButton />

        </nav>
    )
}

export default NavbarButtons