"use client";

import { Users } from "lucide-react";
import { content } from "@/i18n/translations";
import { useSignatureCount } from "@/context/SignatureCountProvider";

type SignatureStatusProps = {
  className?: string;
  variant?: "default" | "compact" | "header";
};

export default function SignatureStatus({
  className = "",
  variant = "default",
}: SignatureStatusProps) {
  const { count, loading, error } = useSignatureCount();

  function getLabel(value: number) {
    if (value === 1) {
      return content.status.signedOne;
    }
    return content.status.signed.replace(
      "{count}",
      value.toLocaleString("en-IN")
    );
  }

  function getHeaderLabel(value: number) {
    if (value === 1) {
      return content.status.signedOneShort;
    }
    return content.status.signedShort;
  }

  if (loading) {
    return (
      <div
        className={`text-xs text-muted ${className}`}
        aria-live="polite"
      >
        {content.status.loading}
      </div>
    );
  }

  if (error || count === null) {
    return (
      <div className={`text-xs text-muted ${className}`} role="status">
        {content.status.unavailable}
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div
        className={`flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 shadow-sm ${className}`}
        role="status"
        aria-live="polite"
      >
        <Users className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <div className="text-right leading-tight">
          <div className="text-base font-extrabold tabular-nums text-foreground">
            {count.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-muted">{getHeaderLabel(count)}</div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-2 text-sm text-foreground ${className}`}
        role="status"
        aria-live="polite"
      >
        <Users className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <span className="font-bold tabular-nums">
          {count.toLocaleString("en-IN")}
        </span>
        <span className="text-muted">{content.status.label}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-3 shadow-sm ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
        {count.toLocaleString("en-IN")}
      </span>
      <span className="mt-1 text-sm text-muted">{getLabel(count)}</span>
    </div>
  );
}
