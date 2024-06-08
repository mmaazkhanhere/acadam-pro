"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Chapter, Course, Subscription } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation"; // Updated
import { useToast } from "@/components/ui/use-toast";

type Props = {
	course: Course & { chapters: Chapter[] };
	userSubscriptionStatus?: boolean;
};

const EnrollButton = ({ course, userSubscriptionStatus }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const courseId = course.id;
	const price = course.price;
	console.log(price);

	const onEnroll = async () => {
		try {
			if (course.isFree) {
				const response = await axios.patch(
					`/api/course/${course.id}/enroll`
				);
				if (response.status === 200) {
					toast({
						title: "Successfully Enrolled",
					});
					router.push(
						`/course/${course.id}/chapter/${course.chapters[0].id}`
					);
				} else {
					throw new Error("Failed to enroll");
				}
			} else if (course.isPro) {
				if (userSubscriptionStatus) {
					await axios.patch(`/api/course/${course.id}/enroll`);
					router.push(
						`/course/${course.id}/chapter/${course.chapters[0].id}`
					);
					toast({
						title: "Successfully Enrolled",
					});
				} else {
					const response = await fetch("/api/stripe-subscription", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ courseId }),
					});
					const data = await response.json();
					window.location.href = data.url;
					toast({
						title: "Successfully Subscribed",
					});
				}
			} else {
				const response = await fetch("/api/stripe-purchase", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ courseId, price }),
				});
				const data = await response.json();
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("Enrollment error", error);
			toast({
				title: "Something went wrong",
				variant: "destructive",
			});
		}
	};

	return (
		<Button aria-label="Enroll button" size="sm" onClick={onEnroll}>
			Enroll
		</Button>
	);
};

export default EnrollButton;
