"use client";

import Link from "next/link";

import Logo from "@/components/logo";
import NavbarButton from "./navbar-button";

import { ArrowLeft } from "lucide-react";

type Props = {
	userType: string;
};

const Navbar = ({ userType }: Props) => {
	return (
		<header className="flex items-center justify-between p-2">
			<div className="block md:hidden">
				<Link href="/">
					<ArrowLeft />
				</Link>
			</div>
			<nav className="hidden md:block">
				<Logo />
			</nav>
			<NavbarButton userType={userType} />
		</header>
	);
};

export default Navbar;
