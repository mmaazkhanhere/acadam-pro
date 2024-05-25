
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { LucideIcon } from 'lucide-react';

type Props = {
    label: string;
    href: string;
    icon: LucideIcon
}

const SidebarItems = ({ label, href, icon: Icon }: Props) => {

    const router = useRouter();
    const pathname = usePathname();

    const isActive = pathname === href || pathname.includes(href);

    const onClick = () => {
        router.push(href)
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-x-2 text-sm font-medium transition-all duration-300 py-4 pl-4 hover:bg-muted-foreground/20 hover:text-muted-foreground/90 rounded-2xl w-full mt-2',
                isActive && 'bg-purple-500 text-white hover:bg-purple-400 hover:text-white/80'
            )}
        >
            <Icon />
            {label}
        </button>
    )
}

export default SidebarItems