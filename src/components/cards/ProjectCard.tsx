import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { formatUsd, type Project } from "@/data/projects";
import { getProgram } from "@/data/programs";

export function ProjectCard({ p, layout = "grid" }: { p: Project; layout?: "grid" | "list" }) {
  const program = getProgram(p.program);
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className={`group flex rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${layout === "list" ? "flex-col gap-4 md:flex-row md:items-center" : "flex-col"}`}
    >
      <div className="flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className={`rounded-full px-2.5 py-1 ${p.status === "Ongoing" ? "bg-accent/20 text-heading" : "bg-secondary text-secondary-foreground"}`}>{p.status}</span>
          {program && <span className="text-primary">{program.title}</span>}
        </div>
        <h3 className="text-lg font-bold leading-snug group-hover:text-primary">{p.title}</h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden /><dt className="sr-only">Province</dt><dd>{p.province}</dd></div>
          <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden /><dt className="sr-only">Year</dt><dd>{p.year}</dd></div>
          <div className="col-span-2 flex items-center gap-1.5"><Users className="h-4 w-4" aria-hidden /><dt className="sr-only">Beneficiaries</dt><dd>{p.beneficiaries}</dd></div>
        </dl>
      </div>
      <div className={`flex items-center justify-between border-border text-sm ${layout === "list" ? "md:w-56 md:flex-col md:items-end md:gap-2" : "mt-5 border-t pt-4"}`}>
        <span><span className="text-muted-foreground">{p.donor}</span> · <strong className="text-heading">{formatUsd(p.budgetUsd)}</strong></span>
        <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" aria-hidden />
      </div>
    </Link>
  );
}
