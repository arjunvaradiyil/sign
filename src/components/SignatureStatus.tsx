"use client";

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
        className={`w-full border border-foreground bg-foreground px-6 py-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 sm:px-8 sm:py-8 ${className}`}
        aria-live="polite"
      >
        {content.status.loading}
      </div>
    );
  }

  if (error || count === null) {
    return (
      <div
        className={`w-full border border-foreground bg-foreground px-6 py-6 text-center text-[11px] text-white/80 sm:px-8 sm:py-8 ${className}`}
        role="status"
      >
        {content.status.unavailable}
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div
        className={`w-full border border-foreground bg-foreground px-6 py-6 text-center text-white sm:px-8 sm:py-8 ${className}`}
        role="status"
        aria-live="polite"
      >
        <p className="text-3xl font-extrabold tabular-nums tracking-tight sm:text-4xl">
          {count.toLocaleString("en-IN")}
        </p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
          {getHeaderLabel(count)}
        </p>
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
        <span className="font-bold tabular-nums">
          {count.toLocaleString("en-IN")}
        </span>
        <span className="text-muted">{content.status.label}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center border border-foreground bg-background px-6 py-4 ${className}`}
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
