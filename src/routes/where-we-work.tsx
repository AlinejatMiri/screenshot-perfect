import { ClientOnly, Link, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
const AfghanistanMap = lazy(() => import("@/components/common/AfghanistanMap"));
import {
  Building2,
  Info,
  Layers,
  MapPin,
  Users,
  ArrowRight,
  CalendarDays,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ORG, ZONES } from "@/data/site";
import { seo } from "@/lib/seo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";

export const Route = createFileRoute("/where-we-work")({
  head: () =>
    seo(
      "Where We Work",
      "PWSO's offices and project locations across Afghanistan.",
      "/where-we-work",
    ),
  component: WhereWeWork,
});

const confirmedProjects = PROJECTS.filter(
  (project) => !project.needsVerification.some((item) => item.toLowerCase().includes("status")),
);
const PROVINCES = [
  ...new Set([...ORG.offices.map((o) => o.city), ...confirmedProjects.map((p) => p.province)]),
];

type ProvinceFeature = {
  properties: { name: string };
  geometry:
    | { type: "Polygon"; coordinates: number[][][] }
    | { type: "MultiPolygon"; coordinates: number[][][][] };
};

function provinceRings(feature: ProvinceFeature): number[][][] {
  return feature.geometry.type === "Polygon"
    ? feature.geometry.coordinates
    : feature.geometry.coordinates.flat();
}

function ProvinceShape({
  feature,
  className = "h-20 w-full",
}: {
  feature: ProvinceFeature;
  className?: string;
}) {
  const points = provinceRings(feature).flat();
  const xs = points.map(([x]) => x!);
  const ys = points.map(([, y]) => y!);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const scale = 88 / Math.max(maxX - minX, maxY - minY);
  const offsetX = (100 - (maxX - minX) * scale) / 2;
  const offsetY = (100 - (maxY - minY) * scale) / 2;
  const paths = provinceRings(feature).map(
    (ring) =>
      ring
        .map(([x, y], index) => {
          const px = offsetX + (x! - minX) * scale;
          const py = offsetY + (maxY - y!) * scale;
          return `${index ? "L" : "M"}${px.toFixed(2)},${py.toFixed(2)}`;
        })
        .join(" ") + " Z",
  );

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${feature.properties.name} province map`}
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill="currentColor"
          fillRule="evenodd"
          stroke="currentColor"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function normalizeProvinceName(name: string) {
  return name === "Daykundi" ? "Daikundi" : name;
}

function ProvinceCards({
  selectedProvince,
  onSelect,
}: {
  selectedProvince: string;
  onSelect: (province: string) => void;
}) {
  const [features, setFeatures] = useState<ProvinceFeature[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/afghanistan-provinces.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load province boundaries");
        return response.json() as Promise<{ features?: ProvinceFeature[] }>;
      })
      .then((geo) => {
        if (!cancelled) setFeatures(geo.features ?? []);
      })
      .catch(() => {
        if (!cancelled) setFeatures([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selected =
    features.find(
      (feature) => normalizeProvinceName(feature.properties.name) === selectedProvince,
    ) ?? null;
  const projectFeatures = features.filter((feature) => {
    const name = normalizeProvinceName(feature.properties.name);
    return confirmedProjects.some(
      (project) =>
        project.province === name &&
        (project.status === "Completed" || project.status === "Ongoing"),
    );
  });
  const selectedName = selected ? normalizeProvinceName(selected.properties.name) : "";
  const office = ORG.offices.find((item) => item.city === selectedName);
  const zone = ZONES.find((item) => item.provinces.includes(selectedName));
  const projects = confirmedProjects.filter((item) => item.province === selectedName);

  return (
    <>
      {!features.length ? (
        <p
          role="status"
          className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground"
        >
          Province cards are loading. If they do not appear, the province boundary data could not be
          loaded.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projectFeatures.map((feature) => {
            const name = normalizeProvinceName(feature.properties.name);
            const provinceOffice = ORG.offices.find((item) => item.city === name);
            const provinceProjects = confirmedProjects.filter((item) => item.province === name);
            const provinceZone = ZONES.find((item) => item.provinces.includes(name));
            return (
              <li key={feature.properties.name}>
                <button
                  type="button"
                  onClick={() => onSelect(name)}
                  className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex h-32 items-center justify-center bg-secondary/50 p-4 text-primary">
                    <ProvinceShape feature={feature} className="h-full w-full" />
                  </span>
                  <span className="block p-5">
                    <span className="block font-display text-lg font-bold text-heading group-hover:text-primary">
                      {name}
                    </span>
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {provinceZone?.name ?? "Afghanistan"}
                    </span>
                    <span className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{provinceOffice?.type ?? "Project location"}</span>
                      <span>
                        {provinceProjects.length} project{provinceProjects.length === 1 ? "" : "s"}
                      </span>
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      View details{" "}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) onSelect("");
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selected && (
            <>
              <div className="flex h-48 items-center justify-center rounded-xl bg-secondary/50 p-6 text-primary sm:h-60">
                <ProvinceShape feature={selected} className="h-full w-full" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedName}</DialogTitle>
                <DialogDescription>
                  {zone?.name ?? "Afghanistan"} · {office?.type ?? "No PWSO office listed"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">PWSO office</p>
                  <p className="mt-1 font-semibold">{office?.type ?? "No office listed"}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">Geographic zone</p>
                  <p className="mt-1 font-semibold">{zone?.name ?? "Not specified"}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">Listed projects</p>
                  <p className="mt-1 font-semibold">{projects.length}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-bold">Project details</h3>
                {projects.length ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((project) => (
                      <ProjectCard key={project.slug} p={project} />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                    No projects are currently listed for this province.
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function WhereWeWork() {
  const [sel, setSel] = useState("");
  const [activeZone, setActiveZone] = useState(0);
  const provinceCount = PROVINCES.length;
  const zone = ZONES[activeZone]!;
  const zoneProjects = confirmedProjects.filter((project) =>
    zone.provinces.includes(project.province),
  );
  const featuredProjects = [
    {
      project: PROJECTS.find(
        (project) => project.slug === "women-unlawful-traditional-practices-2019",
      )!,
      image: heroAgriculture,
    },
    {
      project: PROJECTS.find((project) => project.slug === "access-to-quality-education-2018")!,
      image: heroEducation,
    },
    {
      project: PROJECTS.find((project) => project.slug === "pickles-preparation-marketing-2018")!,
      image: heroLivelihoods,
    },
  ];
  return (
    <>
      <PageHero
        title="Where We Work"
        intro="Our offices and project locations across Afghanistan. Select a province to see related work."
        crumbs={[{ label: "Where We Work" }]}
      />
      <section id="our-reach" className="container-x scroll-mt-52 py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(15rem,0.85fr)_minmax(0,3fr)_minmax(15rem,1.15fr)] lg:items-start xl:gap-8">
          {/* Left column: content + stats */}
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Our Reach</p>
              <h2 className="text-3xl font-extrabold text-heading">Working Across Afghanistan</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                This page maps office locations and project entries currently listed in PWSO’s
                website data.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="inline-flex items-center gap-2 px-2 py-1 w-full">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-heading">{provinceCount}</p>
                  <p className="text-[10px] text-muted-foreground">Provinces</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-2 py-1 w-full">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Layers className="h-3 w-3" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-heading">{ZONES.length}</p>
                  <p className="text-[10px] text-muted-foreground">Geographic Zones</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-2 py-1 w-full">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Users className="h-3 w-3" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-heading">
                    {ORG.offices.length}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Office locations</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1.5 leading-none">
              <Info className="h-4 w-4" aria-hidden="true" /> Hover or click on a province to see
              PWSO's presence and key interventions.
            </p>
          </div>

          {/* Center column: map */}
          <div className="min-w-0">
            <ClientOnly
              fallback={
                <div className="h-[520px] w-full rounded-2xl bg-muted md:h-[620px] xl:h-[720px]" />
              }
            >
              <Suspense
                fallback={
                  <div className="h-[520px] w-full rounded-2xl bg-muted md:h-[620px] xl:h-[720px]" />
                }
              >
                <AfghanistanMap onSelect={setSel} zones={ZONES} />
              </Suspense>
            </ClientOnly>
          </div>

          {/* Right column: zone cards */}
          <div className="space-y-3">
            <p className="eyebrow mb-2">Afghanistan Zones</p>
            {ZONES.map((zone) => {
              return (
                <div
                  key={zone.name}
                  className="rounded-lg border bg-card p-1.5 hover:border-primary/40 transition text-sm"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    ></span>
                    <h3 className="font-semibold text-heading text-[10px]">{zone.name}</h3>
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-tight">
                    {zone.provinces.join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="provinces" className="scroll-mt-52 border-y border-border bg-card py-16">
        <div className="container-x">
          <p className="eyebrow mb-2">Provinces Where We Work</p>
          <h2 className="mb-2 text-2xl font-extrabold">Explore all provinces</h2>
          <p className="mb-7 max-w-3xl text-sm text-muted-foreground">
            Select a province card to view its location, PWSO office presence, geographic zone and
            listed projects.
          </p>
          <ProvinceCards selectedProvince={sel} onSelect={setSel} />
        </div>
      </section>

      <section id="regional-impact" className="container-x scroll-mt-52 py-16">
        <p className="eyebrow mb-2">PWSO Regional Impact</p>
        <h2 className="text-3xl font-extrabold">
          Explore our regional presence{" "}
          <span className="ml-3 inline-block h-0.5 w-12 align-middle bg-accent" />
        </h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Select a geographic zone to explore the provinces, offices and projects currently listed
          for that area.
        </p>
        <div className="mt-8 grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <ul className="space-y-2" aria-label="Select a region">
            {ZONES.map((item, index) => (
              <li key={item.name}>
                <button
                  type="button"
                  aria-pressed={activeZone === index}
                  onClick={() => setActiveZone(index)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeZone === index ? "border-primary bg-primary text-primary-foreground shadow-card" : "border-border bg-card text-heading hover:border-primary/50"}`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <article className="grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-card md:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.2fr)] md:p-7">
            <div>
              <p className="eyebrow mb-3">Region overview</p>
              <div className="flex min-h-40 flex-wrap content-center justify-center gap-2 rounded-xl bg-secondary/60 p-5">
                {zone.provinces.map((province) => (
                  <span
                    key={province}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: zone.color }}
                  >
                    {province}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-heading">
                {zone.provinces.length} provinces in {zone.name}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">{zone.name}</p>
              <h3 className="text-2xl font-extrabold">Community presence and listed work</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                PWSO’s listed presence in this zone includes{" "}
                {ORG.offices
                  .filter((office) => zone.provinces.includes(office.city))
                  .map((office) => `${office.city} (${office.type.toLowerCase()})`)
                  .join(", ") || "no office locations currently listed"}
                .
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="font-display text-2xl font-extrabold text-primary">
                    {zoneProjects.length}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Projects listed</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="font-display text-2xl font-extrabold text-primary">
                    {ORG.offices.filter((office) => zone.provinces.includes(office.city)).length}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Offices listed</p>
                </div>
              </div>
              {zoneProjects.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {zoneProjects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        {project.title}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </div>
      </section>

      <section
        id="featured-stories"
        className="scroll-mt-52 border-t border-border bg-secondary/40 py-16"
      >
        <div className="container-x grid gap-8 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.8fr)] lg:gap-10">
          <div>
            <p className="eyebrow mb-2">Our presence</p>
            <h2 className="text-2xl font-extrabold">Building local partnerships</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Office and project entries currently listed on this website are shown below.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                "Community participation",
                "Transparency and accountability",
                "Equality and justice",
                "Sustainable livelihoods",
              ].map((value) => (
                <li key={value} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-heading shadow-card">
                {provinceCount} locations listed
              </span>
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-heading shadow-card">
                {confirmedProjects.length} projects listed
              </span>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Featured project stories</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map(({ project, image }) => (
                <article
                  key={project.slug}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={image}
                      alt="Illustrative image; not confirmed photography from this project"
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                        {project.year} · {project.province}
                      </span>
                      <h3 className="mt-3 font-bold leading-snug text-heading group-hover:text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {project.overview}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Explore project{" "}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact-us" className="scroll-mt-52 bg-background py-14">
        <div className="container-x">
          <div className="relative isolate overflow-hidden rounded-3xl bg-band px-6 py-8 text-navy-foreground shadow-lift sm:px-9 sm:py-10 lg:px-12">
            <div
              className="absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full border-[30px] border-sky/10"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 left-[38%] -z-10 h-44 w-44 rounded-full border-[18px] border-accent/10"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-foreground/10 text-accent ring-1 ring-navy-foreground/15 sm:h-14 sm:w-14">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="max-w-2xl">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    Growing our reach
                  </p>
                  <h2 className="text-2xl font-extrabold text-navy-foreground sm:text-3xl">
                    Didn’t see your province?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-foreground/80 sm:text-base">
                    Contact PWSO for additional information about office locations and project
                    records.
                  </p>
                </div>
              </div>
              <Button asChild variant="accent" size="lg" className="shrink-0 sm:ml-4">
                <Link to="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
