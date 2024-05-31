import Logo from "@/components/logo";

import NavbarButtons from "./navbar-buttons";
import MobileMenu from "./mobile-menu";
import NavbarMenu from "./navbar-menu";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

type Props = {};

const Navbar = async (props: Props) => {
	const { userId } = auth();

	let user;
	if (userId) {
		user = await prismadb.user.findUnique({
			where: {
				id: userId as string,
			},
			select: {
				userType: true,
			},
		});
	}

	return (
		<header className="flex items-center justify-between">
			<nav className="lg:hidden">
				<MobileMenu
					userId={userId as string}
					userType={user?.userType}
				/>
			</nav>
			<Logo className="hidden lg:block" />
			<NavbarMenu />
			<NavbarButtons
				userId={userId as string}
				userType={user?.userType}
			/>
		</header>
	);
};

export default Navbar;
