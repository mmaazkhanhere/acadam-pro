"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";

import { Course } from "@prisma/client";
import { formatPrice } from "@/helpers/format";

import { ArrowRight } from "lucide-react";

type Props = {
	course: Course;
	admin: boolean;
};

const CourseCard = ({ course, admin }: Props) => {
	const router = useRouter();
	const onClick = () => {
		router.push(`/teacher/courses/${course.id}`);
	};

	return (
		<article className="p-4 bg-purple-100/50 dark:bg-muted rounded-xl mt-4 space-y-5">
			<div className="overflow-hidden relative">
				<Image
					src={course.imageUrl!}
					alt={course.title}
					width={550}
					height={550}
					className="object-cover rounded-xl"
				/>
				{!course.isFree && (
					<div className="absolute top-1 right-2 lg:right-4">
						<Badge>{formatPrice(course.price as number)}</Badge>
					</div>
				)}
			</div>

			<div
				className="flex flex-col items-start justify-between 
                h-full w-full"
			>
				<div className="flex flex-col w-full">
					<div className="flex items-center justify-between w-full">
						<h2 className="text-xl lg:text-2xl font-bold">
							{course.title}
						</h2>
						<div className="flex items-center gap-x-1">
							{course.isFree ? (
								<Badge>Free</Badge>
							) : admin ? (
								<Badge>Pro</Badge>
							) : (
								<Badge>Paid</Badge>
							)}

							{!course.isPublished && (
								<Badge variant="destructive">Publish</Badge>
							)}
						</div>
					</div>
					<p className="text-sm text-gray-600 mt-2">
						{course.description}
					</p>
				</div>

				<div
					className="flex items-center justify-between w-full self-end
                    mt-4"
				>
					<p className="bg-white dark:bg-muted-foreground border border-gray-300 px-6 py-1 rounded-xl text-sm">
						{course.categoryLabel}
					</p>

					<button
						onClick={onClick}
						className="px-2 py-0.5 bg-purple-500 text-white rounded-lg
                        hover:bg-purple-500/80 transition duration-500"
					>
						<ArrowRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</article>
	);
};

export default CourseCard;
