import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { NewsList } from "@/components/common/NewsList";
import { NEWS } from "@/data/news";
import { seo } from "@/lib/seo";

const CATS = { announcements: "Announcement", events: "Event" } as const;

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    if (params.slug in CATS) return { title: params.slug === "events" ? "Events" : "Announcements", desc: "PWSO " + params.slug };
    const n = NEWS.find((x) => x.slug === params.slug);
    if (!n) throw notFound();
    return { title: n.title, desc: n.excerpt };
  },
  head: ({ loaderData }) => (loaderData ? seo(loaderData.title, loaderData.desc) : { meta: [{ title: "Article not found | PWSO" }, { name: "robots", content: "noindex" }] }),
  component: NewsPage,
});

function NewsPage() {
  const { slug } = Route.useParams();
  if (slug === "announcements" || slug === "events") {
    const title = slug === "events" ? "Events" : "Announcements";
    return (
      <>
        <PageHero title={title} crumbs={[{ label: "News & Events", to: "/news" }, { label: title }]} />
        <section className="container-x py-14"><NewsList category={CATS[slug]} /></section>
      </>
    );
  }
  const n = NEWS.find((x) => x.slug === slug)!;
  const related = NEWS.filter((x) => x.slug !== slug).slice(0, 2);
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <>
      <PageHero eyebrow={n.category} title={n.title} intro={new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} crumbs={[{ label: "News & Events", to: "/news" }, { label: n.category }]} />
      <article className="container-x max-w-3xl py-14 text-lg leading-relaxed">
        <p className="todo-flag mb-6">Sample article — replace with approved content</p>
        {n.body.map((p) => <p key={p} className="mb-5">{p}</p>)}
        <div className="mt-10 flex gap-4 border-t border-border pt-6 text-sm font-semibold">
          <span className="text-muted-foreground">Share:</span>
          <a className="text-primary" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">Facebook</a>
          <a className="text-primary" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="text-primary" href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">X</a>
        </div>
        <h2 className="mb-4 mt-12 text-2xl font-bold">Related</h2>
        <ul className="space-y-2">{related.map((r) => <li key={r.slug}><Link to="/news/$slug" params={{ slug: r.slug }} className="font-semibold text-primary hover:underline">{r.title}</Link></li>)}</ul>
      </article>
    </>
  );
}
