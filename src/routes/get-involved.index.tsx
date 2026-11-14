import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";
import { OpportunityTables } from "@/components/common/ListingStates";

export const Route = createFileRoute("/get-involved/")({
  head: () =>
    seo(
      "Opportunities",
      "Requests for proposals, quotations, job announcements, training and events from PWSO.",
      "/get-involved",
    ),
  component: () => (
    <SectionOverview
      sectionKey="get-involved"
      base="get-involved"
      showPageCards={false}
      children={<OpportunityTables />}
      link={(slug, children, className) => (
        <Link to="/get-involved/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    />
  ),
});
