"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";

type CtaButtonsProps = {
  calendlyUrl: string;
  variant?: "hero" | "compact" | "footer";
};

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CtaButtons({
  calendlyUrl,
  variant = "hero",
}: CtaButtonsProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const stacked = variant !== "compact";
  const primaryClass =
    variant === "compact"
      ? "inline-flex h-10 items-center justify-center rounded-md bg-forest px-4 text-sm font-medium text-paper transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      : "inline-flex h-12 items-center justify-center rounded-md bg-forest px-5 text-base font-medium text-paper transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
  const secondaryClass =
    variant === "compact"
      ? "inline-flex h-10 items-center justify-center rounded-md border border-ink/15 bg-card px-4 text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-70"
      : "inline-flex h-12 items-center justify-center rounded-md border border-ink/15 bg-card px-5 text-base font-medium text-ink transition-colors hover:border-ink/30 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-70";

  async function startCheckout() {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Unable to start Checkout.");
      }

      window.location.assign(payload.url);
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to start Checkout. Try again or book a call.",
      );
    }
  }

  return (
    <div className={classNames("flex flex-col", stacked && "gap-3")}>
      <div
        className={classNames(
          "flex",
          variant === "compact"
            ? "items-center gap-2"
            : "flex-col gap-3 sm:flex-row sm:items-center",
        )}
      >
        {calendlyUrl ? (
          <a className={primaryClass} href={calendlyUrl}>
            {copy.ctaPrimary}
          </a>
        ) : (
          <button
            className={primaryClass}
            type="button"
            onClick={() =>
              setError("Set NEXT_PUBLIC_CALENDLY_URL to enable the call booking link.")
            }
          >
            {copy.ctaPrimary}
          </button>
        )}
        <button
          className={secondaryClass}
          type="button"
          onClick={startCheckout}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Redirecting to Stripe…" : copy.ctaSecondary}
        </button>
      </div>
      {error ? (
        <p className="max-w-md text-sm text-signal" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
