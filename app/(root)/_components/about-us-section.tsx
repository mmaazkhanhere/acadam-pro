"use client";

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
	userType?: string;
};

const AboutUsSection = ({ userType }: Props) => {
	const { userId } = useAuth();
	const router = useRouter();
	const { toast } = useToast();

	const onClick = () => {
		if (userId) {
			if (userType?.toLowerCase() === "student") {
				router.push("/student/explore");
			} else {
				router.push("/teacher/dashboard");
			}
		} else {
			toast({
				title: "Please login first",
				variant: "destructive",
			});
			router.push("/");
		}
	};

	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 mt-10 md:mt-16 lg:mt-20">
			<div className="flex flex-col items-start justify-center gap-y-4 lg:gap-y-6">
				{/*Span */}
				<span className="lg:text-lg uppercase font-extralight">
					About Us
				</span>

				{/*Heading */}
				<h2 className="text-4xl lg:text-5xl">
					Pioneering Learning Excellence
				</h2>

				{/*Description */}
				<p className="text-sm">
					Our vision is to revolutionize the education landscape by
					delivering top-notch learning solutions tailored to
					individual needs. We&apos;re committed to fostering a
					community where knowledge knows no bounds. Join us and
					embark on a journey of unparalleled growth and success.
				</p>

				{/*Buttons */}
				<div className="flex items-center gap-x-5">
					<Button
						aria-label="Course button"
						size="sm"
						onClick={onClick}
					>
						Our Courses
					</Button>

					<Button
						aria-label="Courses button"
						variant="outline"
						className="dark:bg-muted dark:hover:bg-muted/70"
						size="sm"
					>
						Read More
					</Button>
				</div>
			</div>

			{/*Right Grid */}
			<div className="overflow-hidden relative">
				{/*Image */}
				<Image
					src="/landing-about-us.jpg"
					alt="About Us Picture"
					width={700}
					height={700}
					className="rounded-xl"
				/>

				{/*Styling over image */}
				<div
					className="absolute top-0 w-full h-full bg-gradient-to-t from-purple-200
                to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"
				/>
			</div>
		</section>
	);
};

export default AboutUsSection;
