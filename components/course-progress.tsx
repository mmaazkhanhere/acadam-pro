import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

type Props = {
	value: number;
	variant?: "default" | "success";
	size?: "default" | "sm";
};

const colorByVariant = {
	default: "text-purple-400",
	success: "text-purple-500",
};

const sizeByVariant = {
	default: "text-sm",
	sm: "text-xs",
};

const CourseProgress = ({ value, variant, size }: Props) => {
	return (
		<div className="w-full">
			<Progress className="h-2 w-full" value={value} variant={variant} />

			<p
				className={cn(
					"font-medium mt-2 text-purple-600",
					colorByVariant[variant || "default"],
					sizeByVariant[size || "default"]
				)}
			>
				{Math.round(value)}% complete
			</p>
		</div>
	);
};

export default CourseProgress;
