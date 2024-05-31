"use client";

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
	userType?: string;
};

const JoinTeacher = ({ userType }: Props) => {
	const { userId } = useAuth();
	const router = useRouter();
	const { toast } = useToast();

	const onClick = () => {
		if (userId) {
			if (userType?.toLowerCase() === "teacher") {
				router.push("/teacher/dashboard");
			} else router.push(`/user/${userId}`);
		} else {
			toast({
				title: "Please Login First",
				variant: "destructive",
			});
		}
	};

	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 lg:mt-40">
			{/*Left Grid */}
			<div className="overflow-hidden relative order-2 lg:order-1">
				{/*Image */}
				<Image
					src="/join-teacher.jpg"
					alt="Teacher Picture"
					width={700}
					height={700}
					className="rounded-xl"
				/>
				<div
					className="absolute top-0 w-full h-full bg-gradient-to-t from-purple-200
                to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"
				/>
			</div>

			{/*Right Grid */}
			<div
				className="flex flex-col items-start lg:items-end justify-center 
                gap-y-4 lg:gap-y-6 lg:text-right order-1 lg:order-2"
			>
				{/*Span */}
				<span className="lg:text-lg uppercase font-extralight">
					Join As Teacher
				</span>

				{/*Heading */}
				<h2 className="text-4xl lg:text-5xl">
					Shape Minds, Inspire Futures
				</h2>

				{/*Description */}
				<p className="text-sm">
					Join our team of dedicated educators who are passionate
					about making a difference. As a teacher with us, you&apos;ll
					have the opportunity to ignite curiosity, foster creativity,
					and empower learners to excel. Let&apos;s collaborate to
					create a brighter tomorrow through education.
				</p>

				{/*Join Now Button */}
				<div className="flex items-center gap-x-5">
					<Button
						aria-label="Join Button"
						size="sm"
						onClick={onClick}
					>
						Join Now
					</Button>
				</div>
			</div>
		</section>
	);
};

export default JoinTeacher;
