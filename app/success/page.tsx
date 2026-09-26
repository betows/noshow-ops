import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy, site } from "@/lib/copy";

export const metadata = {
  title: "Not for sale",
};

export default function SuccessPage() {
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
        <div className="mt-10">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-md bg-forest px-5 text-base font-medium text-paper transition-colors hover:bg-forest-hover"
            href="/"
          >
            Back to {site.name}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
