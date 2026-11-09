import { Link } from "@tanstack/react-router";

// Wordmark placeholder until the official PWSO logo file is supplied.
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="PWSO home">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary font-display text-sm font-extrabold text-primary-foreground">
        PW<span className="text-accent">SO</span>
      </span>
      <span className="whitespace-nowrap leading-tight">
        <span className={`block font-display text-[0.95rem] font-extrabold ${inverted ? "text-navy-foreground" : "text-heading"}`}>
          <span className="2xl:hidden">PWSO</span>
          <span className="hidden 2xl:inline">Poor Women Support Organization</span>
        </span>
        <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent sm:block xl:hidden 2xl:block">Partnership for Change</span>
      </span>
    </Link>
  );
}
