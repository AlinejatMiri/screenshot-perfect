import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Building2, Calendar, FileText, FolderCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, Todo } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PROGRAMS } from "@/data/programs";
import { PROJECTS } from "@/data/projects";
import { NEWS } from "@/data/news";
import { ORG } from "@/data/site";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroAgriculture from "@/assets/hero-agriculture.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PWSO — Empowering Women. Strengthening Communities." },
      { name: "description", content: "Poor Women Support Organization is a national NGO in Afghanistan working on livelihoods, education, health, agriculture and protection since 2017." },
      { property: "og:title", content: "PWSO — Partnership for Change" },
      { property: "og:description", content: "Empowering women, strengthening communities and creating sustainable change across Afghanistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const SLIDES = [
  { img: heroLivelihoods, kicker: "Economic Empowerment", alt: "Women preparing preserved vegetables at a training workshop" },
  { img: heroEducation, kicker: "Education", alt: "Girls reading in a classroom with their teacher" },
  { img: heroAgriculture, kicker: "Agriculture & Climate", alt: "A woman farmer holding harvested vegetables in a terraced field" },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground" aria-roledescription="carousel">
      {SLIDES.map((s, idx) => (
        <img
          key={s.kicker}
          src={s.img}
          alt={idx === i ? s.alt : ""}
          width={1920}
          height={1088}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-x flex min-h-[520px] flex-col justify-center py-12 sm:min-h-[560px] sm:py-16 lg:min-h-[640px] lg:py-20">
        <p key={i} className="animate-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-navy-foreground/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent">
          {SLIDES[i]?.kicker}
        </p>
        <h1 className="max-w-3xl break-words text-3xl font-extrabold leading-[1.08] text-navy-foreground sm:text-4xl lg:text-6xl">
          Empowering Women. Strengthening Communities. <span className="text-accent">Creating Sustainable Change.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-90">
          A national, non-profit organization working alongside Afghan women and communities since {ORG.established}. {ORG.tagline}.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg"><Link to="/programs">Explore our work <ArrowRight /></Link></Button>
          <Button asChild variant="heroGhost" size="lg"><Link to="/partners/$section" params={{ section: "become-a-partner" }}>Partner with us</Link></Button>
        </div>
        <div className="mt-8 flex gap-2 lg:mt-14" role="tablist" aria-label="Slides">
          {SLIDES.map((s, idx) => (
            <button
              key={s.kicker}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Show slide ${idx + 1}: ${s.kicker}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-12 bg-accent" : "w-6 bg-navy-foreground/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const totalWomen = 25 + 250;
  const stats = [
    { v: ORG.established, l: "Year established", icon: Calendar },
    { v: PROJECTS.length, l: "Projects in portfolio", icon: FolderCheck },
    { v: new Set(PROJECTS.map((p) => p.province)).size, l: "Provinces reached", icon: MapPin },
    { v: ORG.offices.length, l: "Offices", icon: Building2 },
  ];
  return (
    <section aria-label="PWSO key numbers" className="border-b border-border bg-card">
      <div className="container-x grid grid-cols-2 py-5 md:grid-cols-4 md:py-8">
        {stats.map((s) => (
          <div key={s.l} className="flex min-w-0 flex-col items-center border-border px-3 py-6 text-center odd:border-r md:border-r md:last:border-r-0">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="font-display text-4xl font-extrabold leading-none text-heading md:text-5xl">{s.v}</p>
            <span className="mt-4 h-0.5 w-7 bg-accent" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
      <p className="sr-only">{totalWomen} women supported through livelihood projects listed.</p>
    </section>
  );
}

function Home() {
  const thematic = PROGRAMS.filter((p) => p.kind === "Thematic area");
  return (
    <>
      <Hero />
      <Stats />

      <section className="container-x grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Who we are" title="A national NGO rooted in Afghan communities" />
          <p className="text-lg leading-relaxed">
            {ORG.name} is a national, non-governmental, non-profit organization registered with the Ministry of Economy ({ORG.license}). We work with poor and marginalized women, their families and communities on livelihoods, education, health, agriculture and protection.
          </p>
          <Button asChild variant="link" className="mt-4 px-0 text-base"><Link to="/about/$section" params={{ section: "who-we-are" }}>More about PWSO <ArrowRight /></Link></Button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {ORG.offices.map((o) => (
            <li key={o.city} className="rounded-2xl bg-secondary p-6">
              <Building2 className="h-6 w-6 text-primary" aria-hidden />
              <p className="mt-4 font-display text-lg font-bold text-heading">{o.city}</p>
              <p className="text-sm text-muted-foreground">{o.type}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="What we do" title="Five thematic areas, five technical programs" />
            <Button asChild variant="outline" className="mb-10"><Link to="/programs">All programs</Link></Button>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {thematic.map((p) => (
              <Link key={p.slug} to="/programs/$slug" params={{ slug: p.slug }} className="group min-w-0 bg-card p-5 transition hover:bg-navy xl:p-7">
                <p.icon className="h-8 w-8 text-accent" aria-hidden />
                <h3 className="mt-6 text-lg font-bold group-hover:text-navy-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground group-hover:text-navy-foreground/80">{p.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Projects" title="Our project portfolio" intro="Ongoing and completed projects with our donors and partners." />
          <Button asChild variant="outline" className="mb-10"><Link to="/projects">View all projects</Link></Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[...PROJECTS].sort((a, b) => b.year - a.year).map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="bg-band py-24 text-navy-foreground">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Where we work</p>
            <h2 className="text-3xl font-extrabold text-navy-foreground md:text-4xl">From Kabul to Badakhshan, Kunduz and Daikundi</h2>
            <p className="mt-4 max-w-lg opacity-85">Our offices and projects reach communities in the north, centre and northeast of Afghanistan.</p>
            <Button asChild variant="accent" className="mt-8"><Link to="/where-we-work">Explore coverage</Link></Button>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {["Kabul", "Badakhshan", "Kunduz", "Daikundi"].map((prov) => {
              const n = PROJECTS.filter((p) => p.province === prov).length;
              const office = ORG.offices.find((o) => o.city === prov);
              return (
                <li key={prov} className="min-w-0 rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-4 sm:p-6">
                  <MapPin className="h-5 w-5 text-accent" aria-hidden />
                  <p className="mt-3 break-words font-display text-base font-bold sm:text-xl">{prov}</p>
                  <p className="text-sm opacity-75">{office ? office.type : "Project location"}{n ? ` · ${n} project${n > 1 ? "s" : ""}` : ""}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl bg-secondary p-10">
          <p className="eyebrow mb-3">Leadership message</p>
          <blockquote className="font-display text-2xl font-bold leading-snug text-heading">
            "Lasting change happens when women have the skills, voice and opportunity to shape their own futures."
          </blockquote>
          <div className="mt-6"><Todo>Executive Director name and approved message</Todo></div>
        </div>
        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <SectionHeading eyebrow="News & events" title="Latest from PWSO" />
            <Link to="/news" className="mb-10 text-sm font-semibold text-primary hover:underline">All news</Link>
          </div>
          <ul className="divide-y divide-border">
            {NEWS.map((n) => (
              <li key={n.slug}>
                <Link to="/news/$slug" params={{ slug: n.slug }} className="group grid min-w-0 gap-2 py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5 shrink-0" />{new Date(n.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
                  <span className="min-w-0">
                    <span className="text-xs font-semibold text-accent-foreground">{n.category}</span>
                    <span className="block font-semibold text-heading group-hover:text-primary">{n.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/resources/$section" params={{ section: "publications" }} className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card hover:border-primary">
            <FileText className="h-8 w-8 text-primary" aria-hidden />
            <span><span className="block font-bold text-heading">PWSO Profile 2026</span><span className="text-sm text-muted-foreground">Organizational profile — coming soon</span></span>
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-card py-14">
        <div className="container-x">
          <p className="eyebrow mb-6 text-center">Donors and partners we have worked with</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 font-display text-lg font-bold text-muted-foreground">
            {["Aga Khan Foundation", "Jesuit Refugee Service", "FAO", "Azar Afrang (AALCC)"].map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
