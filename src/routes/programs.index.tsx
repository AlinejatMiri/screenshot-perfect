import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { PROGRAMS } from "@/data/programs";
import { seo } from "@/lib/seo";
import img from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";
import { ArrowRight } from "lucide-react";

const PROGRAM_MEDIA: Record<string, { image: string; alt: string; videoLabel: string }> = {
  "health-nutrition": {
    image: img,
    alt: "Fresh food for a community nutrition activity",
    videoLabel: "Sample health and nutrition video",
  },
  "economic-empowerment": {
    image: heroLivelihoods,
    alt: "Women taking part in a livelihood skills activity",
    videoLabel: "Sample skills training video",
  },
  education: {
    image: heroEducation,
    alt: "Students learning in a classroom",
    videoLabel: "Sample classroom video",
  },
  "research-meal": {
    image: heroEducation,
    alt: "Community learning and feedback session",
    videoLabel: "Sample research and learning video",
  },
  "agriculture-climate-change": {
    image: img,
    alt: "Agricultural produce from a rural community",
    videoLabel: "Sample agriculture video",
  },
  "women-empowerment": {
    image: heroLivelihoods,
    alt: "Women learning practical livelihood skills",
    videoLabel: "Sample women’s empowerment video",
  },
  "food-security-livelihood": {
    image: img,
    alt: "Seasonal produce supporting rural livelihoods",
    videoLabel: "Sample food security video",
  },
  "wash-engineering": {
    image: img,
    alt: "Clean water access in a community setting",
    videoLabel: "Sample WASH video",
  },
  "emergency-response": {
    image: heroLivelihoods,
    alt: "Community members working together",
    videoLabel: "Sample emergency response video",
  },
  protection: {
    image: heroEducation,
    alt: "Inclusive community learning activity",
    videoLabel: "Sample protection video",
  },
};

export const Route = createFileRoute("/programs/")({
  head: () =>
    seo(
      "What We Do",
      "PWSO's thematic areas and technical programs across Afghanistan.",
      "/programs",
    ),
  component: Programs,
});

function Programs() {
  const groups = ["Thematic area", "Technical program"] as const;
  return (
    <>
      <PageHero
        title="What We Do"
        intro="Ten areas of work designed around the needs of women and communities."
        image={img}
        crumbs={[{ label: "What We Do" }]}
      />
      {groups.map((g) => (
        <section key={g} className="container-x py-16">
          <SectionHeading
            eyebrow={g === "Thematic area" ? "Primary" : "Specialized"}
            title={g === "Thematic area" ? "Thematic areas" : "Technical programs"}
          />
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {PROGRAMS.filter((p) => p.kind === g).map((p) => (
              <li key={p.slug}>
                <Link
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="group flex min-h-48 h-full overflow-hidden rounded-xl border border-border border-t-4 border-t-primary bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="relative w-[38%] min-w-28 shrink-0 overflow-hidden sm:w-[36%]">
                    <img
                      src={PROGRAM_MEDIA[p.slug]?.image ?? img}
                      alt={PROGRAM_MEDIA[p.slug]?.alt ?? "PWSO program activity"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-sm bg-primary text-primary-foreground shadow-card">
                      <span className="text-xs font-bold">
                        {String(PROGRAMS.indexOf(p) + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-4">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                        <p.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <h3 className="text-base font-bold leading-tight text-heading group-hover:text-primary">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      About this program{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
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
