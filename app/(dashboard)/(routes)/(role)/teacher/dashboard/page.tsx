import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import WelcomeBanner from "./_components/welcome-banner";

import { isAdmin, isTeacher } from "@/helpers/userCheck";
import prismadb from "@/lib/prismadb";
import Metrics from "./_components/metrics";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import CoursesList from "./_components/courses-list";

type Props = {};

const Dashboard = async (props: Props) => {
	const { userId } = auth();
	const admin = isAdmin(userId as string);
	const teacher = await isTeacher(userId!);

	const user = await prismadb.user.findUnique({
		where: {
			id: userId as string,
		},
		include: {
			coursesTeaching: {
				include: {
					studentsEnrolled: true,
					purchases: true, // Include purchases related to the courses the user is teaching
				},
			},
			purchases: true, // Purchases made by the user (for non-admin)
			subscriptions: true, // Subscriptions (for admin)
		},
	});

	if (!admin || (!teacher && !user) || user?.userType === "Student") {
		redirect("/");
	}

	return (
		<div>
			<WelcomeBanner name={user?.name as string} />

			<Metrics user={user!} />

			<CoursesList />
		</div>
	);
};

export default Dashboard;
