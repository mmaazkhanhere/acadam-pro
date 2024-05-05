import Logo from '@/components/logo'
import React from 'react'
import NavbarButtons from './navbar-buttons'
import NavbarMenu from './navbar-menu'
import MobileMenu from './mobile-menu'

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