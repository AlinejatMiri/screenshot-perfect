import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { useState } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Todo } from "@/components/common/PageHero";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROJECTS, formatUsd } from "@/data/projects";

type Organization = {
  name: string;
  mark: string;
  summary: string;
  details: string;
  projectSlug?: string;
  verification?: string;
};

const DONORS: Organization[] = [
  {
    name: "Aga Khan Foundation",
    mark: "AKF",
    summary: "Supported community awareness on unlawful traditional practices affecting women.",
    projectSlug: "women-unlawful-traditional-practices-2019",
    details: "Funded PWSO’s Women and Unlawful Traditional Practices Awareness Project in Kunduz.",
  },
  {
    name: "Jesuit Refugee Service",
    mark: "JRS",
    summary: "Supported access to quality education for students in Badakhshan.",
    projectSlug: "access-to-quality-education-2018",
    details: "Funded PWSO’s Access to Quality Education Program in Badakhshan.",
  },
  {
    name: "Azar Afrang Logistic & Construction Services Company (AALCC)",
    mark: "AALCC",
    summary:
      "Listed in connection with a women’s fruit and vegetable processing program in Kunduz.",
    projectSlug: "seasonal-fruits-vegetables-processing-2025",
    details:
      "The project record lists an AALCC contribution to the 2025 women’s fruit and vegetable processing program in Kunduz.",
    verification: "Confirm project status, budget and beneficiary figures",
  },
];

const STRATEGIC_PARTNERS: Organization[] = [
  {
    name: "Aga Khan Foundation",
    mark: "AKF",
    summary: "Named in the profile in connection with community awareness work in Kunduz.",
    projectSlug: "women-unlawful-traditional-practices-2019",
    details:
      "PWSO’s project record describes the Aga Khan Foundation as a partner on women’s rights awareness work in Kunduz.",
  },
  {
    name: "Jesuit Refugee Service (JRS)",
    mark: "JRS",
    summary: "Named in the profile in connection with an education program in Badakhshan.",
    projectSlug: "access-to-quality-education-2018",
    details:
      "PWSO’s project record lists Jesuit Refugee Service as the donor for the Access to Quality Education Program in Badakhshan.",
  },
];

