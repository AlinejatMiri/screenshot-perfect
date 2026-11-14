import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake } from "lucide-react";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";

const CLUSTERS = [
  ["Education", "Education", "Coordination on access to learning and education response."],
  ["Food Security & Agriculture", "FSAC", "Information sharing on food security and livelihoods."],
  ["Water, Sanitation & Hygiene", "WASH", "Coordination on safe water, sanitation and hygiene."],
  ["Protection", "Protection", "Coordination on safe, inclusive and accountable services."],
];

const WORKING_GROUPS = [
  ["Cash Working Group", "Cash assistance", "Technical coordination and information sharing."],
  ["Gender in Humanitarian Action", "Gender", "Promoting gender-responsive humanitarian action."],
  [
    "Child Protection Working Group",
    "Child protection",
    "Coordination focused on children’s safety and wellbeing.",
  ],
];

export const Route = createFileRoute("/partners/")({
  head: () =>
    seo(
      "Partners & Coordination",
      "Donors, partners, clusters and working groups PWSO works with.",
      "/partners",
    ),
  component: () => (
    <SectionOverview
      sectionKey="partners"
      base="partners"
      showPageCards={false}
      link={(slug, children, className) => (
        <Link to="/partners/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    >
      <div className="mb-12 space-y-12">
        <section aria-labelledby="partner-donors-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Project relationships</p>
              <h2 id="partner-donors-title" className="mt-1 text-2xl font-extrabold text-heading">
                Donors named in project records
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Text marks are used in place of official logos. A donor’s appearance here reflects a
                relationship named in supplied project information.
              </p>
            </div>
            <Link
              to="/partners/$section"
              params={{ section: "donors" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Donor details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...new Set(PROJECTS.map((project) => project.donor))].map((donor) => (
              <li
                key={donor}
                className="flex min-h-28 items-center gap-3 rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-extrabold text-primary"
                >
                  {donor
                    .split(/\\s+/)
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 3)
                    .toUpperCase()}
                </span>
                <span className="font-bold leading-snug text-heading">{donor}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="grid gap-8 lg:grid-cols-2">
          <PartnerTable
            title="Clusters"
            note="Sample presentation of cluster sectors named in the organizational profile. Confirm current membership before publication."
            rows={CLUSTERS}
            href="clusters"
          />
          <PartnerTable
            title="Working Groups"
            note="Sample presentation of coordination forums named in the organizational profile. Confirm current membership before publication."
            rows={WORKING_GROUPS}
            href="working-groups"
          />
        </div>
      </div>
    </SectionOverview>
  ),
});

function PartnerTable({
  title,
  note,
  rows,
  href,
}: {
  title: string;
  note: string;
  rows: string[][];
  href: string;
}) {
  return (
    <section
      aria-labelledby={`${href}-title`}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      <div className="flex items-center gap-3 border-b border-border p-5">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-primary">
          <Handshake className="h-5 w-5" />
        </span>
        <div>
          <h2 id={`${href}-title`} className="text-xl font-bold text-heading">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground">Coordination overview · sample</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Forum</th>
              <th className="px-4 py-3 font-semibold">Sector</th>
              <th className="px-4 py-3 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(([forum, sector, purpose]) => (
              <tr key={forum}>
                <th scope="row" className="px-4 py-3 font-semibold text-heading">
                  {forum}
                </th>
                <td className="px-4 py-3 text-muted-foreground">{sector}</td>
                <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border bg-muted/30 px-5 py-3 text-xs leading-relaxed text-muted-foreground">
        {note}
      </p>
      <Link
        to="/partners/$section"
        params={{ section: href }}
        className="inline-flex items-center gap-2 p-5 pt-3 text-sm font-semibold text-primary"
      >
        View {title.toLowerCase()} details <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
