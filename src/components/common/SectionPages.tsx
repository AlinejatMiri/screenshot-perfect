import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SECTIONS } from "@/data/pages";
import { PageHero } from "./PageHero";
import { ContentBlocks } from "./ContentBlocks";
import { CTASection } from "./CTASection";

type LinkRender = (slug: string, children: ReactNode, className: string) => ReactNode;

export function SectionOverview({
  sectionKey,
  base,
  link,
  image,
  children,
  showPageCards = true,
  cardImages,
}: {
  sectionKey: string;
  base: string;
  link: LinkRender;
  image?: string | undefined;
  children?: ReactNode;
  showPageCards?: boolean;
  cardImages?: Record<string, { src: string; alt: string }>;
}) {
  const s = SECTIONS[sectionKey]!;
  return (
    <>
      <PageHero title={s.title} intro={s.intro} image={image} crumbs={[{ label: s.title }]} />
      <section className="container-x py-20">
        {children}
        {showPageCards && (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(s.pages).map(([slug, p]) => (
              <li key={slug}>
                {link(
                  slug,
                  cardImages?.[slug] ? (
                    <>
                      <span className="relative block min-h-44 w-[36%] min-w-28 shrink-0 overflow-hidden">
                        <img src={cardImages[slug].src} alt={cardImages[slug].alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col p-4">
                        <span className="text-base font-bold text-heading group-hover:text-primary">{p.title}</span>
                        <span className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.intro}</span>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Explore resources <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                      </span>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold group-hover:text-primary">{p.title}</h2>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.intro}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </>
                  ),
                  cardImages?.[slug]
                    ? "group flex min-h-44 h-full overflow-hidden rounded-xl border border-border border-t-4 border-t-primary bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                    : "group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift",
                )}
              </li>
            ))}
          </ul>
        )}
        <span className="sr-only">{base}</span>
      </section>
      <CTASection />
    </>
  );
}

export function SectionDetail({
  sectionKey,
  slug,
  overviewTo,
  variant,
  children,
  link,
}: {
  sectionKey: string;
  slug: string;
  overviewTo: string;
  variant?: "list" | "grid" | "timeline" | undefined;
  children?: ReactNode;
  link: LinkRender;
}) {
  const s = SECTIONS[sectionKey]!;
  const p = s.pages[slug]!;
  return (
    <>
      <PageHero
        eyebrow={s.title}
        title={p.title}
        intro={p.intro}
        crumbs={[{ label: s.title, to: overviewTo }, { label: p.title }]}
      />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_17rem]">
        <div>
          {children}
          {p.blocks.length > 0 && <ContentBlocks blocks={p.blocks} variant={variant} />}
        </div>
        <aside aria-label={`${s.title} pages`} className="lg:sticky lg:top-36 lg:self-start">
          <p className="eyebrow mb-3">{s.title}</p>
          <ul className="space-y-1 border-l-2 border-border">
            {Object.entries(s.pages).map(([k, v]) => (
              <li key={k}>
                {link(
                  k,
                  v.title,
                  `-ml-0.5 block border-l-2 py-1.5 pl-4 text-sm ${k === slug ? "border-accent font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-heading"}`,
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
