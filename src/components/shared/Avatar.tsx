import { cn, initials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

/** Profile photo from R2 when one is uploaded, otherwise initials on emerald. */
export function Avatar({ name, src, className }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald/15 text-xs font-bold text-emerald ring-1 ring-emerald/30",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- presigned R2 URLs change hourly, so next/image caching doesn't help
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
}
