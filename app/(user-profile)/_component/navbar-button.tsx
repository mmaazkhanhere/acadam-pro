"use client"

import { redirect } from 'next/navigation';

import { SignOutButton, useAuth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { ThemeButton } from '@/components/ui/theme-button';

import { LogOut } from 'lucide-react';


type Props = {}

const NavbarButton = (props: Props) => {

    const { userId } = useAuth();

    if (!userId) {
        return redirect('/')
    }

    const onClick = () => {
        redirect('/dashboard')
    }

    return (
        <nav className='hidden md:flex items-center justify-center gap-x-4'>
            {
                userId && <Button onClick={onClick}>
                    Dashboard
                </Button>
            }

            <ThemeButton />

            <SignOutButton>
                <LogOut />
            </SignOutButton>

        </nav>
    )
}

export default NavbarButton