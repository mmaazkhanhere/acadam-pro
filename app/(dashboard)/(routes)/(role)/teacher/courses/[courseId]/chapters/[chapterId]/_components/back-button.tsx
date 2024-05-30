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
			className="flex items-center gap-x-2 dark:bg-muted "
		>
			<ArrowLeft className="w-6 h-6" />
			Course Setup
		</Button>
	);
};

export default BackButton;
