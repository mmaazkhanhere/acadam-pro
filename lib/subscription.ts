import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

const DAYS_IN_MS = 86_400_000;

export const checkSubscription = async () => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const userSubscription = await prismadb.subscription.findUnique({
		where: {
			userId: userId,
		},
		select: {
			stripeCurrentPeriodEnd: true,
			stripeCustomerId: true,
			stripePriceId: true,
			stripeSubscriptionId: true,
		},
	});

	if (!userSubscription) {
		return false;
	}

	const isValid =
		userSubscription.stripePriceId &&
		userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MS >
			Date.now();

	return !!isValid;
};
