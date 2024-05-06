import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type Props = {}

const FAQS = (props: Props) => {
    return (
        <section className='pt-[1300px] md:pt-[900px] flex flex-col items-center mb-10'>
            <h2 className='text-2xl md:text-3xl font-bold'>
                Frequently Asked Questions
            </h2>
            <div className='mt-10'>
                <Accordion type="single" collapsible className="w-[380px] md:w-[500px] lg:w-[550px] text-sm md:text-base px-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            How do I enroll in courses on AcadamPro?
                        </AccordionTrigger>
                        <AccordionContent>
                            To enroll in courses, simply sign up for an account on AcadamPro, browse through our course catalog, and select the courses that interest you. Click on the &quot;Dashboard&quot; button, and you&apos;re all set to start learning!
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            Can I access my courses on multiple devices?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, you can access your courses on any device with internet connectivity. Your progress will sync across devices for seamless learning.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            How do I track my progress in a course?
                        </AccordionTrigger>
                        <AccordionContent>
                            AcadamPro provides a user-friendly dashboard where you can track your course progress, view completed lectures, and access supplementary materials.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            How can I become an instructor on AcadamPro?
                        </AccordionTrigger>
                        <AccordionContent>
                            To become an instructor, simply apply through our instructor application process. Once approved, you can start creating and selling your courses on our platform.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-5">
                        <AccordionTrigger>
                            What kind of courses can I sell on AcadamPro?
                        </AccordionTrigger>
                        <AccordionContent>
                            We welcome a wide range of courses spanning various subjects and disciplines. Whether it&apos;s academic, professional, or hobby-based, there&apos;s a place for your expertise on AcadamPro.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-6">
                        <AccordionTrigger>
                            Are there any prerequisites for purchasing courses on AcadamPro?
                        </AccordionTrigger>
                        <AccordionContent>
                            No, there are no prerequisites for purchasing courses. Simply browse our catalog, select the courses you&apos;re interested in, and proceed to checkout.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-7">
                        <AccordionTrigger>
                            What payment methods are accepted on AcadamPro?
                        </AccordionTrigger>
                        <AccordionContent>
                            We accept a variety of payment methods, including Stripe, PayPal, and other secure payment options for your convenience.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-8">
                        <AccordionTrigger>
                            What does the monthly subscription on AcadamPro include?
                        </AccordionTrigger>
                        <AccordionContent>
                            The monthly subscription grants you access to a curated selection of courses provided by AcadamPro itself. You&apos;ll have unlimited access to these courses for the duration of your subscription.
                        </AccordionContent>
                    </AccordionItem>


                    <AccordionItem value="item-9">
                        <AccordionTrigger>
                            Can I cancel my monthly subscription anytime?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, you can cancel your monthly subscription at any time. Your access to the subscription-based courses will continue until the end of the current billing cycle.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </section>

    )
}

export default FAQS