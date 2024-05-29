"use client";

import { Badge } from "@/components/ui/badge";
import { Course, Review, User } from "@prisma/client";
import Image from "next/image";
import RatingOverview from "../../../teacher/dashboard/_components/rating-overview";
import { useUser } from "@clerk/nextjs";
import { BookIcon } from "lucide-react";
import CourseProgress from "@/components/course-progress";
import RatingButton from "./rating-button";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {
	course: Course & {
		chapters: { id: string }[];
		reviews: Review[];
		teacher: User;
		progress: number;
	};
};

const EnrolledCourseCard = ({ course }: Props) => {
	const { user } = useUser();

	const totalRatings = course.reviews?.reduce(
		(acc, review) => acc + review.rating,
		0
	);
	const averageRating =
		course.reviews.length > 0 ? totalRatings / course.reviews.length : 0;

	return (
		<Link
			href={`/course/${course.id}/chapter/${course.chapters[0].id}`}
			className="p-4 shadow-md rounded-2xl flex flex-col items-start h-full gap-3 w-full"
		>
			<div className="relative aspect-video rounded-xl w-full overflow-hidden">
				<Image
					fill
					className="object-cover"
					src={course.imageUrl as string}
					alt={`${course.title} Image`}
				/>
			</div>

			<div className="flex items-center justify-between w-full mt-2">
				<div className="flex items-center gap-x-2">
					<h2 className="text-xl font-bold">{course.title}</h2>
					{course.isFree ? (
						<Badge className="bg-green-500 hover:bg-green-400">
							Free
						</Badge>
					) : course.isPro ? (
						<Badge>Pro</Badge>
					) : (
						<Badge>Paid</Badge>
					)}
				</div>

				<p className="text-sm text-purple-300">{course.teacher.name}</p>
			</div>

			<p className="text-sm">{course.description}</p>

			<div className="flex items-center justify-between w-full mt-2">
				<RatingOverview
					averageRatings={averageRating}
					totalRatings={totalRatings}
				/>
				{!course.reviews.find(
					(review) => review.authorId === user?.id
				) && <RatingButton courseId={course.id} />}
			</div>

			<div className="flex items-center gap-x-2">
				<BookIcon className="w-5 h-5 text-purple-500" />
				<p className="text-sm">{course.chapters.length} Chapters</p>
			</div>

			<div className="w-full mt-2">
				<CourseProgress value={course.progress} />
			</div>
		</Link>
	);
};

export default EnrolledCourseCard;
