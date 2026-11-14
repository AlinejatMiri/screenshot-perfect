import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { PROJECTS, formatUsd } from "@/data/projects";
import { getProgram } from "@/data/programs";
import { seo } from "@/lib/seo";
import type { ReactNode } from "react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { title: p.title, overview: p.overview };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.title, loaderData.overview, `/projects/${params.slug}`)
      : { meta: [{ title: "Project not found | PWSO" }, { name: "robots", content: "noindex" }] },
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const p = PROJECTS.find((x) => x.slug === slug)!;
  const statusNeedsVerification = p.needsVerification.some((item) =>
    item.toLowerCase().includes("status"),
  );
  const donorNeedsVerification = p.needsVerification.some((item) =>
    item.toLowerCase().includes("donor"),
  );
  const needsWideSlot = (items: string[] | null) =>
    !!items && (items.length > 2 || items.join(" ").length > 120);
  const budgetNeedsVerification = p.needsVerification.some((item) =>
    item.toLowerCase().includes("budget"),
  );
  const beneficiariesNeedVerification = p.needsVerification.some((item) =>
    item.toLowerCase().includes("beneficiar"),
  );
  const facts: { label: string; value: string; verify?: string | undefined }[] = [
    { label: "Status", value: statusNeedsVerification ? "Under review" : p.status },
    { label: "Year", value: String(p.year) },
    {
      label: "Donor",
      value: p.donor,
      verify: donorNeedsVerification ? "Confirm donor's full name" : undefined,
    },
    { label: "Budget", value: budgetNeedsVerification ? "Under review" : formatUsd(p.budgetUsd) },
    { label: "Province", value: p.province },
    {
      label: "Target beneficiaries",
      value: beneficiariesNeedVerification ? "Under review" : p.beneficiaries,
    },
    { label: "Thematic area", value: getProgram(p.program)?.title ?? "—" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Project information"
        title={p.title}
        crumbs={[{ label: "Projects", to: "/projects" }, { label: p.title }]}
      />
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Project overview</h2>
            <p className="mt-3 text-lg leading-relaxed">{p.overview}</p>
          </section>
          <section aria-labelledby="project-details-title">
            <h2 id="project-details-title" className="mb-4 text-2xl font-bold">
              Project details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProjectSlot title="Duration">
                {p.duration ?? <Todo>Confirm project start and end dates</Todo>}
              </ProjectSlot>
              <ProjectSlot title="Implementation district(s)" wide={needsWideSlot(p.districts)}>
                {p.districts?.length ? (
                  <ul className="list-inside list-disc space-y-1">
                    {p.districts.map((district) => (
                      <li key={district}>{district}</li>
                    ))}
                  </ul>
                ) : (
                  <Todo>Confirm implementation districts</Todo>
                )}
              </ProjectSlot>
              <ProjectSlot title="Objectives" wide={needsWideSlot(p.objectives)}>
                {p.objectives?.length ? (
                  <ul className="list-inside list-disc space-y-1">
                    {p.objectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                ) : (
                  <Todo>Provide approved project objectives</Todo>
                )}
              </ProjectSlot>
              <ProjectSlot title="Activities" wide={needsWideSlot(p.activities)}>
                {p.activities?.length ? (
                  <ul className="list-inside list-disc space-y-1">
                    {p.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                ) : (
                  <Todo>Provide verified project activities</Todo>
                )}
              </ProjectSlot>
              <ProjectSlot title="Results & impact" wide={needsWideSlot(p.results)}>
                {p.results?.length ? (
                  <ul className="list-inside list-disc space-y-1">
                    {p.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                ) : (
                  <Todo>Provide verified achievements and results</Todo>
                )}
              </ProjectSlot>
              <ProjectSlot title="Project gallery" wide={(p.gallery?.length ?? 0) > 1}>
                {p.gallery?.length ? (
                  <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {p.gallery.map((image) => (
                      <li key={image.src}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className="aspect-[4/3] w-full rounded-lg object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Todo>Add approved project photos and captions</Todo>
                )}
              </ProjectSlot>
            </div>
          </section>
        </div>
        <aside className="rounded-2xl border border-border bg-card p-6 shadow-card lg:self-start">
          <h2 className="mb-4 text-lg font-bold">Project facts</h2>
          <dl className="divide-y divide-border text-sm">
            {facts.map(({ label, value, verify }) => (
              <div key={label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right font-semibold text-heading">
                  {value}
                  {verify && (
                    <span className="mt-1 block">
                      <Todo>{verify}</Todo>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <CTASection />
    </>
  );
}

function ProjectSlot({
  title,
  children,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className={`min-h-32 rounded-2xl border border-border bg-card p-5 shadow-card ${wide ? "sm:col-span-2" : ""}`}
    >
      <h3 className="mb-3 font-bold text-heading">{title}</h3>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}
