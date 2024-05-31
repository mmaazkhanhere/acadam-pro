"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";

type Props = {
	label: string;
	id: string;
	isCompleted: boolean;
	courseId: string;
	isLocked: boolean;
};

const CourseSidebarItem = ({
	label,
	id,
	isCompleted,
	courseId,
	isLocked,
}: Props) => {
	const pathname = usePathname();
	const router = useRouter();

	const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

	const isActive = pathname.includes(id);

	const onClick = () => {
		// if (!isLocked) {
		router.push(`/course/${courseId}/chapter/${id}`);
		// }
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex items-center gap-x-2 pl-6 transition-all duration-300 py-4 text-sm font-medium mt-2 rounded-xl dark:bg-muted dark:hover:bg-muted/70",
				isActive &&
					"bg-purple-500 text-white hover:bg-purple-400 hover:text-white/80",
				isCompleted &&
					"bg-green-500 hover:bg-green-400 text-white hover:text-white/80",
				isCompleted && isActive && "bg-green-700 hover:bg-green-500"
			)}
		>
			<Icon className="w-5 h-5" />
			{label}
		</button>
	);
};

export default CourseSidebarItem;
