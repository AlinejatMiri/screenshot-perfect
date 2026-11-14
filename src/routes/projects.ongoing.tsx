import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { ProjectsBrowser } from "@/components/common/ProjectsBrowser";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects/ongoing")({
  head: () =>
    seo(
      "Ongoing Projects",
      "Explore PWSO's project portfolio — search and filter by area, province, donor and year.",
      "/projects/ongoing",
    ),
  component: () => (
    <>
      <PageHero
        title="Ongoing Projects"
        intro="Projects delivered with our donors and partners across Afghanistan."
        crumbs={[{ label: "Projects", to: "/projects" }, { label: "Ongoing Projects" }]}
      >
        <div className="mt-8 flex gap-2 text-sm font-semibold">
          <Link
            to="/projects"
            activeOptions={{ exact: true }}
            className="rounded-full border border-navy-foreground/30 px-4 py-1.5 data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
          >
            All
          </Link>
          <Link
            to="/projects/ongoing"
            className="rounded-full border border-navy-foreground/30 px-4 py-1.5 data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
          >
            Ongoing
          </Link>
          <Link
            to="/projects/completed"
            className="rounded-full border border-navy-foreground/30 px-4 py-1.5 data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
          >
            Completed
          </Link>
        </div>
      </PageHero>
      <section className="container-x py-14">
        <ProjectsBrowser status="Ongoing" />
      </section>
    </>
  ),
});
