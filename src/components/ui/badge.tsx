import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-5",
  {
    variants: {
      variant: {
        default: "bg-text-primary/5 text-text-primary/80",
        emerald: "bg-emerald/15 text-emerald",
        amber: "bg-amber/15 text-amber",
        danger: "bg-danger/15 text-danger",
        outline: "border border-border text-text-primary/80",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
