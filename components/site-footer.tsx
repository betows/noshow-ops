import { copy, site } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. English-only. US service
          businesses.
        </p>
        <p>{copy.availabilityLabel}. No checkout on this site.</p>
      </div>
    </footer>
  );
}
