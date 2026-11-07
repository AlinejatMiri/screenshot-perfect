import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resources/")({
  head: () => seo("Resources", "Reports, research, publications, policies and media from PWSO."),
  component: () => (
    <SectionOverview
      sectionKey="resources"
      base="resources"
      
      link={(slug, children, className) => (
        <Link to="/resources/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    />
  ),
});
