import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";
import img from "@/assets/hero-education.jpg";

export const Route = createFileRoute("/about/")({
  head: () => seo("About PWSO", "Learn about PWSO, our history, values, leadership and approach."),
  component: () => (
    <SectionOverview
      sectionKey="about"
      base="about"
      image={img}
      link={(slug, children, className) => (
        <Link to="/about/$section" params={{ section: slug }} className={className}>{children}</Link>
      )}
    />
  ),
});
