import React from "react";

import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

import UserNameForm from "./forms/user-name-form";

import { isTeacher } from "@/helpers/userCheck";
import UserRole from "./forms/user-role";

type Props = {
	user: {
		name: string | null;
		userType: string | null;
		biography: string | null;
	};
};

const UserDetail = async ({ user }: Props) => {
	const { userId } = auth();

	const teacher = await isTeacher(userId!);

	return (
		<section className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between lg:items-center mt-16 lg:mt-32">
			<div className="flex flex-col lg:flex-row items-start justify-center gap-x-5">
				<UserAvatar userPage />
				<div className="flex flex-col items-start">
					<UserNameForm name={user.name as string} />

					<UserRole userType={user.userType as string} />
				</div>
			</div>

			{teacher && (
				<Button
					variant="outline"
					className="text-black mt-5 lg:mt-0 w-full md:w-32"
				>
					Create Courses
				</Button>
			)}
		</section>
	);
};

export default UserDetail;
