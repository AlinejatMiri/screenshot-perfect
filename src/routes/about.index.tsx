import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionOverview } from "@/components/common/SectionPages";
import { seo } from "@/lib/seo";
import img from "@/assets/hero-education.jpg";

export const Route = createFileRoute("/about/")({
  head: () =>
    seo("About PWSO", "Learn about PWSO, our history, values, leadership and approach.", "/about"),
  component: () => (
    <SectionOverview
      sectionKey="about"
      base="about"
      image={img}
      link={(slug, children, className) => (
        <Link to="/about/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    >
      <div className="mb-10 rounded-2xl border border-accent/40 bg-accent/10 p-6">
        <p className="eyebrow text-primary">Demo content</p>
        <h2 className="mt-2 text-2xl font-bold text-heading">
          Explore our story, from purpose to practice
        </h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          This sample introduction shows where a short overview of the organization belongs before
          visitors explore the individual About pages. Replace it with approved copy before launch.
        </p>
      </div>
    </SectionOverview>
  ),
});
