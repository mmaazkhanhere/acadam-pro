
import Link from 'next/link'

import { auth } from '@clerk/nextjs/server'
import { SignInButton, SignOutButton } from '@clerk/nextjs'

import { ThemeButton } from '@/components/ui/theme-button'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'

import prismadb from '@/lib/prismadb'

import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'


type Props = {}

const NavbarButtons = async (props: Props) => {

    const { userId } = auth();
    
    if(!userId){
        return(
            <nav className='flex items-center gap-x-2 md:gap-x-4'>

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

    const user = await prismadb.user.findUnique({
        where: {
            id: userId as string,
        },
        select: {
            userType: true
        }
    })

    return (
        <nav className='flex items-center gap-x-2 md:gap-x-4'>

            {
                userId && <Link
                    href={`/${user?.userType.toLowerCase()}/dashboard`}
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