import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () => seo("Accessibility", "Our commitment to making this website usable for everyone."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Accessibility" intro="Our commitment to making this website usable for everyone." crumbs={[{ label: "Accessibility" }]} />
      <div className="container-x py-16">
<div className="max-w-3xl space-y-4 leading-relaxed"><p>We aim to meet WCAG 2.2 AA. The site supports keyboard navigation, a skip-to-content link, readable contrast, reduced motion settings and lightweight pages for low-bandwidth connections.</p><p>If you face a barrier, please <Link to="/contact" className="font-semibold text-primary">contact us</Link>.</p></div>
      </div>
    </>
  );
}
void Link; void Todo;
