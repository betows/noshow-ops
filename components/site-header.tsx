import Link from "next/link";
import { CtaButtons } from "@/components/cta-buttons";
import { copy, site } from "@/lib/copy";

type SiteHeaderProps = {
  calendlyUrl: string;
};

export function SiteHeader({ calendlyUrl }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/8 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5">
        <Link className="font-display text-lg tracking-tight text-ink" href="/">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Page">
          <a className="hover:text-ink" href="#offer">
            Offer
          </a>
          <a className="hover:text-ink" href="#who">
            Who
          </a>
          <a className="hover:text-ink" href="#proof">
            Proof
          </a>
        </nav>
        <div className="shrink-0">
          {calendlyUrl ? (
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-forest px-3 text-sm font-medium text-paper transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:px-4"
              href={calendlyUrl}
            >
              {copy.ctaPrimary}
            </a>
          ) : (
            <CtaButtons calendlyUrl={calendlyUrl} variant="compact" />
          )}
        </div>
      </div>
    </header>
  );
}
