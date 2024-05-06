import { Github, Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer
            className='flex items-center justify-center gap-4 md:gap-x-12 border-t py-2
        text-xs md:text-sm'
        >

            <div className='flex items-center justify-center md:gap-2'>
                <Heart className='fill-red-500' />
                <div className='ml-1'>
                    Created By:
                    <Link
                        href='mmaazkhan.vercel.app'
                        target='_blank'
                        className='underline'
                    >
                        mmaazkhanhere
                    </Link>
                </div>

            </div>

            <div className='flex items-center justify-center md:gap-2'>
                <Github />
                <Link
                    href='https://github.com/mmaazkhanhere/acadam-pro'
                    target='_blank'
                    className='underline'
                >
                    Github Repo
                </Link>
            </div>
        </footer>
    )
}

export default Footer