import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/partners/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["partners"]!.pages[params.section];
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
      sectionKey="partners"
      slug={section}
      overviewTo="/partners"
      
      link={(slug, children, className) => (
        <Link to="/partners/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    >
      
    </SectionDetail>
  );
}
