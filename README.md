# No-Show Ops

English one-page site for a planned no-show recovery offer. **Not for sale.** There is no deliverable product and no live checkout.

Stack: Next.js App Router, TypeScript, Tailwind CSS.

## Local setup

```bash
npm install
cp .env.example .env.local
# fill NEXT_PUBLIC_SITE_URL if you need a non-localhost origin
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Sales are halted

This site must not charge or sell. `POST /api/checkout` is disabled and returns **503** with a not-for-sale message. It does **not** create Stripe Checkout sessions.

The UI has no **Start retainer** button and no other Checkout CTA. There is no waitlist, Calendly, or book-a-call path.

Stripe env vars and `scripts/create-stripe-price.mjs` are leftover from a previous sales path. They are unused while the offer is not for sale. Do not treat them as a live charge setup.

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Server + browser | Canonical origin for metadata and sitemap (no trailing slash) |

Copy `.env.example` to `.env.local` for local work. Never commit secret keys.

If `NEXT_PUBLIC_SITE_URL` is unset on Vercel, the app falls back to `https://$VERCEL_URL`.

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com/new).
2. Framework preset: Next.js (default).
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin, e.g. `https://www.example.com`.
4. Deploy.

Stripe keys are not required. After a custom domain is attached, update `NEXT_PUBLIC_SITE_URL` to that domain.

## Project map

```
app/page.tsx                 Landing (non-selling / coming soon)
app/success/page.tsx         Legacy URL — not for sale
app/cancel/page.tsx          Legacy URL — not for sale
app/api/checkout/route.ts    Disabled (503, does not charge)
```
