import Logo from '@/components/logo'
import React from 'react'
import NavbarButtons from './navbar-buttons'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <header className='flex items-center justify-between'>
            <Logo />
            <NavbarButtons />
        </header>
    )
}

export default Navbar