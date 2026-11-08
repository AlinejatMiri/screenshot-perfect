import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/target-groups")({
  head: () => seo("Target Groups", "The women, families and communities PWSO supports, and the stakeholders we work with."),
  component: () => (
    <>
      <PageHero title="Who We Serve" intro="Our work centres on the women and communities most often left behind." crumbs={[{ label: "Target Groups" }]} />
      <section className="container-x py-16">
        <SectionHeading eyebrow="Primary" title="Communities we support" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Poor and marginalized women", "Widows", "Female-headed households", "Vulnerable children and youth", "Girls at risk", "Underserved rural communities", "Conflict-affected communities"].map((g) => (
            <li key={g} className="rounded-2xl border-l-4 border-accent bg-card p-6 font-display text-lg font-bold text-heading shadow-card">{g}</li>
          ))}
        </ul>
      </section>
      <section className="bg-secondary py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Secondary" title="Stakeholders we work with" />
          <ul className="flex flex-wrap gap-3">
            {["Community leaders", "Local civil society organizations", "Private sector", "Employers", "Government institutions", "Local authorities"].map((g) => (
              <li key={g} className="rounded-full bg-card px-5 py-2.5 font-semibold text-heading">{g}</li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  ),
});
