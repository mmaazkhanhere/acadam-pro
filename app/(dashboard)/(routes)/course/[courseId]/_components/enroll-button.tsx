"use client";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation"; // Updated
import { useToast } from "@/components/ui/use-toast";

type Props = {
	course: Course & { chapters: Chapter[] };
	userSubscriptionStatus?: boolean;
	userEnrollmentStatus: boolean;
};

const EnrollButton = ({
	course,
	userSubscriptionStatus,
	userEnrollmentStatus: initialEnrollmentStatus,
}: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const courseId = course.id;
	const price = course.price;

	const [isEnrolled, setIsEnrolled] = useState(initialEnrollmentStatus); // Track enrollment status

	useEffect(() => {
		setIsEnrolled(initialEnrollmentStatus);
	}, [initialEnrollmentStatus]);

	const onEnroll = async () => {
		try {
			let response;
			if (isEnrolled) {
				// Unenroll user
				response = await axios.patch(
					`/api/course/${course.id}/un-enroll`
				);
				if (response.status === 200) {
					setIsEnrolled(false);
					toast({
						title: "Successfully Unenrolled",
					});
				} else {
					throw new Error(
						`Failed to unenroll: ${response.statusText}`
					);
				}
			} else {
				// Enroll user
				if (course.isFree) {
					response = await axios.patch(
						`/api/course/${course.id}/enroll`
					);
					if (response.status === 200) {
						setIsEnrolled(true);
						toast({
							title: "Successfully Enrolled",
						});
						router.push(
							`/course/${course.id}/chapter/${course.chapters[0].id}`
						);
					} else {
						throw new Error(
							`Failed to enroll: ${response.statusText}`
						);
					}
				} else if (course.isPro) {
					if (userSubscriptionStatus) {
						await axios.patch(`/api/course/${course.id}/enroll`);
						setIsEnrolled(true);
						router.push(
							`/course/${course.id}/chapter/${course.chapters[0].id}`
						);
						toast({
							title: "Successfully Enrolled",
						});
					} else {
						response = await fetch("/api/stripe-subscription", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ courseId }),
						});
						if (!response.ok) {
							throw new Error(
								`Failed to start subscription: ${response.statusText}`
							);
						}
						const data = await response.json();
						window.location.href = data.url;
						toast({
							title: "Successfully Subscribed",
						});
					}
				} else {
					response = await fetch("/api/stripe-purchase", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ courseId, price }),
					});
					if (!response.ok) {
						throw new Error(
							`Failed to purchase: ${response.statusText}`
						);
					}
					const data = await response.json();
					window.location.href = data.url;
				}
			}
		} catch (error: any) {
			console.error("Enrollment error", error);
			toast({
				title: "Something went wrong",
				description: error.message,
				variant: "destructive",
			});
		}
	};

	return (
		<Button
			aria-label="Enroll/Unenroll button"
			size="sm"
			onClick={onEnroll}
		>
			{isEnrolled ? "Unenroll" : "Enroll"}
		</Button>
	);
};

export default EnrollButton;
