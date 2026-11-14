import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { formatUsd, type Project } from "@/data/projects";
import { getProgram } from "@/data/programs";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";

const PROJECT_IMAGES: Record<string, string> = {
  "economic-empowerment": heroLivelihoods,
  education: heroEducation,
  "agriculture-climate-change": heroAgriculture,
  "food-security-livelihood": heroAgriculture,
  "health-nutrition": heroAgriculture,
  "wash-engineering": heroAgriculture,
  "women-empowerment": heroLivelihoods,
};

export function ProjectCard({ p, layout = "grid" }: { p: Project; layout?: "grid" | "list" }) {
  const program = getProgram(p.program);
  const statusNeedsReview = p.needsVerification.some((item) =>
    item.toLowerCase().includes("status"),
  );
  const budgetNeedsReview = p.needsVerification.some((item) =>
    item.toLowerCase().includes("budget"),
  );
  const beneficiaryNeedsReview = p.needsVerification.some((item) =>
    item.toLowerCase().includes("beneficiar"),
  );
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className={`group flex min-h-48 overflow-hidden rounded-xl border border-border border-t-4 border-t-primary bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${layout === "list" ? "flex-col md:flex-row" : "flex-row"}`}
    >
      <div className="relative w-[36%] min-w-28 shrink-0 overflow-hidden">
        <img
          src={PROJECT_IMAGES[p.program] ?? heroLivelihoods}
          alt={`${program?.title ?? "Community"} project activity`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 rounded-sm bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-card">
          {p.year}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span
            className={`rounded-full px-2.5 py-1 ${!statusNeedsReview && p.status === "Ongoing" ? "bg-accent/20 text-heading" : "bg-secondary text-secondary-foreground"}`}
          >
            {statusNeedsReview ? "Status under review" : p.status}
          </span>
          {program && <span className="text-primary">{program.title}</span>}
        </div>
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-heading group-hover:text-primary">
          {p.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {p.overview}
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Province</dt>
            <dd>{p.province}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Year</dt>
            <dd>{p.duration ?? p.year}</dd>
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden />
            <dt className="sr-only">Beneficiaries</dt>
            <dd>{beneficiaryNeedsReview ? "Beneficiary figure under review" : p.beneficiaries}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-xs">
          <span className="truncate text-muted-foreground">
            {p.donor} ·{" "}
            <strong className="text-heading">
              {budgetNeedsReview ? "Budget under review" : formatUsd(p.budgetUsd)}
            </strong>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary">
            View project{" "}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
