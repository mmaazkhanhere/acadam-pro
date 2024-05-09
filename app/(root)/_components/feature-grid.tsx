
import { cn } from '@/lib/utils'

import { CircleDollarSign, Clock7, Gauge, Users } from 'lucide-react'

type Props = {}

const features = [
    {
        title: 'Latest Courses',
        description: 'Courses are always upto-dated, providing user to latest content material and courses',
        headingColor: 'text-purple-700',
        bgColor: 'bg-purple-100',
        icon: Users
    },
    {
        title: '24/7 Support',
        description: "With '24/7 Support Available', help is always accessible",
        headingColor: 'text-black',
        bgColor: 'bg-white',
        icon: Clock7
    },
    {
        title: 'Learn At Your Own Pace',
        description: 'You can learn at your own pace revisiting the course anytime you want',
        headingColor: 'text-purple-700',
        bgColor: 'bg-purple-100',
        icon: Gauge
    },
    {
        title: 'Subscribe or Buy',
        description: 'Provide user with option for a monthly subscription or just buying only one course',
        headingColor: 'text-black',
        bgColor: 'bg-white',
        icon: CircleDollarSign
    },
]

const FeatureGrid = (props: Props) => {
    return (
        <section
            className='grid grid-cols-2 w-full items-start lg:grid-cols-4 gap-5 
        pt-[930px] md:pt-[1100px] lg:pt-[700px]'
        >
            {
                features.map((feature => (
                    <div
                        key={feature.title}
                        className={cn(
                            `flex flex-col items-start justify-between p-4 gap-y-2 rounded-xl text-gray-600`,
                            feature.bgColor === 'bg-white' && 'border border-black ',
                            feature.bgColor
                        )}
                    >
                        <div
                            className={`${feature.headingColor} flex items-center gap-x-4 `}
                        >
                            <feature.icon />
                            <h3 className='font-bold text-sm lg:text-base'>
                                {feature.title}
                            </h3>
                        </div>
                        <p className='text-xs'>{feature.description}</p>
                        <span className='underline text-xs font-bold cursor-pointer hover:text-black'>
                            Read More
                        </span>
                    </div>
                )))
            }
        </section>
    )
}

export default FeatureGrid