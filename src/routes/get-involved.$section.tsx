import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { Todo } from "@/components/common/PageHero";

export const Route = createFileRoute("/get-involved/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["get-involved"]!.pages[params.section];
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
      sectionKey="get-involved"
      slug={section}
      overviewTo="/get-involved"
      
      link={(slug, children, className) => (
        <Link to="/get-involved/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    >
      {section === "careers" && <Todo>Vacancy listings and online application (CV upload) — enabled with the admin backend phase</Todo>}
    </SectionDetail>
  );
}
