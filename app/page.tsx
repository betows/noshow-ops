import { CtaButtons } from "@/components/cta-buttons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy, site } from "@/lib/copy";

const painBeats = [
  "Last-minute cancels.",
  "No-shows.",
  "Tools that book — but nobody follows up.",
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-3 focus:py-2 focus:text-paper"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:pb-24 lg:pt-20">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {site.name} · DFY no-show recovery
            </p>
            <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {copy.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{copy.sub}</p>
            <div className="mt-8">
              <CtaButtons />
            </div>
            <p className="mt-4 text-sm text-muted">
              From {site.retainer} · Dental · Salon · Home services
            </p>
          </div>
          <WeekBoard />
        </section>

        <section className="border-y border-ink/8 bg-card/70" aria-labelledby="pain-heading">
          <div className="mx-auto w-full max-w-6xl px-5 py-16">
            <h2 id="pain-heading" className="font-display text-3xl tracking-tight">
              The empty-chair problem
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {painBeats.map((beat) => (
                <p
                  key={beat}
                  className="rounded-lg border border-ink/8 bg-paper px-5 py-6 text-lg leading-7 text-ink"
                >
                  {beat}
                </p>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
              Your team chases texts instead of serving clients.
            </p>
          </div>
        </section>

        <section id="offer" className="mx-auto w-full max-w-6xl px-5 py-20 scroll-mt-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            The offer
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl tracking-tight sm:text-4xl">
            {copy.offer}
          </h2>
          <ul className="mt-10 max-w-2xl space-y-4">
            {copy.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-lg leading-8 text-ink">
                <span
                  aria-hidden="true"
                  className="mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-forest"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="who"
          className="border-y border-ink/8 bg-forest text-paper"
          aria-labelledby="who-heading"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/65">
              Who this is for
            </p>
            <h2 id="who-heading" className="mt-3 max-w-3xl font-display text-3xl tracking-tight sm:text-4xl">
              {copy.who}
            </h2>
          </div>
        </section>

        <section id="proof" className="mx-auto w-full max-w-6xl px-5 py-20 scroll-mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Proof
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight">
                What you’ll see after a pilot
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">
              No invented rates, logos, or testimonials. These slots stay empty until
              we have a real pilot.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <PlaceholderCard
              title="Before / after no-show rate"
              body="Placeholder. Before/after no-show rate from the first pilot — published here when we have one. No numbers until then."
            />
            <PlaceholderCard
              title="Sample message flows"
              body="Placeholder. Confirm + recover sequences will be shown here after an operator signs off. No live copy yet."
            />
            <PlaceholderCard
              title="Week-1 setup checklist"
              body="Placeholder. The week-1 setup checklist will live here (connect booking tool, confirm flows, CRM handoff). Not published yet."
            />
          </div>
        </section>

        <section className="border-t border-ink/8 bg-card/70" aria-labelledby="start-heading">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 id="start-heading" className="font-display text-3xl tracking-tight sm:text-4xl">
                Start the retainer.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">{copy.offer}</p>
            </div>
            <CtaButtons />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function WeekBoard() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
  const pattern = [
    [true, false, true],
    [false, true, false],
    [true, true, false],
    [false, false, true],
    [true, false, false],
  ] as const;

  return (
    <aside className="rounded-xl border border-ink/10 bg-card p-5 shadow-[0_20px_50px_-28px_rgba(22,20,18,0.35)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">Open slots</p>
        <p className="rounded-full border border-dashed border-ink/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
          Illustration
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">Not client data.</p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {days.map((day, dayIndex) => (
          <div key={day} className="space-y-2">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] text-muted">
              {day}
            </p>
            {pattern[dayIndex].map((filled, slotIndex) => (
              <div
                key={`${day}-${slotIndex}`}
                className={
                  filled
                    ? "h-12 rounded-md bg-forest/20 ring-1 ring-forest/25"
                    : "h-12 rounded-md border border-dashed border-signal/55 bg-transparent"
                }
                aria-hidden="true"
              />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}

function PlaceholderCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-xl border border-dashed border-ink/20 bg-card p-6">
      <p className="inline-flex rounded-full border border-ink/12 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">
        Placeholder
      </p>
      <h3 className="mt-4 font-display text-2xl tracking-tight">{title}</h3>
      <p className="mt-3 text-base leading-7 text-muted">{body}</p>
    </article>
  );
}
