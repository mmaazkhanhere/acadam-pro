import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Globe, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const data = [
    {
        imageUrl: '/students.jpg',
        date: 'April 30, 2024',
        author: 'John Adam',
        title: 'Announcing the winners of 2023 fiction challenge',
    },
    {
        imageUrl: '/exam.jpg',
        date: 'May 4, 2024',
        author: 'Maaz Khan',
        title: 'CKAD Exam: Study guide on how to become Kubernetes certified',
    },
]

const BlogSection = (props: Props) => {
    return (
        <section className='absolute left-0 w-full mt-40'>
            <div
                className='bg-gradient-to-tr 
                from-purple-300 via-purple-500 to-purple-700 text-white 
                px-4 w-full py-10'
            >
                <div
                    className='max-w-[1400px] mx-auto flex flex-col 
                    items-center justify-center'
                >
                    <div
                        className='flex items-center justify-center text-white font-medium
                    text-xl gap-x-2 '
                    >
                        <Globe />
                        <span>News & Articles</span>
                    </div>
                    <h1 className='text-2xl md:text-3xl font-bold'>
                        Read Our Latest News
                    </h1>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-10'>
                        {
                            data.map((item) => (
                                <article
                                    key={item.title}
                                    className='flex flex-col items-start p-5 gap-y-4
                                border border-white rounded-xl'
                                >
                                    <div className='relative w-full h-60 hover:scale-105
                                    transition duration-700 overflow-hidden'>
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>


                                    <div className='flex flex-col items-start gap-y-2'>
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='flex  gap-x-2 '>
                                                <Calendar className='w-6 h-6' />
                                                <p className='text-sm'>{item.date}</p>
                                            </div>

                                            <div className='flex  gap-x-2'>
                                                <User className='w-6 h-6' />
                                                <p className='text-sm'>{item.author}</p>
                                            </div>
                                        </div>


                                        <h3 className='lg:text-lg font-bold'>
                                            {item.title}
                                        </h3>
                                    </div>

                                    <Button
                                        className='flex items-center justify-center gap-2
                                        text-black dark:text-white dark:hover:bg-slate-500
                                        transition duration-300'
                                        variant='outline'
                                    >
                                        Read More
                                        <ArrowRight />
                                    </Button>
                                </article>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogSection