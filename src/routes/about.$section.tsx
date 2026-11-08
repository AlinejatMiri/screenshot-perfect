import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["about"]!.pages[params.section];
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
      sectionKey="about"
      slug={section}
      overviewTo="/about"
      variant={section === "core-values" ? "grid" : section === "history" ? "timeline" : "list"}
      link={(slug, children, className) => (
        <Link to="/about/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    >
      
    </SectionDetail>
  );
}
