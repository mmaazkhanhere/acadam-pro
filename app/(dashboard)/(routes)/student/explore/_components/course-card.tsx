
import Image from "next/image"
import { auth } from "@clerk/nextjs/server"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import RatingOverview from "../../../teacher/dashboard/_components/rating-overview"

import { Course, Review, User } from "@prisma/client"

import { BookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"






type Props = {
    course: Course & { reviews: Review[], teacher: User, chapters: [], studentsEnrolled: User[] }
}

const CourseCard = ({ course }: Props) => {

    const { userId } = auth();

    const totalRatings = course.reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = course.reviews.length > 0 ? totalRatings / course.reviews.length : 0;

    return (
        <article
            className="p-4 shadow-md rounded-2xl flex flex-col items-start h-full gap-3 w-full"
        >
            <div
                className="relative aspect-video rounded-xl w-full overflow-hidden"
            >
                <Image
                    fill
                    className="object-cover"
                    src={course.imageUrl as string}
                    alt={`${course.title} Image`}
                />
            </div>

            <div className="flex flex-col items-start w-full">
                <div className="flex items-center justify-between w-full">
                    <p className="text-lg font-bold">
                        {course.title}
                    </p>

                    <div className="flex items-center gap-x-2">
                        <p
                            className="py-0.5 px-4 text-center rounded-full text-xs border border-purple-200
                        hover:border-purple-500"
                        >
                            {course.categoryLabel}
                        </p>
                        {
                            course.isFree ? <Badge className="bg-green-500 hover:bg-green-300">Free</Badge> : (
                                course.isPro ? <Badge>Pro</Badge> : <Badge>Paid</Badge>
                            )
                        }
                    </div>
                </div>

                <p className="text-xs text-gray-400">
                    By <span className="text-purple-500">{course.teacher.name}</span>
                </p>
            </div>

            <div>
                <RatingOverview
                    totalRatings={totalRatings}
                    averageRatings={averageRating}
                />
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-2">
                    <BookIcon className="w-5 h-5 text-purple-500" />
                    <p className="text-sm">
                        {course.chapters.length} Chapters
                    </p>
                </div>

                {
                    !course.studentsEnrolled.find(user => user.id === userId) && (
                        <Button
                            size='sm'
                            className="text-xs h-6 w-16"
                        >
                            Enroll
                        </Button>
                    )
                }
            </div>

        </article>
    )
}

export default CourseCard