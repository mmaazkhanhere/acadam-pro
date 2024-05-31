import React from "react";

import Hero from "../_components/hero";
import FeatureGrid from "../_components/feature-grid";
import AboutUsSection from "../_components/about-us-section";
import JoinTeacher from "../_components/join-teacher";
import BlogSection from "../_components/blog-section";
import FAQS from "../_components/faqs";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

type Props = {};

const Homepage = async (props: Props) => {
	const { userId } = auth();

	let user;

	if (userId) {
		user = await prismadb.user.findUnique({
			where: {
				id: userId as string,
			},
			select: {
				userType: true,
			},
		});
	}

	return (
		<div>
			<Hero userType={user?.userType} userId={userId as string} />
			<FeatureGrid />
			<AboutUsSection userType={user?.userType} />
			<JoinTeacher userType={user?.userType} />
			<BlogSection />
			<FAQS />
		</div>
	);
};

export default Homepage;
