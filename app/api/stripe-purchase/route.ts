import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
	try {
		const { userId } = auth();

		const user = await prismadb.user.findUnique({
			where: {
				id: userId as string,
			},
		});

		if (!userId || !user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const body = await request.json();

		const { courseId, price } = body;

		const course = await prismadb.course.findUnique({
			where: {
				id: courseId,
			},
			select: {
				title: true,
			},
		});

		if (!course) {
			return new NextResponse("Course not found", { status: 404 });
		}

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: `${course.title}`,
							description: "Course Purchase",
						},
						unit_amount: price * 100,
					},
					quantity: 1,
				},
			],
			metadata: {
				courseId,
				price,
				userId,
			},
			success_url: `${
				process.env.NEXT_APP_URL
			}/${user.userType.toLowerCase()}/dashboard`,
			cancel_url: `${
				process.env.NEXT_APP_URL
			}/${user.userType.toLowerCase()}/dashboard`,
		});

		return new NextResponse(JSON.stringify({ url: session.url }));
	} catch (error) {
		console.error("STRIPE_SESSION_API_ERROR", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};
