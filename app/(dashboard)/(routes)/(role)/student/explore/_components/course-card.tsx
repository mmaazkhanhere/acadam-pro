"use client";

import Image from "next/image";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import CourseProgress from "@/components/course-progress";

import RatingOverview from "../../../teacher/dashboard/_components/rating-overview";

import { Course, Review, User, Category } from "@prisma/client";

import { BookIcon } from "lucide-react";

type Props = {
	course: Course & {
		category: Category | null;
		chapters: { id: string }[];
		reviews: Review[] | null;
		teacher: User;
		progress: number | null;
		studentEnrolled: User[];
	};
};

const CourseCard = ({ course }: Props) => {
	const { userId } = useAuth();
	const router = useRouter();
	const { toast } = useToast();

	if (!userId) {
		router.push("/");
	}

	const totalRatings = course.reviews!.reduce(
		(acc, review) => acc + review.rating,
		0
	);
	const averageRating =
		course.reviews!.length > 0 ? totalRatings / course.reviews!.length : 0;

	const onEnroll = async () => {
		const courseId = course.id;
		const price = course.price;
		try {
			if (course.isFree) {
				await axios.patch(`/api/course/${course.id}/enroll`);
				toast({
					title: "Successful Enrolled",
				});
				redirect(
					`/course/${course.id}/chapter/${course.chapters[0].id}`
				);
			} else {
				if (course.isPro) {
					const response = await axios.post(
						"/api/stripe-subscription",
						{
							courseId,
						}
					);

					const data = await response.data();
					redirect(data.url);
				} else {
					toast({
						title: "Buy the course",
						variant: "destructive",
					});
				}
			}
		} catch (error) {
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	const onClick = () => {
		const isEnrolled = course.studentEnrolled.some(
			(enrolledUser) => enrolledUser.id === userId
		);

		if (isEnrolled) {
			router.push(
				`/course/${course.id}/chapter/${course.chapters[0].id}`
			);
		} else {
			router.push(`/course/${course.id}`);
		}
	};

	return (
		<article
			onClick={onClick}
			className="p-4 shadow-md rounded-2xl flex flex-col items-start h-full gap-3 w-full cursor-pointer
			dark:bg-muted bg-purple-100/50"
		>
			<div className="relative aspect-video rounded-xl w-full overflow-hidden">
				<Image
					fill
					className="object-cover"
					src={course.imageUrl as string}
					alt={`${course.title} Image`}
				/>
			</div>

			<div className="flex flex-col items-start w-full">
				<div className="flex items-center justify-between w-full">
					<p className="text-lg font-bold">{course.title}</p>

					<div className="flex items-center gap-x-2">
						<p
							className="py-0.5 px-4 text-center rounded-full text-xs border border-purple-200
                        hover:border-purple-500"
						>
							{course.categoryLabel}
						</p>
						{course.isFree ? (
							<Badge className="bg-green-500 hover:bg-green-300">
								Free
							</Badge>
						) : course.isPro ? (
							<Badge>Pro</Badge>
						) : (
							<Badge>Paid</Badge>
						)}
					</div>
				</div>

				<p className="text-xs text-gray-400">
					By{" "}
					<span className="text-purple-500">
						{course.teacher.name}
					</span>
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
					<p className="text-sm">{course.chapters.length} Chapters</p>
				</div>

				{!course.studentEnrolled.find(
					(user) => user.id === user.id
				) && (
					<Button
						aria-label="Course enroll button"
						size="sm"
						className="text-xs h-6 w-16"
						onClick={onEnroll}
					>
						Enroll
					</Button>
				)}
			</div>

			{course.studentEnrolled.find((user) => user.id) &&
				course.progress !== null && (
					<CourseProgress
						value={course.progress}
						variant={
							course.progress === 100 ? "success" : "default"
						}
						size="sm"
					/>
				)}
		</article>
	);
};

export default CourseCard;
