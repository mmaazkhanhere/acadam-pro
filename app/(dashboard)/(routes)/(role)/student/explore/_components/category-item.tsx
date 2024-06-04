"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

type Props = {
	label: string;
	value?: string;
	icon: LucideIcon;
};

const CategoryItem = ({ label, value, icon: Icon }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentCategory = searchParams.get("categoryLabel");
	const currentTitle = searchParams.get("title");

	const isSelected = currentCategory === label;

	const onClick = () => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					title: currentTitle,
					categoryLabel: isSelected ? null : label,
				},
			},
			{
				skipEmptyString: true,
				skipNull: true,
			}
		);
		router.push(url);
	};

	return (
		<button
			aria-label={`${label} category button`}
			onClick={onClick}
			type="button"
			className={cn(
				"py-1 md:py-2 px-4 text-xs md:text-sm border border-purple-300 rounded-full flex items-center gap-x-1 hover:border-purple-500 transition",
				isSelected && "border-purple-500 bg-purple-300 text-black"
			)}
		>
			{Icon && <Icon size={20} />}
			<div className="truncate">{label}</div>
		</button>
	);
};

export default CategoryItem;
