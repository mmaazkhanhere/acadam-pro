import { LucideIcon } from "lucide-react";
import CircularProgress from "./circular-progress";

type Props = {
	title: string;
	value: number;
	icon: LucideIcon;
	totalCourses?: number;
	completedCourses?: number;
};

const OverviewCard = ({
	title,
	value,
	icon: Icon,
	totalCourses,
	completedCourses,
}: Props) => {
	return (
		<article
			className="shadow-md p-4 rounded-xl flex items-center justify-between gap-x-4
        dark:bg-muted/60"
		>
			<div className="flex flex-col gap-y-2">
				<Icon className="w-8 md:w-10 h-8 md:h-10 p-1 text-purple-500 fill-white bg-purple-500 rounded-full" />

				<div className="flex flex-col items-start gap-1">
					<span className="text-2xl md:text-3xl font-bold">
						{value}
					</span>
					<p className="text-sm text-gray-400 font-light">{title}</p>
				</div>
			</div>
			{totalCourses && (
				<CircularProgress
					totalCourses={totalCourses}
					coursesCompleted={completedCourses as number}
				/>
			)}
		</article>
	);
};

export default OverviewCard;
