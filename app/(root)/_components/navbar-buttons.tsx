
import Link from 'next/link'

import { auth } from '@clerk/nextjs/server'
import { SignInButton, SignOutButton } from '@clerk/nextjs'

import { ThemeButton } from '@/components/ui/theme-button'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'

import { LogOut } from 'lucide-react'


type Props = {}

const NavbarButtons = (props: Props) => {

    const { userId } = auth();

    return (
        <nav className='flex items-center gap-x-2 md:gap-x-4'>

            {
                userId && <Link
                    href={`/dashboard`}
                >
                    <Button
                        size='sm'
                        className='hidden md:block'
                        aria-label='dashboard button'
                    >
                        Dashboard
                    </Button>
                </Link>

            }

            <ThemeButton />

            {
                userId ? (
                    <UserAvatar />
                ) : (

                    <SignInButton>
                        <Button
                            variant='outline'
                            className='hover:bg-purple-500 hover:text-white'
                        >
                            Join Us
                        </Button>
                    </SignInButton>
                )
            }

            {
                userId && <SignOutButton>
                    <Button variant='ghost'
                        className='hidden lg:block'
                    >
                        <LogOut />
                    </Button>

                </SignOutButton>
            }

        </nav>
    )
}

export default NavbarButtons