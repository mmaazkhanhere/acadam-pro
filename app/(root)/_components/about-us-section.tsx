import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {}

const AboutUsSection = (props: Props) => {
    return (
        <section
            className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 mt-20 md:mt-32 lg:mt-40'
        >
            <div className='flex flex-col items-start justify-center gap-y-4 lg:gap-y-6'>

                {/*Span */}
                <span className='lg:text-lg uppercase font-extralight'>
                    About Us
                </span>

                {/*Heading */}
                <h2 className='text-4xl lg:text-5xl'>
                    Pioneering Learning Excellence
                </h2>

                {/*Description */}
                <p className='text-sm'>
                    Our vision is to revolutionize the education landscape by delivering top-notch learning solutions tailored to individual needs. We&apos;re committed to fostering a community where knowledge knows no bounds. Join us and embark on a journey of unparalleled growth and success.
                </p>

                {/*Buttons */}
                <div className='flex items-center gap-x-5'>
                    <Button
                        size='sm'
                    >
                        Our Courses
                    </Button>

                    <Button
                        variant='outline'
                        size='sm'
                    >
                        Read More
                    </Button>
                </div>
            </div>

            {/*Right Grid */}
            <div className='overflow-hidden relative'>
                {/*Image */}
                <Image
                    src='/landing-about-us.jpg'
                    alt='About Us Picture'
                    width={700}
                    height={700}
                    className='rounded-xl'
                />

                {/*Styling over image */}
                <div
                    className='absolute top-0 w-full h-full bg-gradient-to-t from-purple-200
                to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000'
                />
            </div>
        </section>
    )
}

export default AboutUsSection