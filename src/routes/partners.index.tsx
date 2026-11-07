import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/partners/")({
  head: () => seo("Partners & Coordination", "Donors, partners, clusters and working groups PWSO works with."),
  component: () => (
    <SectionOverview
      sectionKey="partners"
      base="partners"
      
      link={(slug, children, className) => (
        <Link to="/partners/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    />
  ),
});
