import React from "react";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import prismadb from "@/lib/prismadb";

import { ArrowLeft } from "lucide-react";
import EnrollButton from "./_components/enroll-button";
import ReviewCard from "./_components/review-card";
import { Review, User } from "@prisma/client";

type Props = {
	params: {
		courseId: string;
	};
};

const CoursePage = async ({ params }: Props) => {
	const course = await prismadb.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			chapters: true,
			reviews: {
				include: {
					author: true,
				},
			},
		},
	});

	if (!course) {
		redirect("/");
	}

	return (
		<section className="p-4 md:p-8 w-full">
			<Button
				variant="outline"
				className="dark:bg-muted dark:hover:bg-muted/70"
				size="sm"
			>
				<Link
					href={`/student/explore`}
					className="flex items-center gap-x-2"
				>
					<ArrowLeft className="w-5 h-5" />
					<p className="hidden md:block">Explore</p>
				</Link>
			</Button>

			<div className="flex flex-col items-start mt-5 gap-y-2 max-w-7xl w-full">
				<div className="flex items-center justify-between w-full">
					<h2 className="text-xl md:text-2xl font-bold">
						{course.title}
					</h2>
					<EnrollButton course={course} />
				</div>

				<Separator />

				<p className="my-2 text-sm md:text-base">
					{course.description}
				</p>

				<Separator />

				<div className="flex flex-col items-start gap-y-2 mt-5 md:mt-10 w-full">
					<h2 className="text-xl md:text-2xl font-bold">Reviews</h2>
					{course.reviews.length == 0 ? (
						<p className="text-sm text-gray-500 dark:text-muted-foreground">
							No reviews yet
						</p>
					) : (
						course.reviews.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))
					)}
				</div>
			</div>
		</section>
	);
};

export default CoursePage;
