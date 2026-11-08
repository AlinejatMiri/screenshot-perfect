import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { OrgChart } from "@/components/common/OrgChart";

export const Route = createFileRoute("/governance/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["governance"]!.pages[params.section];
    if (!page) throw notFound();
    return { title: page.title, intro: page.intro };
  },
  head: ({ loaderData }) => (loaderData ? seo(loaderData.title, loaderData.intro) : { meta: [{ title: "Page not found | PWSO" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const { section } = Route.useParams();
  return (
    <SectionDetail
      sectionKey="governance"
      slug={section}
      overviewTo="/governance"
      variant={section === "departments" ? "grid" : "list"}
      link={(slug, children, className) => (
        <Link to="/governance/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    >
      {section === "structure" && <OrgChart />}
    </SectionDetail>
  );
}
