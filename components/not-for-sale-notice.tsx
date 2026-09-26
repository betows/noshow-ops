import { copy } from "@/lib/copy";

type NotForSaleNoticeProps = {
  variant?: "hero" | "compact";
};

export function NotForSaleNotice({ variant = "hero" }: NotForSaleNoticeProps) {
  if (variant === "compact") {
    return (
      <p className="inline-flex h-10 items-center rounded-md border border-ink/15 bg-card px-3 text-sm font-medium text-ink sm:px-4">
        {copy.availabilityLabel}
      </p>
    );
  }

  return (
    <div className="max-w-md rounded-lg border border-ink/10 bg-card px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        {copy.availabilityLabel}
      </p>
      <p className="mt-2 text-base leading-7 text-ink">{copy.availabilityBody}</p>
    </div>
  );
}
