"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeButton } from "@/components/ui/theme-button";

import MobileSidebar from "./mobile-sidebar";

import { UserButton } from "@clerk/nextjs";

type Props = {
	teacher?: boolean;
};

const Navbar = ({ teacher }: Props) => {
	const pathname = usePathname();

	return (
		<header className="p-4 h-full flex items-center justify-between shadow-sm bg-white dark:bg-black dark:border-b-2">
			<MobileSidebar />

			<div className="hidden md:block" />

			<nav className="flex items-center gap-x-2">
				{!pathname.includes("/student") && teacher && (
					<Link href="/teacher/create-course">
						<Button aria-label="Create course button">
							Create Course
						</Button>
					</Link>
				)}

				<ThemeButton />
				<UserButton afterSignOutUrl="/" />
			</nav>
		</header>
	);
};

export default Navbar;
