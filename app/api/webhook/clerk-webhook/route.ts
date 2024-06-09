/*An api endpoint to receive webhook events from the Clerk and do database queries 
using prisma accordingly, ensuring that the data is synchronized between the
Clerk and database */

import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import prismadb from "@/lib/prismadb";

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
	data: Record<string, string | number>;
	object: "event";
	type: EventType;
};

export async function POST(request: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET; /*retrieve the 
    clerk webhook secret from the environment variables */

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	const payload = await request.json(); //get the payload from the request

	const headersList = headers();
	const heads = {
		"svix-id": headersList.get("svix-id"),
		"svix-timestamp": headersList.get("svix-timestamp"),
		"svix-signature": headersList.get("svix-signature"),
	}; //extract the required headers from the request

	const wh = new Webhook(WEBHOOK_SECRET); //create new webhook

	let evt: Event | null = null;

	try {
		//verify the webhook payload using th webhook instance and extracted headers
		evt = wh.verify(
			JSON.stringify(payload),
			heads as IncomingHttpHeaders & WebhookRequiredHeaders
		) as Event;
	} catch (error) {
		console.error("CLERK_WEBHOOK_ERROR", error);
		return NextResponse.json("CLERK_WEBHOOK_ERROR", { status: 400 });
	}

	const eventType: EventType = evt.type;

	try {
		/*if the event type is creating user, call the handleUserSignUp function
        that creates a new user and insert in the database */
		if (eventType === "user.created") {
			await handleUserSignup(evt.data);
		} else if (eventType === "user.updated") {
		/*If the event type is user updated, it call the handleUserUpdated function 
        that updates the user data in the database */
			await handleUserUpdate(evt.data);
		} else if (eventType === "user.deleted") {

		/* if the event type is deleting user, it call the handleDeleteUser function
        and deletes the user data from the database*/
			await handleDeleteUser(evt.data);
		}
	} catch (error) {
		console.error("Error handling webhook event:", error);
		return new Response("Error handling webhook event", { status: 500 });
	}

	return new Response("", { status: 200 });
}

async function handleUserSignup(userData: any) {
	const fullName: string = userData.first_name + " " + userData.last_name;

	try {
		await prismadb.user.create({
			data: {
				id: userData.id,
				name: fullName,
				username: userData.username,
				emailAddress: userData.email_addresses[0].email_address,
				imageUrl: userData.image_url,
			},
		});
	} catch (error) {
		console.error("Error inserting user data:", error);
		throw error;
	}
}

async function handleUserUpdate(userData: any) {
	const fullName: string = userData.first_name + " " + userData.last_name;

	try {
		await prismadb.user.update({
			where: {
				id: userData.id,
			},
			data: {
				name: fullName,
				username: userData.username,
				emailAddress: userData.email_addresses[0].email_address,
				imageUrl: userData.image_url,
			},
		});
	} catch (error) {
		console.error("Error updating user data:", error);
		throw error;
	}
}

async function handleDeleteUser(userData: any) {
	try {
		await prismadb.user.deleteMany({
			where: {
				id: userData.id,
			},
		});
	} catch (error) {
		console.error("Error deleting user data:", error);
		throw error;
	}
}
