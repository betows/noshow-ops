"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";

type CtaButtonsProps = {
  variant?: "hero" | "compact" | "footer";
};

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CtaButtons({ variant = "hero" }: CtaButtonsProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const buttonClass =
    variant === "compact"
      ? "inline-flex h-10 items-center justify-center rounded-md bg-forest px-3 text-sm font-medium text-paper transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-70 sm:px-4"
      : "inline-flex h-12 items-center justify-center rounded-md bg-forest px-5 text-base font-medium text-paper transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-70";

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
        cause instanceof Error ? cause.message : "Unable to start Checkout. Try again.",
      );
    }
  }

  return (
    <div className={classNames("flex flex-col", variant !== "compact" && "gap-3")}>
      <button
        className={buttonClass}
        type="button"
        onClick={startCheckout}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Redirecting to Stripe…" : copy.ctaPrimary}
      </button>
      {error ? (
        <p className="max-w-md text-sm text-signal" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
