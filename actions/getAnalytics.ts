import { isAdmin } from "@/helpers/userCheck";
import prismadb from "@/lib/prismadb";
import { Course, Purchase, Subscription, UserType } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
	course: Course;
};

type SubscriptionWithUser = Subscription & {
	user: { id: string; emailAddress: string };
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
	const grouped: { [courseTitle: string]: number } = {};

	purchases.forEach((purchase) => {
		const courseTitle = purchase.course.title;
		if (!grouped[courseTitle]) {
			grouped[courseTitle] = 0;
		}

		grouped[courseTitle] += purchase.amount;
	});

	return grouped;
};

const groupByUser = (subscriptions: SubscriptionWithUser[]) => {
	const grouped: { [userEmail: string]: number } = {};

	subscriptions.forEach((subscription) => {
		const userEmail = subscription.user.emailAddress;
		if (!grouped[userEmail]) {
			grouped[userEmail] = 0;
		}

		grouped[userEmail] += subscription.amount;
	});

	return grouped;
};

export const getAnalytics = async (userId: string) => {
	try {
		const user = await prismadb.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new Error("User not found");
		}

		const admin = await isAdmin(user.id);

		if (admin) {
			// If the user is an admin, query over the Subscription model
			const subscriptions = await prismadb.subscription.findMany({
				include: {
					user: true,
				},
			});

			const groupedEarnings = groupByUser(subscriptions);

			const data = Object.entries(groupedEarnings).map(
				([userEmail, total]) => ({
					name: userEmail,
					total: total,
				})
			);

			return {
				data,
			};
		} else if (user.userType === UserType.Teacher) {
			// If the user is a teacher, query over the Purchase model
			const purchases = await prismadb.purchase.findMany({
				where: {
					course: {
						teacherId: userId,
					},
				},
				include: {
					course: true,
				},
			});

			const groupedEarnings = groupByCourse(purchases);

			const data = Object.entries(groupedEarnings).map(
				([courseTitle, total]) => ({
					name: courseTitle,
					total: total,
				})
			);

			return {
				data,
			};
		} else {
			throw new Error("User type not supported");
		}
	} catch (error) {
		console.log(`[GET_ANALYTICS]`, error);
		return { data: [], totalRevenue: 0, totalSales: 0 };
	}
};
