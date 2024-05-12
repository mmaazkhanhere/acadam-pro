import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    label: string;
    href: string;
    icon: LucideIcon
}

const SidebarItems = ({ label, href, icon: Icon }: Props) => {

    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === href

    const onClick = () => {
        router.push(href)
    }

    return (
        <button
            className={cn(
                'flex items-center gap-x-2 text-sm font-medium transition-all duration-300 py-4 pl-4 hover:bg-muted-foreground/20 hover:text-muted-foreground/90 rounded-2xl w-full',
                isActive && 'bg-purple-500 text-white hover:bg-purple-400 hover:text-white/80'
            )}
        >
            <Icon />
            {label}
        </button>
    )
}

export default SidebarItems