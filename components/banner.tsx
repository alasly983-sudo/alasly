import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center justify-center w-full rounded-xl shadow-sm",
  {
    variants: {
      variant: {
        warning: "bg-codeup-gold-soft border-codeup-gold/30 text-codeup-ink",
        success: "bg-codeup-brand border-codeup-strong text-white",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return  (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 ml-2" />
      {label}
    </div>
  );
};