export const Route = createFileRoute("/partners/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["partners"]!.pages[params.section];
    if (!page) throw notFound();
    return { title: page.title, intro: page.intro };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.title, loaderData.intro, `/partners/${params.section}`)
      : { meta: [{ title: "Page not found | PWSO" }, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const { section } = Route.useParams();
  if (section === "donors" || section === "strategic-partners")
    return <OrganizationCardsPage section={section} />;
  if (section === "clusters" || section === "working-groups")
    return <CoordinationTablePage section={section} />;
  return (
    <SectionDetail
      sectionKey="partners"
      slug={section}
      overviewTo="/partners"

      link={(slug, children, className) => (
        <Link to="/partners/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    ></SectionDetail>
  );
}

function CoordinationTablePage({ section }: { section: "clusters" | "working-groups" }) {
  const page = SECTIONS["partners"]!.pages[section]!;
  const mechanisms = page.blocks.flatMap((block) => block.list ?? []);
  const type = section === "clusters" ? "Cluster" : "Working group";

  return (
    <>
      <PageHero
        eyebrow="Partners & Coordination"
        title={page.title}
        intro={page.intro}
        crumbs={[{ label: "Partners & Coordination", to: "/partners" }, { label: page.title }]}
      />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_17rem]">
        <section aria-labelledby="coordination-table-title">
          <div className="mb-8">
            <p className="eyebrow mb-2">Coordination forums</p>
            <h2 id="coordination-table-title" className="text-2xl font-extrabold">
              Listed {section === "clusters" ? "clusters" : "working groups"}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Current participation needs confirmation for each listing.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead className="bg-secondary/60 text-heading">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Name
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Verification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mechanisms.map((name) => (
                  <tr key={name} className="transition hover:bg-muted/50">
                    <th scope="row" className="px-5 py-4 font-semibold text-heading">
                      {name}
                    </th>
                    <td className="px-5 py-4 text-muted-foreground">{type}</td>
                    <td className="px-5 py-4">
                      <Todo>Confirm current membership</Todo>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside
          aria-label="Partners & Coordination pages"
          className="lg:sticky lg:top-36 lg:self-start"
        >
          <p className="eyebrow mb-3">Partners &amp; Coordination</p>
          <ul className="space-y-1 border-l-2 border-border">
            {Object.entries(SECTIONS["partners"]!.pages).map(([slug, item]) => (
              <li key={slug}>
                <Link
                  to="/partners/$section"
                  params={{ section: slug }}
                  className={`-ml-0.5 block border-l-2 py-1.5 pl-4 text-sm ${slug === section ? "border-accent font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-heading"}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

function OrganizationCardsPage({ section }: { section: "donors" | "strategic-partners" }) {
  const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
  const organizations: Organization[] = section === "donors" ? DONORS : STRATEGIC_PARTNERS;
  const page = SECTIONS["partners"]!.pages[section]!;
  const activeProject = activeOrganization?.projectSlug
    ? PROJECTS.find((project) => project.slug === activeOrganization.projectSlug)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow="Partners & Coordination"
        title={page.title}
        intro={page.intro}
        crumbs={[{ label: "Partners & Coordination", to: "/partners" }, { label: page.title }]}
      />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_17rem]">
        <section aria-label={page.title}>
          <div className="mb-8">
            <p className="eyebrow mb-2">
              {section === "donors" ? "Our funding partners" : "Our strategic partners"}
            </p>
            <h2 className="text-2xl font-extrabold">
              {section === "donors"
                ? "Organizations supporting our work"
                : "Organizations working alongside PWSO"}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {section === "donors"
                ? "Explore the projects associated with each donor in PWSO’s current project records."
                : "Explore the partner relationships and related work currently listed in PWSO’s records."}
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {organizations.map((organization) => {
              const project = organization.projectSlug
                ? PROJECTS.find((item) => item.slug === organization.projectSlug)
                : undefined;
              return (
                <li key={organization.name}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                    <div className="flex min-h-36 flex-col items-center justify-center gap-2 border-b border-border bg-secondary/50 p-5 text-center">
                      <span
                        className="font-display text-3xl font-extrabold tracking-wide text-primary"
                        aria-hidden="true"
                      >
                        {organization.mark}
                      </span>
                      <span className="text-sm font-semibold text-heading">
                        {organization.name}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      {project ? (
                        <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {project.year}
                          <span aria-hidden="true">·</span>
                          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {project.province}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Relationship details pending confirmation
                        </p>
                      )}
                      <h3 className="mt-3 font-bold leading-snug text-heading">
                        {organization.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {organization.summary}
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        className="mt-4 h-auto justify-start px-0 text-primary"
                        onClick={() => setActiveOrganization(organization)}
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        <aside
          aria-label="Partners & Coordination pages"
          className="lg:sticky lg:top-36 lg:self-start"
        >
          <p className="eyebrow mb-3">Partners &amp; Coordination</p>
          <ul className="space-y-1 border-l-2 border-border">
            {Object.entries(SECTIONS["partners"]!.pages).map(([slug, item]) => (
              <li key={slug}>
                <Link
                  to="/partners/$section"
                  params={{ section: slug }}
                  className={`-ml-0.5 block border-l-2 py-1.5 pl-4 text-sm ${slug === section ? "border-accent font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-heading"}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <Dialog
        open={!!activeOrganization}
        onOpenChange={(open) => {
          if (!open) setActiveOrganization(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {activeOrganization && (
            <>
              <div className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 p-6 text-center">
                <span
                  className="font-display text-3xl font-extrabold tracking-wide text-primary"
                  aria-hidden="true"
                >
                  {activeOrganization.mark}
                </span>
                <span className="font-semibold text-heading">{activeOrganization.name}</span>
              </div>
              <DialogHeader>
                <DialogTitle>{activeOrganization.name}</DialogTitle>
                <DialogDescription>{activeOrganization.details}</DialogDescription>
              </DialogHeader>
              {activeOrganization.verification && <Todo>{activeOrganization.verification}</Todo>}
              {activeProject ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="text-xs text-muted-foreground">Related project</p>
                      <p className="mt-1 font-semibold text-heading">{activeProject.title}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="text-xs text-muted-foreground">Year · Province</p>
                      <p className="mt-1 font-semibold text-heading">
                        {activeProject.year} · {activeProject.province}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="text-xs text-muted-foreground">Beneficiaries listed</p>
                      <p className="mt-1 font-semibold text-heading">
                        {activeProject.needsVerification.some((item) =>
                          item.toLowerCase().includes("beneficiar"),
                        )
                          ? "Under review"
                          : activeProject.beneficiaries}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="text-xs text-muted-foreground">Project budget listed</p>
                      <p className="mt-1 font-semibold text-heading">
                        {activeProject.needsVerification.some((item) =>
                          item.toLowerCase().includes("budget"),
                        )
                          ? "Under review"
                          : formatUsd(activeProject.budgetUsd)}
                      </p>
                    </div>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">{activeProject.overview}</p>
                  <Button asChild variant="outline" className="w-fit">
                    <Link to="/projects/$slug" params={{ slug: activeProject.slug }}>
                      View project details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  No project details are verified for this partnership yet.
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
