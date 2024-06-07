import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { userId } = auth();
		const body = await request.json();
		const user = await currentUser();
		const { courseId } = body;

		const settingsUrl = absoluteUrl(`/user/${userId}`);

		if (!userId || !user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userSubscription = await prismadb.subscription.findUnique({
			where: {
				userId,
			},
		});

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingsUrl,
			});

			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}
		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingsUrl,
			cancel_url: settingsUrl,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Monthly subscription",
							description:
								"Have unlimited access to courses by AcadamPro",
						},
						unit_amount: 1999,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId,
				courseId,
			},
		});

		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (error) {
		console.log(`[STRIPE_ERROR]`, error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
