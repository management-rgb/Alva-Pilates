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
            "relative flex items-start gap-3 rounded-lg border bg-white p-4 shadow-lg transition-all",
            "animate-fade-up",
            toast.variant === "destructive"
              ? "border-destructive bg-destructive text-destructive-foreground"
              : "border-charcoal/10"
          )}
        >
          <div className="flex-1">
            {toast.title && (
              <p className="font-paragraph text-sm font-semibold">
                {toast.title}
              </p>
            )}
            {toast.description && (
              <p className="font-paragraph text-sm text-charcoal/70 mt-1">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

