import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error: any) {
		return new NextResponse(`Webhook Error: ${error.message}`, {
			status: 400,
		});
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const userId = session?.metadata?.userId;
	const courseId = session?.metadata?.courseId;

	if (!userId) {
		return new NextResponse("User id is required", { status: 400 });
	}

	switch (event.type) {
		case "checkout.session.completed":
			if (session.mode === "subscription") {
				const subscription = await stripe.subscriptions.retrieve(
					session.subscription as string
				);

				await handleSubscriptionCreation(userId, subscription);
			} else if (session.mode === "payment") {
				await handleSinglePurchase(
					userId,
					courseId as string,
					session.amount_total as number
				);
			}
			break;

		case "invoice.payment_succeeded":
			const subscription = await stripe.subscriptions.retrieve(
				session.subscription as string
			);

			await handleSubscriptionRenewal(userId, subscription);
			break;

		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new NextResponse(null, { status: 200 });
}

async function handleSubscriptionCreation(
	userId: string,
	subscription: Stripe.Subscription
) {
	await prismadb.subscription.create({
		data: {
			userId,
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(
				subscription.current_period_end * 1000
			),
		},
	});
}

async function handleSubscriptionRenewal(
	userId: string,
	subscription: Stripe.Subscription
) {
	await prismadb.subscription.update({
		where: {
			stripeSubscriptionId: subscription.id,
		},
		data: {
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(
				subscription.current_period_end * 1000
			),
		},
	});
}

async function handleSinglePurchase(
	userId: string,
	courseId: string,
	amount: number
) {
	if (!courseId) {
		return new NextResponse("Course id is required for single purchase", {
			status: 400,
		});
	}

	await prismadb.purchase.create({
		data: {
			userId,
			courseId,
			amount,
		},
	});
}
