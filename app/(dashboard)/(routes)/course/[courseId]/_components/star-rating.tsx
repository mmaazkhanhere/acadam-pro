import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type StarRatingProps = {
	rating: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	const maxRating = 5;

	return (
		<div className="flex">
			{[...Array(maxRating)].map((_, index) => (
				<Star
					key={index}
					className={cn(
						"h-4 md:h-5 w-4 md:w-5",
						index < rating
							? "text-yellow-400 fill-yellow-400"
							: "fill-gray-300 text-gray-300"
					)}
				/>
			))}
		</div>
	);
};

export default StarRating;
