import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { lazy, Suspense } from "react";
import { ArrowRight, Calendar, FolderCheck, Map, MapPin, Pause, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PROGRAMS } from "@/data/programs";
import { PROJECTS } from "@/data/projects";
import { NEWS } from "@/data/news";
import { ORG, ZONES } from "@/data/site";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroAgriculture from "@/assets/hero-agriculture.jpg";

const THEMATIC_IMAGES: Record<string, { src: string; alt: string }> = {
  "health-nutrition": {
    src: heroAgriculture,
    alt: "Fresh vegetables prepared for a community nutrition activity",
  },
  "economic-empowerment": {
    src: heroLivelihoods,
    alt: "Women learning food processing and livelihood skills",
  },
  education: {
    src: heroEducation,
    alt: "Students learning in a classroom",
  },
  "research-meal": {
    src: heroEducation,
    alt: "A classroom learning activity that programs can monitor and evaluate",
  },
  "agriculture-climate-change": {
    src: heroAgriculture,
    alt: "A woman holding fresh produce in a rural field",
  },
};

const AfghanistanMap = lazy(() => import("@/components/common/AfghanistanMap"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PWSO — Empowering Women. Strengthening Communities." },
      {
        name: "description",
        content:
          "Poor Women Support Organization is a national NGO in Afghanistan working on livelihoods, education, health, agriculture and protection since 2017.",
      },
      { property: "og:title", content: "PWSO — Partnership for Change" },
      {
        property: "og:description",
        content:
          "Empowering women, strengthening communities and creating sustainable change across Afghanistan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.pwsongo.org/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://www.pwsongo.org/" }],
  }),
  component: Home,
});

const SLIDES = [
  {
    img: heroLivelihoods,
    kicker: "Economic Empowerment",
    alt: "Women preparing preserved vegetables at a training workshop",
  },
  {
    img: heroEducation,
    kicker: "Education",
    alt: "Girls reading in a classroom with their teacher",
  },
  {
    img: heroAgriculture,
    kicker: "Agriculture & Climate",
    alt: "A woman farmer holding harvested vegetables in a terraced field",
  },
];

