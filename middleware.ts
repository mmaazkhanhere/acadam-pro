import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
	"/",
	"/api/webhook/stripe-webhook",
	"/api/webhook/clerk-webhook",
	"/api/stripe-subscription",
	"/api/stripe-purchase",
	"/api/uploadthing",
]);

export default clerkMiddleware((auth, request) => {
	if (!isPublicRoute(request)) {
		auth().protect();
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
