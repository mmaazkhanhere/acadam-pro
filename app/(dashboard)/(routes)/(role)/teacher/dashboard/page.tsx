import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import WelcomeBanner from "./_components/welcome-banner";
import { isAdmin, isTeacher } from "@/helpers/userCheck";
import prismadb from "@/lib/prismadb";
import Metrics from "./_components/metrics";
import CoursesList from "./_components/courses-list";

const Dashboard = async () => {
	const { userId } = auth();

	if (!userId) {
		redirect("/");
		return;
	}

	const admin = await isAdmin(userId as string); // Ensure this returns a promise if it's async
	const teacher = await isTeacher(userId!);

	// Fetch user data
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
		},
	});

	const subscriptions = await prismadb.subscription.findMany();

	// Redirect if the user is not an admin or teacher, or if the user is a student
	if ((!admin && !teacher) || user?.userType === "Student") {
		redirect("/");
		return;
	}

	console.log(subscriptions);

	return (
		<div>
			<WelcomeBanner name={user?.name as string} />
			<Metrics user={user!} subscriptions={subscriptions} />
			<CoursesList />
		</div>
	);
};

export default Dashboard;
