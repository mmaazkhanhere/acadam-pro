"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
	userType?: string;
	userId?: string;
};

const Hero = ({ userType, userId }: Props) => {
	const router = useRouter();
	const { toast } = useToast();

	const onClick = () => {
		if (!userId) {
			router.push("/");
			toast({
				title: "Please login to continue",
				variant: "destructive",
			});
		} else {
			if (userType?.toLowerCase() === "student") {
				router.push("/student/dashboard");
			} else {
				router.push("/teacher/dashboard");
			}
		}
	};

	return (
		<section className="absolute left-0 w-full">
			<div className="bg-purple-500 text-white px-4">
				<div
					className="max-w-[1400px] mx-auto mt-10 grid grid-cols-1
                lg:grid-cols-2 gap-5 h-[850px] md:h-[1000px] lg:h-[630px] items-center justify-between "
				>
					<div
						className="flex flex-col items-center lg:items-start 
                        justify-between space-y-5 lg:space-y-8 order-2 lg:order-1"
					>
						<p className="uppercase md:text-lg lg:text-xl font-thin">
							Journey To Excellence starts here
						</p>

						<h1
							className="text-4xl md:text-6xl lg:text-7xl font-bold text-center
                        lg:text-left"
						>
							Empower Your Learning Journey
						</h1>

						<p
							className="lg:text-lg font-extralight text-center
                        lg:text-left"
						>
							Unlock Your Potential and Thrive with Our Innovative
							Learning Platform!
						</p>

						<Button
							onClick={onClick}
							aria-label="Courses Button"
							variant="secondary"
							size="sm"
						>
							View All Courses
						</Button>
					</div>
					<div className=" self-end md:ml-28 order-1 lg:order-2">
						<Image
							width={540}
							height={540}
							src="/05.png"
							alt="Student"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
