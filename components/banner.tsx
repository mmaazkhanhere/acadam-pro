import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full", {
    variants: {
        variant: {
            warning: "bg-red-500/80 border-red-500 text-white",
            success: 'bg-white border border-black rounded-lg'
        }
    },
    defaultVariants: {
        variant: "warning"
    }
}
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon
}

export const Banner = ({ label, variant }: BannerProps) => {
    const Icon = iconMap[variant || "warning"]

    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </div>
    )
}