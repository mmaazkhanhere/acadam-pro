import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {}

const AboutUsSection = (props: Props) => {
    return (
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 lg:mt-40'>
            <div className='flex flex-col items-start justify-center gap-y-4 lg:gap-y-6'>
                <span className='text-lg uppercase font-extralight'>About Us</span>
                <h2 className='text-5xl'>
                    Pioneering Learning Excellence
                </h2>
                <p className='text-sm'>
                    Our vision is to revolutionize the education landscape by delivering top-notch learning solutions tailored to individual needs. We&apos;re committed to fostering a community where knowledge knows no bounds. Join us and embark on a journey of unparalleled growth and success.
                </p>
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
                        More About Us
                    </Button>
                </div>
            </div>
            <div className='overflow-hidden'>
                <Image
                    src='/landing-about-us.jpg'
                    alt='About Us Picture'
                    width={700}
                    height={700}
                    className='rounded-xl'
                />
            </div>
        </section>
    )
}

export default AboutUsSection