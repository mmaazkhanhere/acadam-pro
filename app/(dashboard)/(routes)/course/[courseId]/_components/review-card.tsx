import { Review, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import StarRating from "./star-rating";
import { format } from "date-fns";

type Props = {
	review: Review & { author: User };
};

const ReviewCard = ({ review }: Props) => {
	const calculatedTime = format(review.createdAt, "dd/MM/yyyy");

	return (
		<article
			className="flex flex-col items-start gap-y-2 w-full max-w-xl p-4 bg-purple-100/50 
		rounded-2xl mt-4"
		>
			<div className="flex itmes-center justify-start gap-x-4 w-full">
				<div className="rounded-full overflow-hidden">
					<Image
						src={review.author.imageUrl as string}
						alt={review.author.name as string}
						width={70}
						height={70}
						className="object-cover rounded-full"
					/>
				</div>
				<div className="flex flex-col items-start gap-y-1">
					<div className="space-x-4 flex items-center">
						<h3 className="md:text-lg font-bold">
							{review.author.name}
						</h3>
						<p className="text-gray-500 text-xs md:text-sm">
							On {calculatedTime}
						</p>
					</div>
					<StarRating rating={review.rating} />
				</div>
			</div>
			<p className="mt-2 text-sm text-gray-500">{review.description}</p>
		</article>
	);
};

export default ReviewCard;
