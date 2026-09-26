import { copy, resolveBookCallHref } from "@/lib/copy";

type BookCallLinkProps = {
  calendlyUrl: string;
  className: string;
};

export function BookCallLink({ calendlyUrl, className }: BookCallLinkProps) {
  const { href, isCalendly } = resolveBookCallHref(calendlyUrl);

  return (
    <a
      className={className}
      href={href}
      target={isCalendly ? "_blank" : undefined}
      rel={isCalendly ? "noopener noreferrer" : undefined}
      title={isCalendly ? undefined : "Email appointcorporation@gmail.com"}
      aria-label={isCalendly ? undefined : "Email to book a 20-min call"}
    >
      {copy.ctaPrimary}
    </a>
  );
}
