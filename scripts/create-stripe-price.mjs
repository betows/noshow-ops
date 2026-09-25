import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY?.trim();

if (!key) {
  console.error(
    "Missing STRIPE_SECRET_KEY. Copy .env.example to .env.local and add a test secret key.",
  );
  process.exit(1);
}

const stripe = new Stripe(key);

const product = await stripe.products.create({
  name: "No-Show Ops retainer",
  description:
    "AI booking follow-up + light CRM for US service businesses. Monthly retainer.",
});

const price = await stripe.prices.create({
  product: product.id,
  currency: "usd",
  unit_amount: 250000,
  recurring: { interval: "month" },
});

console.log("Created product:", product.id);
console.log("Created price:", price.id);
console.log(`Set STRIPE_PRICE_ID=${price.id}`);
