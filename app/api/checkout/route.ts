import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { getStripe, getStripePriceId } from "@/lib/stripe";

export const runtime = "nodejs";

function missingConfigMessage(error: unknown): string | null {
  if (!(error instanceof Error)) {
    return null;
  }

  if (error.message.includes("STRIPE_SECRET_KEY")) {
    return "Checkout is not configured. Set STRIPE_SECRET_KEY.";
  }

  if (error.message.includes("STRIPE_PRICE_ID")) {
    return "Checkout is not configured. Set STRIPE_PRICE_ID.";
  }

  return null;
}

export async function POST() {
  try {
    const stripe = getStripe();
    const priceId = getStripePriceId();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      billing_address_collection: "required",
      metadata: {
        offer: "noshow-ops-retainer",
      },
      subscription_data: {
        metadata: {
          offer: "noshow-ops-retainer",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a Checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const configMessage = missingConfigMessage(error);
    if (configMessage) {
      return NextResponse.json({ error: configMessage }, { status: 503 });
    }

    console.error("Stripe Checkout session failed", error);
    return NextResponse.json(
      { error: "Unable to start Checkout. Try again." },
      { status: 500 },
    );
  }
}
