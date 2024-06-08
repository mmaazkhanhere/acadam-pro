import Link from "next/link";

import { SignInButton, SignOutButton } from "@clerk/nextjs";

import { ThemeButton } from "@/components/ui/theme-button";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

import { LogOut } from "lucide-react";

type Props = {
	userType?: string;
	userId?: string;
};

const NavbarButtons = async ({ userType, userId }: Props) => {
	if (!userId) {
		return (
			<nav className="flex items-center gap-x-2 md:gap-x-4">
				<ThemeButton />

				{userId ? (
					<UserAvatar />
				) : (
					<SignInButton>
						<Button
							aria-label="login button"
							variant="outline"
							className="hover:bg-purple-500 hover:text-white dark:bg-muted-foreground dark:hover:bg-muted-foreground/70"
						>
							Join Us
						</Button>
					</SignInButton>
				)}

				{userId && (
					<SignOutButton signOutOptions={{ redirectUrl: "/" }}>
						<Button
							title="logout"
							aria-label="Logout button"
							variant="ghost"
							className="hidden lg:block dark:bg-muted-foreground dark:hover:bg-muted-foreground/70 cursor-pointer"
						>
							<LogOut />
						</Button>
					</SignOutButton>
				)}
			</nav>
		);
	}

	return (
		<nav className="flex items-center gap-x-2 md:gap-x-4">
			{userId && (
				<Link href={`/${userType?.toLowerCase()}/dashboard`}>
					<Button
						size="sm"
						className="hidden md:block"
						aria-label="dashboard button"
					>
						Dashboard
					</Button>
				</Link>
			)}

			<ThemeButton />

			{userId ? (
				<UserAvatar />
			) : (
				<SignInButton>
					<Button
						aria-label="login button"
						variant="outline"
						className="hover:bg-purple-500 hover:text-white"
					>
						Join Us
					</Button>
				</SignInButton>
			)}

			{userId && (
				<SignOutButton signOutOptions={{ redirectUrl: "/" }}>
					<Button
						title="logout"
						aria-label="Logout button"
						variant="ghost"
						className="hidden lg:block cursor-pointer"
					>
						<LogOut />
					</Button>
				</SignOutButton>
			)}
		</nav>
	);
};

export default NavbarButtons;
