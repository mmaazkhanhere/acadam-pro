import { formatPrice } from "@/helpers/format";
import { Course, Purchase, Subscription, User } from "@prisma/client";
import { CircleDollarSign, LibraryBig, Users } from "lucide-react";

type Props = {
	user: User & {
		coursesTeaching: (Course & {
			studentsEnrolled: User[];
			purchases: Purchase[];
		})[];
	};
	subscriptions: Subscription[];
};

const Metrics = ({ user, subscriptions }: Props) => {
	let totalAmountEarned = 0;

	if (user.username === "acadampro") {
		totalAmountEarned = subscriptions.reduce(
			(acc, sub) => acc + sub.amount,
			0
		);
	} else {
		totalAmountEarned = user.coursesTeaching.reduce((acc, course) => {
			return (
				acc +
				course.purchases.reduce(
					(purchaseAcc, purchase) =>
						purchaseAcc + (purchase.amount || 0),
					0
				)
			);
		}, 0);
	}

	const uniqueStudentIds = new Set<string>();
	user.coursesTeaching.forEach((course) => {
		course.studentsEnrolled.forEach((student) => {
			uniqueStudentIds.add(student.id);
		});
	});
	const totalUniqueStudents = uniqueStudentIds.size;

	return (
		<section className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 p-4 ">
			{/*Price */}
			<div className="flex flex-col items-center shadow-lg p-4 rounded-xl dark:bg-muted">
				<div className="flex items-center gap-x-2">
					<CircleDollarSign className="w-6 h-6" />
					<h2 className="text-lg lg:text-xl font-bold">
						Current Month
					</h2>
				</div>

				<p className="text-2xl md:text-3xl pt-2">
					{formatPrice(totalAmountEarned)}
				</p>
			</div>

			{/*Total Students */}
			<div className="flex flex-col items-center shadow-lg p-4 bor rounded-xl dark:bg-muted">
				<div className="flex items-center gap-x-2">
					<Users className="w-6 h-6" />
					<h2 className="text-lg lg:text-xl font-bold">
						Total Students
					</h2>
				</div>

				<p className="text-2xl md:text-3xl pt-2">
					{totalUniqueStudents}
					<span className="text-lg lg:text-xl ml-1">Students</span>
				</p>
			</div>

			{/*Total Courses */}
			<div className="flex flex-col items-center shadow-lg p-4 bor rounded-xl dark:bg-muted">
				<div className="flex items-center gap-x-2">
					<LibraryBig className="w-6 h-6" />
					<h2 className="text-lg lg:text-xl font-bold">
						Total Courses
					</h2>
				</div>

				<p className="text-2xl md:text-3xl pt-2">
					{user.coursesTeaching.length}{" "}
					<span className="text-lg lg:text-xl ml-1">Courses</span>
				</p>
			</div>
		</section>
	);
};

export default Metrics;
