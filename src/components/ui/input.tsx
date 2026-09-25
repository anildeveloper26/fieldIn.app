import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-2xl border border-border bg-background px-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-primary/40 focus:border-emerald focus:ring-2 focus:ring-emerald/20 disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Select = forwardRef<HTMLSelectElement, InputHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-2xl border border-border bg-background px-3 text-sm text-text-primary outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
