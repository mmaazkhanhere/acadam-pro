import React from "react";
import Navbar from "./_component/navbar";

import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

type Props = {
	children: React.ReactNode;
};

const UserLayout = async ({ children }: Props) => {
	const { userId } = auth();

	const user = await prismadb.user.findUnique({
		where: {
			id: userId as string,
		},
		select: {
			userType: true,
		},
	});

	if (!user || !user) {
		redirect("/");
	}

	return (
		<main className="max-w-[1400px] mx-auto">
			<Navbar userType={user.userType} />
			{children}
		</main>
	);
};

export default UserLayout;
