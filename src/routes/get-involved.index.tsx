import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/get-involved/")({
  head: () => seo("Get Involved", "Partner, volunteer, join our team or support PWSO."),
  component: () => (
    <SectionOverview
      sectionKey="get-involved"
      base="get-involved"
      
      link={(slug, children, className) => (
        <Link to="/get-involved/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    />
  ),
});
