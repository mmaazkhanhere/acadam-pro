"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

type Props = {
    label: string;
    value?: string;
    icon: LucideIcon;
}

const CategoryItem = ({ label, value, icon: Icon }: Props) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get('category');
    const currentTitle = searchParams.get('title');

    const isSelected = currentCategory === label;

    console.log(isSelected);
    console.log(currentTitle);

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: isSelected ? null : label,
            }
        }, {
            skipEmptyString: true,
            skipNull: true,
        });
        router.push(url);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                'py-2 px-4 text-sm border border-purple-300 rounded-full flex items-center gap-x-1 hover:border-purple-500 transition',
                isSelected && 'border-purple-500 bg-purple-300 text-black'
            )}
        >
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    );
}

export default CategoryItem;
