import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { Gallery } from "@/components/common/Gallery";

export const Route = createFileRoute("/resources/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["resources"]!.pages[params.section];
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
      sectionKey="resources"
      slug={section}
      overviewTo="/resources"
      
      link={(slug, children, className) => (
        <Link to="/resources/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    >
      {section === "gallery" && <Gallery />}
    </SectionDetail>
  );
}
