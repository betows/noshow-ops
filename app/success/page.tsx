import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/copy";
import { getStripe } from "@/lib/stripe";

export const metadata = {
  title: "Retainer started",
};

type SuccessSearchParams = Promise<{ session_id?: string }>;

async function readCheckoutEmail(sessionId?: string): Promise<string | null> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return session.customer_details?.email ?? null;
  } catch {
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SuccessSearchParams;
}) {
  const { session_id: sessionId } = await searchParams;
  const email = await readCheckoutEmail(sessionId);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Stripe Checkout
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          Retainer checkout complete.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          {email
            ? `Stripe has the ${site.retainer} subscription for ${email}. We’ll use that to start onboarding.`
            : `Stripe has the ${site.retainer} subscription. We’ll use the checkout details to start onboarding.`}
        </p>
        <p className="mt-4 text-lg leading-8 text-muted">
          No further payment is taken on this site. Manage the subscription in the
          Stripe receipt email if you need to update the card.
        </p>
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
