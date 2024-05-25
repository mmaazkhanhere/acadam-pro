import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const ChapterPAge = (props: Props) => {
    return (
        <div className='p-4 flex flex-col items-start'>
            <Link
                href='/student/dashboard'
            >
                <button
                    type="button"
                    aria-label="Back button"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </Link>

        </div>
    )
}

export default ChapterPAge