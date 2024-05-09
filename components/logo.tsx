import { Pacifico } from 'next/font/google'
import Link from 'next/link'

const anton = Pacifico({ subsets: ['latin'], weight: '400' })

type Props = {
    className?: string
}

const Logo = ({ className }: Props) => {
    return (
        <Link
            href='/'
            className={`${anton.className} ${className} font-bold text-2xl md:text-3xl hover:animate-pulse 
            transition ease-out tracking-wider text-purple-500`}
        >
            AcadamPro
        </Link>
    )
}

export default Logo