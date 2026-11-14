import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, FileText, MapPin, Search } from "lucide-react";
import { SAMPLE_OPPORTUNITIES, SAMPLE_RESOURCES } from "@/data/sample-content";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";

const RESOURCE_TYPES: Record<string, string> = {
  reports: "Reports",
  research: "Research",
  publications: "Publications",
  policies: "Policy Documents",
  profiles: "Profiles",
  gallery: "Gallery",
  videos: "Videos",
  "success-stories": "Success Stories",
};

const RESOURCE_IMAGES: Record<string, string> = {
  reports: heroLivelihoods,
  research: heroAgriculture,
  publications: heroEducation,
  policies: heroEducation,
  profiles: heroLivelihoods,
  gallery: heroLivelihoods,
  videos: heroEducation,
  "success-stories": heroLivelihoods,
};

export function ResourceLibrary({ category }: { category?: string }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(category ?? "");
  const types = category ? { [category]: RESOURCE_TYPES[category] ?? category } : RESOURCE_TYPES;
  const selectedType = type ? (RESOURCE_TYPES[type] ?? type) : "";
  const items = useMemo(
    () =>
      SAMPLE_RESOURCES.filter(
        (item) =>
          (!type || item.type === type) &&
          `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, type],
  );
  return (
    <section
      aria-labelledby="library-heading"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-7"
    >
      <h2 id="library-heading" className="text-xl font-bold text-heading">
        PWSO resource library
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sample entries demonstrate how approved documents will appear. Replace these entries before
        publishing.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
        <label className="relative">
          <span className="sr-only">Search resources</span>
          <Search aria-hidden className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources"
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm"
          />
        </label>
        <label>
          <span className="sr-only">Resource type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!!category}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="">All resource types</option>
            {Object.entries(types).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {items.length ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="group flex min-h-48 overflow-hidden rounded-xl border border-border border-t-4 border-t-primary bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="relative w-[36%] min-w-28 shrink-0 overflow-hidden">
                <img
                  src={RESOURCE_IMAGES[item.type] ?? heroLivelihoods}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-2 top-2 rounded-sm bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-card">
                  {RESOURCE_TYPES[item.type]}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Sample entry
                </p>
                <h3 className="mt-2 line-clamp-2 font-bold leading-snug text-heading group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-auto flex items-center gap-2 pt-3 text-xs font-semibold text-muted-foreground">
                  <FileText className="h-4 w-4 text-accent" />
                  {item.format} ·{" "}
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="mt-5 rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground"
        >
          No sample {selectedType ? selectedType.toLowerCase() : "resources"} match “{query.trim()}
          ”.
        </p>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: "Open" | "Closed" }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
        status === "Open" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString("en-GB", opts);
}

const TABLE_HEAD = "bg-secondary/60 text-heading";
const TABLE_CELL = "px-5 py-4";

function ReadMoreLink({ to, label = "Read more" }: { to: string; label?: string }) {
  return (
    <Link
      to="/get-involved/$section"
      params={{ section: to }}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
    >
      {label} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function OpportunityTables() {
  const jobs = SAMPLE_OPPORTUNITIES.filter((item) => item.type === "Job Announcement");
  const tenders = SAMPLE_OPPORTUNITIES.filter((item) => item.type === "RFP" || item.type === "RFQ");
  const events = SAMPLE_OPPORTUNITIES.filter((item) => item.type === "Events");
  const trainings = SAMPLE_OPPORTUNITIES.filter((item) => item.type === "Training");
  return (
    <section aria-labelledby="opportunities-heading" className="mb-8">
      <h2 id="opportunities-heading" className="text-xl font-bold text-heading">
        Published opportunities
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sample notices show the intended layout. Replace them with approved opportunities before
        publishing.
      </p>

      <div className="mt-6 space-y-10">
        <section aria-labelledby="jobs-table-title">
          <p className="eyebrow mb-2">Vacancies</p>
          <h3 id="jobs-table-title" className="text-lg font-bold text-heading">
            Job announcements
          </h3>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead className={TABLE_HEAD}>
                <tr>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Position
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Location
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Deadline
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jobs.length ? (
                  jobs.map((item) => (
                    <tr key={item.id} className="transition hover:bg-muted/50">
                      <th scope="row" className={`${TABLE_CELL} font-semibold text-heading`}>
                        {item.title}
                      </th>
                      <td className={`${TABLE_CELL} text-muted-foreground`}>{item.location}</td>
                      <td className={`${TABLE_CELL} text-muted-foreground`}>
                        {formatDate(item.deadline, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className={TABLE_CELL}>
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-center text-muted-foreground">
                      No vacancies published at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <ReadMoreLink to="job-announcement" />
          </div>
        </section>

        <section aria-labelledby="tenders-table-title">
          <p className="eyebrow mb-2">Procurement</p>
          <h3 id="tenders-table-title" className="text-lg font-bold text-heading">
            RFPs &amp; RFQs
          </h3>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead className={TABLE_HEAD}>
                <tr>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Title
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Type
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Location
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Deadline
                  </th>
                  <th scope="col" className={`${TABLE_CELL} font-semibold`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tenders.length ? (
                  tenders.map((item) => (
                    <tr key={item.id} className="transition hover:bg-muted/50">
                      <th scope="row" className={`${TABLE_CELL} font-semibold text-heading`}>
                        {item.title}
                      </th>
                      <td className={`${TABLE_CELL} font-semibold text-primary`}>{item.type}</td>
                      <td className={`${TABLE_CELL} text-muted-foreground`}>{item.location}</td>
                      <td className={`${TABLE_CELL} text-muted-foreground`}>
                        {formatDate(item.deadline, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className={TABLE_CELL}>
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-6 text-center text-muted-foreground">
                      No procurement notices published at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <ReadMoreLink to="rfp" label="Read more: RFP" />
            <ReadMoreLink to="rfq" label="Read more: RFQ" />
          </div>
        </section>

        <section aria-labelledby="events-cards-title">
          <p className="eyebrow mb-2">Participate</p>
          <h3 id="events-cards-title" className="text-lg font-bold text-heading">
            Events &amp; training
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {[...events, ...trainings].length ? (
              [...events, ...trainings].map((item) => (
                <li key={item.id}>
                  <article className="flex h-full flex-col rounded-2xl border border-border border-t-4 border-t-primary bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-primary">
                        {item.type}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    <h4 className="mt-2 font-bold text-heading">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-auto space-y-2 pt-4 text-xs font-semibold text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        {item.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        {item.type === "Events" ? "Takes place" : "Register by"}{" "}
                        {formatDate(item.deadline, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </article>
                </li>
              ))
            ) : (
              <li className="rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                No events or training sessions are published at the moment.
              </li>
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}

export function OpportunityBoard({ category }: { category?: string }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(category ?? "");
  const [status, setStatus] = useState("Open");
  const categories = category
    ? [category]
    : ["RFP", "RFQ", "Job Announcement", "Training", "Events"];
  return (
    <section
      aria-labelledby="opportunities-heading"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-7"
    >
      <h2 id="opportunities-heading" className="text-xl font-bold text-heading">
        Published opportunities
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sample notices show the intended layout. Replace them with approved opportunities before
        publishing.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="relative">
          <span className="sr-only">Search opportunities</span>
          <Search aria-hidden className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings"
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm"
          />
        </label>
        <label>
          <span className="sr-only">Opportunity type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={!!category}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="">All types</option>
            {categories.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Listing status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option>Open</option>
            <option>Closed</option>
            <option>All statuses</option>
          </select>
        </label>
      </div>
      {SAMPLE_OPPORTUNITIES.filter(
        (item) =>
          (!type || item.type === type) &&
          (status === "All statuses" || item.status === status) &&
          `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
      ).length ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {SAMPLE_OPPORTUNITIES.filter(
            (item) =>
              (!type || item.type === type) &&
              (status === "All statuses" || item.status === status) &&
              `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
          ).map((item) => (
            <li key={item.id} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-primary">
                  Sample {item.type}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${item.status === "Open" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="mt-2 font-bold text-heading">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                {item.location}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Calendar className="h-4 w-4 text-accent" />
                Closes{" "}
                {new Date(item.deadline).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="mt-5 rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground"
        >
          No sample notices match those filters.
        </p>
      )}
    </section>
  );
}
