import { Link } from "@tanstack/react-router";

// Wordmark placeholder until the official PWSO logo file is supplied.
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="PWSO home">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary font-display text-sm font-extrabold text-primary-foreground">
        PW<span className="text-accent">SO</span>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[0.95rem] font-extrabold ${inverted ? "text-navy-foreground" : "text-heading"}`}>
          Poor Women Support Organization
        </span>
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">Partnership for Change</span>
      </span>
    </Link>
  );
}
