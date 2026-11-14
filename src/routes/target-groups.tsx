import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/target-groups")({
  head: () =>
    seo(
      "Target Groups",
      "The women, families and communities PWSO supports, and the stakeholders we work with.",
      "/target-groups",
    ),
  component: () => (
    <>
      <PageHero
        title="Who We Serve"
        intro="PWSO’s profile identifies women, vulnerable young people and underserved communities as primary beneficiaries, alongside stakeholders who support community-level change."
        crumbs={[{ label: "Target Groups" }]}
      />
      <section className="container-x py-16">
        <SectionHeading eyebrow="Primary" title="Communities we support" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Poor and marginalized women",
            "Widows",
            "Female-headed households",
            "Vulnerable children and youth, particularly girls at risk of exploitation and exclusion",
            "Underserved rural communities with limited access to basic services",
            "Conflict-affected communities with limited access to basic services",
          ].map((g) => (
            <li
              key={g}
              className="rounded-2xl border-l-4 border-accent bg-card p-6 font-display text-lg font-bold text-heading shadow-card"
            >
              {g}
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-secondary py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Secondary" title="Stakeholders we work with" />
          <ul className="flex flex-wrap gap-3">
            {[
              "Community leaders and influencers, including elders and religious figures",
              "Women- and youth-led local civil society organizations",
              "Private-sector organizations and employers",
              "Government bodies and local authorities",
            ].map((g) => (
              <li key={g} className="rounded-full bg-card px-5 py-2.5 font-semibold text-heading">
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  ),
});
