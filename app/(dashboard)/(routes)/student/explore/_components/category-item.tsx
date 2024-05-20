import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    label: string;
    value?: string;
    icon: LucideIcon
}

const CategoryItem = ({ label, value, icon: Icon }: Props) => {

    const pathname = usePathname();
    const router = useRouter();

    return (
        <div>CategoryItem</div>
    )
}

export default CategoryItem