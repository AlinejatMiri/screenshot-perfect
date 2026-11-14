import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { OpportunityBoard } from "@/components/common/ListingStates";

export const Route = createFileRoute("/get-involved/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["get-involved"]!.pages[params.section];
    if (!page) throw notFound();
    return { title: page.title, intro: page.intro };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.title, loaderData.intro, `/get-involved/${params.section}`)
      : { meta: [{ title: "Page not found | PWSO" }, { name: "robots", content: "noindex" }] },
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
        <Link to="/get-involved/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    >
      <OpportunityBoard category={SECTIONS["get-involved"]!.pages[section]!.title} />
    </SectionDetail>
  );
}
