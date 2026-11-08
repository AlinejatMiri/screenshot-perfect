import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { NAV } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () => seo("Sitemap", "All pages on the PWSO website."),
  component: () => (
    <>
      <PageHero title="Sitemap" crumbs={[{ label: "Sitemap" }]} />
      <div className="container-x grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {NAV.map((n) => (
          <div key={n.label}>
            <Link to={n.to} className="font-display text-lg font-bold text-heading hover:text-primary">{n.label}</Link>
            <ul className="mt-2 space-y-1 text-sm">
              {n.groups?.flatMap((g) => g.links).map((l) => <li key={l.to}><Link to={l.to} className="text-muted-foreground hover:text-primary">{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
    </>
  ),
});
