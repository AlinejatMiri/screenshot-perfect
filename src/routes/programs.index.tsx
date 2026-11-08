import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { PROGRAMS } from "@/data/programs";
import { seo } from "@/lib/seo";
import img from "@/assets/hero-agriculture.jpg";

export const Route = createFileRoute("/programs/")({
  head: () => seo("What We Do", "PWSO's thematic areas and technical programs across Afghanistan."),
  component: Programs,
});

function Programs() {
  const groups = ["Thematic area", "Technical program"] as const;
  return (
    <>
      <PageHero title="What We Do" intro="Ten areas of work designed around the needs of women and communities." image={img} crumbs={[{ label: "What We Do" }]} />
      {groups.map((g) => (
        <section key={g} className="container-x py-16">
          <SectionHeading eyebrow={g === "Thematic area" ? "Primary" : "Specialized"} title={g === "Thematic area" ? "Thematic areas" : "Technical programs"} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.filter((p) => p.kind === g).map((p) => (
              <li key={p.slug}>
                <Link to="/programs/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary"><p.icon className="h-6 w-6 text-primary" aria-hidden /></span>
                  <h3 className="mt-5 text-xl font-bold group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <CTASection />
    </>
  );
}
