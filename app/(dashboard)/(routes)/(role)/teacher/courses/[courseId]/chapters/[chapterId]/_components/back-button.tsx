"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

type Props = {
	courseId: string;
};

const BackButton = ({ courseId }: Props) => {
	const router = useRouter();

	const onClick = () => router.push(`/teacher/courses/${courseId}`);

	return (
		<Button
			variant="outline"
			onClick={onClick}
			className="flex items-center gap-x-2 dark:bg-muted text-xs md:text-sm"
		>
			<ArrowLeft className="w-5 md:w-6 h-5 md:h-6" />
			Course Setup
		</Button>
	);
};

export default BackButton;
