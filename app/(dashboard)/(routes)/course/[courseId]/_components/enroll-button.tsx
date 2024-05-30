"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Props = {
	course: Course & { chapters: Chapter[] };
};

const EnrollButton = ({ course }: Props) => {
	const { toast } = useToast();

	const onEnroll = async () => {
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
					toast({
						title: "Subscribe to enroll",
						variant: "destructive",
					});
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

	return (
		<Button size="sm" onClick={onEnroll}>
			Enroll
		</Button>
	);
};

export default EnrollButton;
