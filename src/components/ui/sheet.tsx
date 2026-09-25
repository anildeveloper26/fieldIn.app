"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from "react";
import { CloseIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";

/** shadcn/ui Sheet: a Radix Dialog that slides in from the right edge. Used
 * for the Booking Drawer and the Athlete Resume Drawer. */
export const Sheet = SheetPrimitive.Root;
export const SheetClose = SheetPrimitive.Close;

export const SheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card text-text-primary shadow-2xl sm:rounded-l-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=closed]:duration-200 data-[state=open]:duration-300",
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 text-text-primary/50 transition-colors hover:bg-text-primary/5 hover:text-text-primary">
        <CloseIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-border p-6 pr-12", className)} {...props} />;
}

export function SheetBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 space-y-6 overflow-y-auto p-6", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-border p-6", className)} {...props} />;
}

export const SheetTitle = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-xl font-bold", className)} {...props} />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("mt-1 text-sm text-text-primary/60", className)} {...props} />
));
SheetDescription.displayName = "SheetDescription";
