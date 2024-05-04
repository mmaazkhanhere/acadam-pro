import React from 'react'
import { Pacifico } from 'next/font/google'
import Link from 'next/link'

const anton = Pacifico({ subsets: ['latin'], weight: '400' })

type Props = {}

const Logo = (props: Props) => {
    return (
        <Link
            href='/'
            className={`${anton.className} font-bold text-3xl animate-pulse 
            transition ease-out tracking-wider text-purple-500`}
        >
            AcadamPro
        </Link>
    )
}

export default Logo