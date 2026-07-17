"use client";

import { useToast } from "@/app/hooks/use-toast";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "relative flex items-start gap-3 rounded-2xl border border-taupe/25 bg-card-dark p-4 text-on-dark shadow-glass transition-all",
            "animate-fade-up",
            toast.variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-border"
          )}
        >
          <div className="flex-1">
            {toast.title && (
              <p className="font-paragraph text-sm font-semibold">
                {toast.title}
              </p>
            )}
            {toast.description && (
              <p className="mt-1 font-paragraph text-sm text-charcoal/65">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-charcoal/50 transition-colors hover:text-charcoal"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
