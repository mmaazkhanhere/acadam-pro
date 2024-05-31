import { auth } from "@clerk/nextjs/server";

import UserDetail from "./user-detail";

import prismadb from "@/lib/prismadb";
import DescriptionSection from "./description-section";
import { redirect } from "next/navigation";

type Props = {};

const UserHero = async (props: Props) => {
	const { userId } = auth();

	const user = await prismadb.user.findUnique({
		where: {
			id: userId as string,
		},
		select: {
			name: true,
			biography: true,
			userType: true,
		},
	});

	if (!user) {
		redirect("/");
	}

	return (
		<>
			<section className="absolute w-full left-0 bg-purple-500 text-white h-[400px] lg:h-[250px] px-2">
				<UserDetail user={user} />
			</section>

			<DescriptionSection biography={user?.biography!} />
		</>
	);
};

export default UserHero;
