import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Target } from "lucide-react";
import { PageHero, Todo } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PROGRAMS } from "@/data/programs";
import { PROJECTS } from "@/data/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const p = PROGRAMS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { title: p.title, summary: p.summary };
  },
  head: ({ loaderData }) => (loaderData ? seo(loaderData.title, loaderData.summary) : { meta: [{ title: "Program not found | PWSO" }, { name: "robots", content: "noindex" }] }),
  component: ProgramPage,
});

function ProgramPage() {
  const { slug } = Route.useParams();
  const p = PROGRAMS.find((x) => x.slug === slug)!;
  const related = PROJECTS.filter((x) => x.program === slug);
  const provinces = [...new Set(related.map((r) => r.province))];
  const List = ({ items }: { items: string[] }) => (
    <ul className="space-y-2.5">{items.map((x) => <li key={x} className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{x}</li>)}</ul>
  );
  return (
    <>
      <PageHero eyebrow={p.kind} title={p.title} intro={p.summary} crumbs={[{ label: "What We Do", to: "/programs" }, { label: p.title }]}>
        <p.icon className="mt-8 h-10 w-10 text-accent" aria-hidden />
      </PageHero>
      <section className={`container-x grid gap-10 py-16 ${p.layout === "split" ? "lg:grid-cols-2" : ""}`}>
        <div className="rounded-2xl bg-secondary p-8">
          <h2 className="text-2xl font-bold">Context and challenges</h2>
          <p className="mt-3 leading-relaxed">{p.context}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <h2 className="flex items-center gap-2 text-2xl font-bold"><Target className="h-6 w-6 text-accent" />Objectives</h2>
          <div className="mt-4"><List items={p.objectives} /></div>
        </div>
      </section>
      <section className="container-x grid gap-10 pb-16 md:grid-cols-3">
        <div><h2 className="mb-4 text-xl font-bold">Main activities</h2><List items={p.activities} /></div>
        <div><h2 className="mb-4 text-xl font-bold">Target groups</h2><List items={p.targets} /></div>
        <div>
          <h2 className="mb-4 text-xl font-bold">Geographic coverage</h2>
          {provinces.length ? <List items={provinces} /> : <Todo>Verified provinces for this program</Todo>}
          <div className="mt-6"><Todo>Verified impact indicators</Todo></div>
        </div>
      </section>
      <section className="container-x pb-8">
        <h2 className="mb-6 text-2xl font-bold">Related projects</h2>
        {related.length ? (
          <div className="grid gap-5 md:grid-cols-2">{related.map((r) => <ProjectCard key={r.slug} p={r} />)}</div>
        ) : (
          <p className="text-muted-foreground">No projects are listed under this program yet. <Link to="/projects" className="font-semibold text-primary">See all projects</Link>.</p>
        )}
      </section>
      <CTASection title={`Partner with us on ${p.title}`} />
    </>
  );
}
