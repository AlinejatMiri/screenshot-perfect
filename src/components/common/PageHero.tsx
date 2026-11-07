import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      {image && <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" width={1920} height={1088} />}
      <div className={`absolute inset-0 -z-10 ${image ? "bg-hero-overlay" : "bg-band"}`} />
      <div className="container-x py-16 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs">
          <ol className="flex flex-wrap items-center gap-1.5 opacity-80">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" aria-hidden />
                {c.to ? <Link to={c.to} className="hover:text-accent">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold text-navy-foreground md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-85">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
      <span className={`accent-rule mt-4 ${center ? "mx-auto" : ""}`} />
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function Todo({ children }: { children: ReactNode }) {
  return <span className="todo-flag">TODO: {children}</span>;
}
