"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AlertIcon, CheckIcon, InfoIcon } from "./icons";

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_STYLE: Record<ToastVariant, { icon: typeof CheckIcon; accent: string }> = {
  success: { icon: CheckIcon, accent: "bg-emerald/15 text-emerald" },
  error: { icon: AlertIcon, accent: "bg-danger/15 text-danger" },
  info: { icon: InfoIcon, accent: "bg-text-primary/10 text-text-primary" },
};

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = nextId++;
      setToasts((current) => [...current.slice(-3), { id, message, variant }]);
      setTimeout(() => dismiss(id), 3500);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end"
      >
        {toasts.map((toast) => {
          const { icon: Icon, accent } = TOAST_STYLE[toast.variant];
          return (
            <button
              key={toast.id}
              onClick={() => dismiss(toast.id)}
              className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-4 text-left text-sm text-text-primary shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", accent)}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1">{toast.message}</span>
            </button>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
