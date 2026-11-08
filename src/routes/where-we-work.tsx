import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, MapPin } from "lucide-react";
import { PageHero, Todo } from "@/components/common/PageHero";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ORG } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/where-we-work")({
  head: () => seo("Where We Work", "PWSO's offices and project locations across Afghanistan."),
  component: WhereWeWork,
});

const PROVINCES = [...new Set([...ORG.offices.map((o) => o.city), ...PROJECTS.map((p) => p.province)])];

function WhereWeWork() {
  const [sel, setSel] = useState(PROVINCES[0]);
  const office = ORG.offices.find((o) => o.city === sel);
  const projects = PROJECTS.filter((p) => p.province === sel);
  return (
    <>
      <PageHero title="Where We Work" intro="Our offices and project locations across Afghanistan. Select a province to see related work." crumbs={[{ label: "Where We Work" }]} />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-[20rem_1fr]">
        <div>
          <p className="eyebrow mb-4">Provinces</p>
          <ul className="space-y-2" role="listbox" aria-label="Select a province">
            {PROVINCES.map((p) => {
              const o = ORG.offices.find((x) => x.city === p);
              return (
                <li key={p}>
                  <button role="option" aria-selected={sel === p} onClick={() => setSel(p)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${sel === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
                    {o ? <Building2 className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
                    <span><span className="block font-semibold">{p}</span><span className="text-xs opacity-75">{o ? o.type : "Project location"}</span></span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6"><Todo>Interactive Afghanistan map with verified office coordinates</Todo></div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold">{sel}</h2>
          <p className="mt-2 text-muted-foreground">{office ? `${office.type} · ` : ""}{projects.length} project{projects.length === 1 ? "" : "s"} listed</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.length ? projects.map((p) => <ProjectCard key={p.slug} p={p} />) : <p className="text-muted-foreground">Organizational coordination and office activities. No projects listed yet for this province.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
