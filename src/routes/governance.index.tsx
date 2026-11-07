import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/governance/")({
  head: () => seo("Governance", "How PWSO is governed, structured and held accountable."),
  component: () => (
    <SectionOverview
      sectionKey="governance"
      base="governance"
      
      link={(slug, children, className) => (
        <Link to="/governance/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    />
  ),
});
