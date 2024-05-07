import Logo from '@/components/logo'
import React from 'react'
import MobileMenu from './mobile-menu'
import NavbarMenu from './navbar-menu'
import NavbarButtons from './navbar-buttons'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <header className='flex items-center justify-between'>
            <nav className='lg:hidden'>
                <MobileMenu />
            </nav>
            <Logo className='hidden lg:block' />
            <NavbarMenu />
            <NavbarButtons />
        </header>
    )
}

export default Navbar