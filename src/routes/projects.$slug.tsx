import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { PROJECTS, formatUsd } from "@/data/projects";
import { getProgram } from "@/data/programs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const p = PROJECTS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { title: p.title, overview: p.overview };
  },
  head: ({ loaderData }) => (loaderData ? seo(loaderData.title, loaderData.overview) : { meta: [{ title: "Project not found | PWSO" }, { name: "robots", content: "noindex" }] }),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const p = PROJECTS.find((x) => x.slug === slug)!;
  const facts = [
    ["Status", p.status], ["Year", String(p.year)], ["Donor", p.donor], ["Approved budget", formatUsd(p.budgetUsd)],
    ["Province", p.province], ["Target beneficiaries", p.beneficiaries], ["Thematic area", getProgram(p.program)?.title ?? "—"],
  ];
  return (
    <>
      <PageHero eyebrow={`${p.status} project`} title={p.title} crumbs={[{ label: "Projects", to: "/projects" }, { label: p.title }]} />
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-8">
          <section><h2 className="text-2xl font-bold">Project overview</h2><p className="mt-3 text-lg leading-relaxed">{p.overview}</p></section>
          <section className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <h2 className="text-lg font-bold">Information pending verification</h2>
            <div className="mt-3 flex flex-wrap gap-2">{p.needsVerification.map((n) => <Todo key={n}>{n}</Todo>)}<Todo>Objectives, activities, results and gallery</Todo></div>
          </section>
        </div>
        <aside className="rounded-2xl border border-border bg-card p-6 shadow-card lg:self-start">
          <h2 className="mb-4 text-lg font-bold">Project facts</h2>
          <dl className="divide-y divide-border text-sm">
            {facts.map(([k, v]) => <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold text-heading">{v}</dd></div>)}
          </dl>
        </aside>
      </div>
      <CTASection />
    </>
  );
}
