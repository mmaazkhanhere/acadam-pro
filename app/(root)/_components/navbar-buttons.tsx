
import Link from 'next/link'
import React from 'react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { ThemeButton } from '@/components/theme-button'
import { Button } from '@/components/ui/button'

type Props = {}

const NavbarButtons = (props: Props) => {

    const { userId } = auth();

    return (
        <nav className='flex items-center gap-x-2 md:gap-x-4'>

            {
                userId ? (
                    <UserButton />
                ) : (
                    <SignInButton
                    >
                        <Button
                            variant='outline'
                            className='hover:bg-violet-500 transition duration-300
                            hover:text-white border-violet-500'
                        >
                            Join Us
                        </Button>
                    </SignInButton>
                )
            }

            {
                userId && <Link
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