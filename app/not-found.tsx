import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/copy";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-20">
        <h1 className="font-display text-4xl tracking-tight">Page not found.</h1>
        <p className="mt-4 text-lg text-muted">
          That URL is not part of {site.name}.
        </p>
        <Link
          className="mt-8 inline-flex h-12 w-fit items-center justify-center rounded-md bg-forest px-5 text-base font-medium text-paper hover:bg-forest-hover"
          href="/"
        >
          Back to {site.name}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
