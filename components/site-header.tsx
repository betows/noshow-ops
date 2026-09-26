import Link from "next/link";
import { NotForSaleNotice } from "@/components/not-for-sale-notice";
import { site } from "@/lib/copy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/8 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5">
        <Link className="font-display text-lg tracking-tight text-ink" href="/">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Page">
          <Link className="hover:text-ink" href="/#offer">
            Offer
          </Link>
          <Link className="hover:text-ink" href="/#who">
            Who
          </Link>
          <Link className="hover:text-ink" href="/#proof">
            Proof
          </Link>
        </nav>
        <div className="shrink-0">
          <NotForSaleNotice variant="compact" />
        </div>
      </div>
    </header>
  );
}
