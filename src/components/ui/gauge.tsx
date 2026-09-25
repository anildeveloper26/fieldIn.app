import { cn } from "@/lib/utils";

interface SegmentGaugeProps {
  value: number;
  max: number;
  segments?: number;
  /** Colour thresholds flip the gauge from emerald to amber to danger as it fills. */
  tone?: "capacity" | "progress";
  className?: string;
}

/** Segmented bar used for crowd occupancy, team capacity and squad slots. */
export function SegmentGauge({ value, max, segments = 10, tone = "progress", className }: SegmentGaugeProps) {
  const ratio = max > 0 ? Math.min(1, value / max) : 0;
  const lit = Math.round(ratio * segments);
  const fill =
    tone === "capacity" ? (ratio >= 0.8 ? "bg-danger" : ratio >= 0.5 ? "bg-amber" : "bg-emerald") : "bg-emerald";

  return (
    <div
      className={cn("flex gap-1", className)}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} className={cn("h-2 flex-1 rounded-full", i < lit ? fill : "bg-text-primary/10")} />
      ))}
    </div>
  );
}
