"use client";

import { redirect } from "next/navigation";

import { SignOutButton, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/components/ui/theme-button";

import { LogOut } from "lucide-react";
import Link from "next/link";

type Props = {
	userType: string;
};

const NavbarButton = ({ userType }: Props) => {
	const { userId } = useAuth();

	if (!userId) {
		return redirect("/");
	}

	return (
		<nav className="hidden md:flex items-center justify-center gap-x-4">
			{userId && (
				<Link href={`/${userType.toLowerCase()}/dashboard`}>
					<Button aria-label="Dashboard button">Dashboard</Button>
				</Link>
			)}

			<ThemeButton />

			<SignOutButton>
				<LogOut />
			</SignOutButton>
		</nav>
	);
};

export default NavbarButton;
