import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, hint, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">{icon}</span>
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      {hint && <p className="max-w-xs text-xs text-text-primary/60">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