const PARTNERS = [
  ...[...new Set(PROJECTS.map((project) => project.donor))].map((name) => ({
    name,
    mark: name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 5)
      .toUpperCase(),
    style: "font-display font-extrabold tracking-tight text-primary",
  })),
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section
      className="relative isolate overflow-hidden bg-navy text-navy-foreground"
      aria-roledescription="carousel"
    >
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
        <p
          key={i}
          className="animate-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-navy-foreground/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent"
        >
          {SLIDES[i]?.kicker}
        </p>
        <h1 className="max-w-3xl break-words text-3xl font-extrabold leading-[1.08] text-navy-foreground sm:text-4xl lg:text-6xl">
          Empowering Women. Strengthening Communities.{" "}
          <span className="text-accent">Creating Sustainable Change.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-90">
          A national, non-profit organization working alongside Afghan women and communities since{" "}
          {ORG.established}. {ORG.tagline}.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <Link to="/programs">
              Explore our work <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="heroGhost" size="lg">
            <Link to="/partners/$section" params={{ section: "become-a-partner" }}>
              Partner with us
            </Link>
          </Button>
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
  const stats = [
    { v: ORG.established, l: "Established", icon: Calendar },
    { v: "4203", l: "Ministry of Economy license", icon: FolderCheck },
    { v: "Afghanistan", l: "National NGO", icon: MapPin },
  ];
  return (
    <section aria-label="PWSO organization details" className="border-b border-border bg-card">
      <div className="container-x grid grid-cols-1 py-4 sm:grid-cols-3 md:py-6">
        {stats.map((s) => (
          <div
            key={s.l}
            className="flex min-w-0 flex-col items-center border-border px-3 py-5 text-center sm:border-r sm:last:border-r-0"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20">
              <s.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="break-words font-display text-2xl font-extrabold leading-tight text-heading md:text-3xl">
              {s.v}
            </p>
            <span className="mt-4 h-0.5 w-7 bg-accent" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const CAROUSEL_NEWS = [...NEWS, ...NEWS];

function LatestNews() {
  const [paused, setPaused] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || !emblaApi || reducedMotion.current || NEWS.length < 2) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 4500);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused]);

  if (NEWS.length === 0) {
    return (
      <section className="container-x py-24" aria-label="Latest news from PWSO">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="News & events" title="Latest from PWSO" />
          <Button asChild variant="outline" className="mb-10">
            <Link to="/news">
              News & events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-2xl border border-dashed border-border bg-muted/50 px-6 py-10 text-center">
          <p className="font-semibold text-heading">
            No approved news or event updates are published yet.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse verified project records while we prepare public updates.
          </p>
          <Link
            to="/projects"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Explore projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-24" aria-label="Latest news from PWSO">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="News & events" title="Latest from PWSO" />
        <div className="mb-10 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            aria-label={paused ? "Resume news carousel" : "Pause news carousel"}
          >
            {paused ? <Play className="mr-1 h-4 w-4" /> : <Pause className="mr-1 h-4 w-4" />}
            {paused ? "Play" : "Pause"}
          </Button>
          <Button asChild variant="link" className="px-1">
            <Link to="/news">
              All news <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Latest news and events"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <ul className="-ml-4 flex touch-pan-y py-2">
            {CAROUSEL_NEWS.map((item, index) => (
              <li
                key={`${index}-${item.slug}`}
                aria-hidden={index >= NEWS.length}
                className="min-w-0 shrink-0 basis-[min(78vw,26rem)] pl-4"
              >
                <article className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <Link
                    to="/news/$slug"
                    params={{ slug: item.slug }}
                    tabIndex={index >= NEWS.length ? -1 : undefined}
                    className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                      width={960}
                      height={540}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-secondary-foreground">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {new Date(item.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold leading-snug text-heading group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Read more{" "}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const JOURNEY = [
  {
    year: "2017",
    phase: "FOUNDATION",
    title: "Rooted in Afghanistan. Built to serve.",
    body: "Poor Women Support Organization was established as a national, non-governmental, non-profit organization and registered with the Ministry of Economy.",
    detail: ORG.license,
    highlight: "PWSO was established and registered with the Ministry of Economy.",
  },
  {
    year: "2018",
    phase: "FIRST PROGRAMS",
    title: "Building skills and access to education.",
    body: "PWSO supported women's food processing training in Daikundi and an education program in Badakhshan with Jesuit Refugee Service.",
    detail: "Livelihood skills · Education",
    highlight: "Women's food processing training in Daikundi · Education program in Badakhshan.",
  },
  {
    year: "2019",
    phase: "WOMEN'S RIGHTS",
    title: "Working with communities to advance women's rights.",
    body: "PWSO delivered awareness work on unlawful traditional practices affecting women in Kunduz with the Aga Khan Foundation.",
    detail: "Kunduz · Community awareness",
    highlight: "Awareness project on unlawful traditional practices affecting women.",
  },
  {
    year: "2025",
    phase: "LIVELIHOODS",
    title: "Supporting women's skills and market opportunities.",
    body: "PWSO's work in Kunduz included capacity building for women in processing seasonal fruits and vegetables and marketing.",
    detail: "Kunduz · Food processing and marketing",
    highlight: "Capacity building in processing seasonal fruits and vegetables and marketing.",
  },
  {
    year: "TODAY",
    phase: "PARTNERSHIP FOR CHANGE",
    title: "Working across sectors with Afghan communities.",
    body: "PWSO works with women, families and communities across livelihoods, education, health, agriculture and protection.",
    detail: "Participation · Accountability · Sustainability",
    highlight: "PWSO's tagline: Partnership for Change.",
  },
];

function JourneyStory() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = JOURNEY[active]!;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % JOURNEY.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="container-x py-20"
      aria-label="Our journey and story"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="relative isolate overflow-hidden bg-band px-6 py-12 text-navy-foreground md:px-10 md:py-14">
          <div
            className="absolute -right-16 -top-40 -z-10 h-80 w-80 rounded-full border-[28px] border-sky/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 left-[55%] -z-10 h-44 w-44 rounded-full border-[18px] border-accent/10"
            aria-hidden="true"
          />
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <Map className="h-4 w-4" aria-hidden="true" />
              Our Journey · Our Story
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-navy-foreground sm:text-4xl">
              Rooted in Afghanistan.
              <br />
              <span className="text-accent">Building opportunity together.</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-foreground/85">
              From our establishment in {ORG.established}, PWSO has worked in partnership with women
              and communities to build skills, strengthen livelihoods and widen access to
              opportunity.
            </p>
            <Button asChild variant="heroGhost" className="mt-6">
              <Link to="/about/$section" params={{ section: "history" }}>
                More about our history <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-b border-border bg-card px-4 py-3 md:px-8">
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            role="group"
            aria-label="PWSO milestones"
          >
            {JOURNEY.map((step, index) => (
              <button
                key={step.year}
                type="button"
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                className={`rounded-lg border px-3 py-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === index ? "border-primary bg-primary text-primary-foreground shadow-card" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"}`}
              >
                <span className="block text-xs">{step.year}</span>
                <span className="mt-1 block text-[0.65rem] font-bold tracking-wide">
                  {step.phase}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid gap-8 px-6 py-9 md:grid-cols-[8rem_minmax(0,1fr)] md:px-10 md:py-10"
          aria-live="polite"
        >
          <div>
            <p className="font-display text-5xl font-extrabold leading-none text-primary">
              {item.year}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {item.phase}
            </p>
            <span className="accent-rule mt-4" aria-hidden="true" />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
            <p className="mt-5 text-xs text-muted-foreground">
              Milestone {active + 1} / {JOURNEY.length}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold leading-tight">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
            <p className="mt-5 rounded-lg border-l-4 border-accent bg-secondary/60 px-4 py-3 text-sm font-medium leading-relaxed text-heading">
              <span className="font-bold">Milestone:</span> {item.highlight}
            </p>
          </div>
        </div>

        <div className="grid gap-8 border-t border-border bg-secondary/50 px-6 py-9 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center md:px-10 md:py-10">
          <div className="flex justify-center">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-primary border-r-accent border-b-sky border-l-secondary bg-card text-center shadow-card">
              <span className="max-w-24 font-display text-lg font-extrabold leading-tight text-heading">
                PWSO
                <br />
                <span className="text-primary">Partnership for Change</span>
              </span>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-2">Our values in action</p>
            <h3 className="text-2xl font-extrabold">
              Working with communities for lasting change.
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Our approach centers community participation, accountability and sustainable
              opportunity for women and marginalized communities.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Equality and justice",
                "Participation",
                "Transparency and accountability",
                "Sustainability",
              ].map((value) => (
                <li
                  key={value}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-heading shadow-card"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-band px-6 py-7 text-center text-lg font-bold text-navy-foreground md:px-10">
          Rooted in Afghan communities.{" "}
          <span className="text-accent">Working in partnership for change.</span>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const thematic = PROGRAMS.filter((p) => p.kind === "Thematic area");
  const [selectedProvince, setSelectedProvince] = useState("");
  return (
    <>
      <Hero />
      <Stats />

      <section className="container-x grid gap-12 py-24 lg:grid-cols-2 lg:items-start">
        <div className="grid gap-6">
          <SectionHeading
            eyebrow="Who we are"
            title="A national NGO rooted in Afghan communities"
          />
          <p className="text-lg leading-relaxed">
            {ORG.name} is a national, non-governmental, non-profit organization registered with the
            Ministry of Economy ({ORG.license}). We work with poor and marginalized women, their
            families and communities on livelihoods, education, health, agriculture and protection.
          </p>
          <Button asChild variant="link" className="mt-4 px-0 text-base">
            <Link to="/about/$section" params={{ section: "who-we-are" }}>
              More about PWSO <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="min-w-0">
          {selectedProvince && (
            <p className="mb-2 text-sm font-semibold text-primary" aria-live="polite">
              Selected province: {selectedProvince}
            </p>
          )}
          <ClientOnly
            fallback={<div className="h-[420px] w-full animate-pulse rounded-2xl bg-muted" />}
          >
            <Suspense
              fallback={<div className="h-[420px] w-full animate-pulse rounded-2xl bg-muted" />}
            >
              <AfghanistanMap onSelect={setSelectedProvince} zones={ZONES} />
            </Suspense>
          </ClientOnly>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="What we do"
              title="Five thematic areas, five technical programs"
            />
            <Button asChild variant="outline" className="mb-10">
              <Link to="/programs">All programs</Link>
            </Button>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {thematic.map((p) => (
              <Link
                key={p.slug}
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="group min-w-0 bg-card transition-colors hover:bg-navy"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={THEMATIC_IMAGES[p.slug]?.src}
                    alt={THEMATIC_IMAGES[p.slug]?.alt ?? "PWSO program activity"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 xl:p-6">
                  <p.icon className="h-7 w-7 text-accent" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold group-hover:text-navy-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground group-hover:text-navy-foreground/80">
                    {p.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Projects"
            title="Our project portfolio"
            intro="Ongoing and completed projects with our donors and partners."
          />
          <Button asChild variant="outline" className="mb-10">
            <Link to="/projects">View all projects</Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[...PROJECTS]
            .sort((a, b) => b.year - a.year)
            .map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
        </div>
      </section>

      <JourneyStory />
      <LatestNews />

      <section className="border-y border-border bg-card py-14">
        <div className="container-x">
          <p className="eyebrow mb-8 text-center">Donors and partners we have worked with</p>
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="group relative">
                <div
                  title={partner.name}
                  aria-label={partner.name}
                  tabIndex={0}
                  className="flex h-20 min-w-36 items-center justify-center rounded-xl border border-border bg-card px-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className={`text-2xl ${partner.style}`} aria-hidden="true">
                    {partner.mark}
                  </span>
                </div>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-navy-foreground opacity-0 shadow-card transition group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  {partner.name}
                </span>
                <span className="sr-only">{partner.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
