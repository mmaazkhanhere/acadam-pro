"use client";

import { redirect } from "next/navigation";
import Link from "next/link";

import { SignOutButton, useAuth } from "@clerk/nextjs";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

import { LogOut, Menu } from "lucide-react";

type Props = {
	userId?: string;
	userType?: string;
};

const routes = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Pricing",
		href: "/pricing",
	},
	{
		label: "Blog",
		href: "/blog",
	},
	{
		label: "Contact",
		href: "/contact",
	},
];

const MobileMenu = ({ userId, userType }: Props) => {
	const onClick = (href: string) => {
		redirect(href);
	};

	return (
		<Sheet>
			<SheetTrigger>
				<Menu className="w-7 h-7" />
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="flex flex-col items-center mb-5 w-full md:w-[500px]"
			>
				<Logo />
				{routes.map((route) => (
					<button
						key={route.label}
						onClick={() => onClick(route.href)}
						className="flex flex-col items-center dark:bg-muted dark:px-4 dark:py-1 dark:rounded-xl"
						aria-label={`${route.label} button`}
					>
						{route.label}
					</button>
				))}

				{userId && (
					<Link href={`/${userType?.toLowerCase()}/dashboard`}>
						<Button
							size="sm"
							className="block md:hidden"
							aria-label="dashboard button"
						>
							Dashboard
						</Button>
					</Link>
				)}

				{userId && (
					<SignOutButton>
						<Button
							variant="ghost"
							className="dark:bg-muted-foreground dark:hover:bg-muted-foreground/70"
							size="sm"
						>
							<LogOut /> Sign Out
						</Button>
					</SignOutButton>
				)}
			</SheetContent>
		</Sheet>
	);
};

export default MobileMenu;
