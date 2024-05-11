
import Logo from '@/components/logo'
import NavbarButtons from './navbar-buttons'
import MobileMenu from './mobile-menu'
import NavbarMenu from './navbar-menu'

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