# No-Show Ops

English one-page marketing site for a done-for-you no-show recovery service. US dental, salon, and home-service operators. AI booking follow-up + light CRM, from **$2,500/mo**.

Stack: Next.js App Router, TypeScript, Tailwind CSS, Stripe Checkout (subscription).

## Local setup

```bash
npm install
cp .env.example .env.local
# fill the values in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Server | Creates Checkout Sessions |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser contract | Hosted Checkout does not need it at runtime; set it so the env contract is complete |
| `STRIPE_PRICE_ID` | Server | Recurring Price id for **$2,500 USD / month** |
| `NEXT_PUBLIC_CALENDLY_URL` | Browser | Primary CTA — Book a 20-min call. If unset, the button emails `appointcorporation@gmail.com` instead of a dead link. |
| `NEXT_PUBLIC_SITE_URL` | Server + browser | Canonical origin for Checkout `success_url` / `cancel_url` (no trailing slash) |

Copy `.env.example` to `.env.local` for local work. Never commit secret keys.

If `NEXT_PUBLIC_SITE_URL` is unset on Vercel, the app falls back to `https://$VERCEL_URL`.

## Stripe: Product + $2,500/mo Price

Checkout charges a **subscription** against `STRIPE_PRICE_ID`. Create that Price in test mode first, then repeat in live mode.

### Option A — script (API)

1. Put a test `STRIPE_SECRET_KEY` in `.env.local`.
2. Run:

```bash
npm run stripe:create-price
```

3. Copy the printed `price_...` id into `STRIPE_PRICE_ID` (local + Vercel).

The script creates:

- Product: `No-Show Ops retainer`
- Price: `250000` cents USD, `recurring.interval = month`

### Option B — Dashboard

1. [Stripe Dashboard → Product catalog](https://dashboard.stripe.com/test/products) → Add product.
2. Name: `No-Show Ops retainer`.
3. Recurring price: **$2,500.00 USD / month**.
4. Copy the Price id (`price_...`) into `STRIPE_PRICE_ID`.

### Option C — curl

```bash
curl https://api.stripe.com/v1/products \
  -u "$STRIPE_SECRET_KEY:" \
  -d name="No-Show Ops retainer" \
  -d description="AI booking follow-up + light CRM. Monthly retainer."

curl https://api.stripe.com/v1/prices \
  -u "$STRIPE_SECRET_KEY:" \
  -d product="prod_replace_me" \
  -d unit_amount=250000 \
  -d currency=usd \
  -d "recurring[interval]=month"
```

## Checkout flow

1. **Start retainer** `POST`s `/api/checkout`.
2. The route creates a Stripe Checkout Session (`mode: subscription`) for `STRIPE_PRICE_ID`.
3. The browser redirects to Stripe-hosted Checkout.
4. Success → `/success?session_id={CHECKOUT_SESSION_ID}`.
5. Cancel → `/cancel`.

Test cards: [https://docs.stripe.com/testing](https://docs.stripe.com/testing) — `4242 4242 4242 4242` in test mode.

If you will charge US (or EU) customers, enable [Stripe Tax for recurring payments](https://docs.stripe.com/billing/taxes/collect-taxes) and complete a tax registration in the Dashboard. This site does **not** turn on `automatic_tax` until that registration exists.

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com/new).
2. Framework preset: Next.js (default).
3. Add the env vars above for Production, Preview, and Development.
4. Set `NEXT_PUBLIC_SITE_URL` to the production origin, e.g. `https://www.example.com`.
5. Deploy.
6. Use **live** Stripe keys + the live `STRIPE_PRICE_ID` only on Production.

Preview deployments can keep test keys. After a custom domain is attached, update `NEXT_PUBLIC_SITE_URL` to that domain so Checkout redirects stay on-site.

## Project map

```
app/page.tsx                 Landing
app/success/page.tsx         Checkout success
app/cancel/page.tsx          Checkout cancel
app/api/checkout/route.ts    Stripe Checkout Session
scripts/create-stripe-price.mjs
```

Primary CTA uses `NEXT_PUBLIC_CALENDLY_URL` when set. If that env is missing or empty, the button falls back to `mailto:appointcorporation@gmail.com` so it never renders a dead href.
