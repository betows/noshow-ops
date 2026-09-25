import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/copy";

export const metadata = {
  title: "Checkout canceled",
};

export default function CancelPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "";

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader calendlyUrl={calendlyUrl} />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Stripe Checkout
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          Checkout canceled.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          No charge was made. You can start the {site.retainer} retainer again, or
          book a 20-min call first.
        </p>
        <div className="mt-10">
          <CtaButtons calendlyUrl={calendlyUrl} />
        </div>
        <Link className="mt-8 text-sm text-muted underline-offset-4 hover:text-ink hover:underline" href="/">
          Back to {site.name}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
