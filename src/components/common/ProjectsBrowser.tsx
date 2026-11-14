import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { PROGRAMS } from "@/data/programs";
import { ProjectCard } from "@/components/cards/ProjectCard";

export function filterProjects(
  list: Project[],
  f: { q: string; program: string; province: string; donor: string; year: string },
) {
  const q = f.q.trim().toLowerCase();
  return list.filter(
    (p) =>
      (!q || p.title.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q)) &&
      (!f.program || p.program === f.program) &&
      (!f.province || p.province === f.province) &&
      (!f.donor || p.donor === f.donor) &&
      (!f.year || String(p.year) === f.year),
  );
}

const uniq = (xs: (string | number)[]) => [...new Set(xs.map(String))].sort();

export function ProjectsBrowser({ status }: { status?: Project["status"] }) {
  const base = status
    ? PROJECTS.filter(
        (p) =>
          p.status === status &&
          !p.needsVerification.some((item) => item.toLowerCase().includes("status")),
      )
    : PROJECTS;
  const [f, setF] = useState({ q: "", program: "", province: "", donor: "", year: "" });
  const [sort, setSort] = useState<"new" | "old">("new");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const results = useMemo(
    () =>
      filterProjects(base, f).sort((a, b) => (sort === "new" ? b.year - a.year : a.year - b.year)),
    [base, f, sort],
  );
  const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
  const visibleResults = results.slice((page - 1) * pageSize, page * pageSize);
  const sel = "h-10 min-w-0 w-full rounded-lg border border-input bg-card px-3 text-sm";
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => {
    setF({ ...f, [k]: e.target.value });
    setPage(1);
  };
  return (
    <div>
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)] gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <label className="relative min-w-0 sm:col-span-2 xl:col-span-2">
          <span className="sr-only">Search projects</span>
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            value={f.q}
            onChange={set("q")}
            placeholder="Search projects"
            className={`${sel} w-full pl-9`}
          />
        </label>
        <select
          aria-label="Thematic area"
          value={f.program}
          onChange={set("program")}
          className={sel}
        >
          <option value="">All areas</option>
          {PROGRAMS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        <select aria-label="Province" value={f.province} onChange={set("province")} className={sel}>
          <option value="">All provinces</option>
          {uniq(PROJECTS.map((p) => p.province)).map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select aria-label="Donor" value={f.donor} onChange={set("donor")} className={sel}>
          <option value="">All donors</option>
          {uniq(PROJECTS.map((p) => p.donor)).map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select aria-label="Year" value={f.year} onChange={set("year")} className={sel}>
          <option value="">All years</option>
          {uniq(PROJECTS.map((p) => p.year)).map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 text-sm">
        <p role="status">
          {results.length} project{results.length === 1 ? "" : "s"}
        </p>
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <select
            aria-label="Sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as "new" | "old")}
            className={sel}
          >
            <option value="new">Newest first</option>
            <option value="old">Oldest first</option>
          </select>
          <button
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className={`rounded-lg p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className={`rounded-lg p-2 ${view === "list" ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
      {results.length ? (
        <div className={view === "grid" ? "grid gap-5 md:grid-cols-2" : "space-y-4"}>
          {visibleResults.map((p) => (
            <ProjectCard key={p.slug} p={p} layout={view} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No projects match these filters.
        </p>
      )}
      {pageCount > 1 && (
        <nav aria-label="Project pages" className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((n) => Math.max(1, n - 1))}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span aria-live="polite" className="text-sm text-muted-foreground">
            Page {page} of {pageCount}
          </span>
          <button
            type="button"
            disabled={page === pageCount}
            onClick={() => setPage((n) => Math.min(pageCount, n + 1))}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
