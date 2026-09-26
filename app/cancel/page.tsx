import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy, site } from "@/lib/copy";

export const metadata = {
  title: "Not for sale",
};

export default function CancelPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {copy.availabilityLabel}
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          Checkout is not available.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">{copy.availabilityBody}</p>
        <Link className="mt-8 text-sm text-muted underline-offset-4 hover:text-ink hover:underline" href="/">
          Back to {site.name}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
