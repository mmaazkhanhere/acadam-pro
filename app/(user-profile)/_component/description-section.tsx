import { Pencil } from 'lucide-react'
import React from 'react'
import BiographyEditForm from './forms/biography-edit-form'
import { cn } from '@/lib/utils'

type Props = {
    biography?: string
}

const DescriptionSection = ({ biography }: Props) => {
    return (
        <section className=" pt-[330px] px-2">
            <div className='flex items-center justify-start gap-2'>
                <h1 className="text-3xl font-bold">
                    Biography
                </h1>

                <BiographyEditForm />
            </div>

            <p className={cn(
                'mt-2',
                !biography && 'text-gray-500 italic'
            )}>
                {
                    biography ? biography : 'Write something about yourself'
                }
            </p>

        </section>
    )
}

export default DescriptionSection