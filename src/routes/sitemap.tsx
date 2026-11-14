import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { NAV } from "@/data/site";
import { seo } from "@/lib/seo";
import { PROGRAMS } from "@/data/programs";
import { PROJECTS } from "@/data/projects";
import { NEWS } from "@/data/news";
import { SECTIONS } from "@/data/pages";

export const Route = createFileRoute("/sitemap")({
  head: () => seo("Sitemap", "All pages on the PWSO website.", "/sitemap"),
  component: () => (
    <>
      <PageHero title="Sitemap" crumbs={[{ label: "Sitemap" }]} />
      <div className="container-x grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {NAV.map((n) => (
          <div key={n.label}>
            <Link
              to={n.to}
              className="font-display text-lg font-bold text-heading hover:text-primary"
            >
              {n.label}
            </Link>
            <ul className="mt-2 space-y-1 text-sm">
              {n.groups
                ?.flatMap((g) => g.links)
                .map((l) => (
                  <li key={`${l.to}-${l.hash ?? ""}`}>
                    {l.hash ? (
                      <a
                        href={`${l.to}#${l.hash}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.to} className="text-muted-foreground hover:text-primary">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {["about", "governance", "partners", "resources", "get-involved"].map((sectionKey) => {
          const section = SECTIONS[sectionKey];
          if (!section) return null;
          return (
            <section key={sectionKey} aria-label={section.title}>
              <h2 className="font-display text-lg font-bold text-heading">{section.title}</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {Object.entries(section.pages).map(([slug, page]) => (
                  <li key={slug}>
                    <a
                      href={`/${sectionKey}/${slug}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {page.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <section>
          <h2 className="font-display text-lg font-bold text-heading">Programs</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {PROGRAMS.map((program) => (
              <li key={program.slug}>
                <a
                  href={`/programs/${program.slug}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {program.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-heading">Projects</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a href="/projects/ongoing" className="text-muted-foreground hover:text-primary">
                Ongoing
              </a>
            </li>
            <li>
              <a href="/projects/completed" className="text-muted-foreground hover:text-primary">
                Completed
              </a>
            </li>
            {PROJECTS.map((project) => (
              <li key={project.slug}>
                <a
                  href={`/projects/${project.slug}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-heading">News &amp; Events</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a href="/news" className="text-muted-foreground hover:text-primary">
                All news
              </a>
            </li>
            {NEWS.map((item) => (
              <li key={item.slug}>
                <a href={`/news/${item.slug}`} className="text-muted-foreground hover:text-primary">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-heading">Site information</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {[
              ["Contact", "/contact"],
              ["Feedback", "/feedback"],
              ["Complaints", "/complaints"],
              ["Donate", "/donation"],
              ["FAQ", "/faq"],
              ["Privacy policy", "/privacy-policy"],
              ["Terms", "/terms"],
              ["Accessibility", "/accessibility"],
              ["HTML sitemap", "/sitemap"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-muted-foreground hover:text-primary">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  ),
});
