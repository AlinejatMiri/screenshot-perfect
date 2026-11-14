import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
const FAQ = [
  [
    "Is PWSO a registered organization?",
    "PWSO is registered with the Ministry of Economy of Afghanistan, License No. 4203, and was established in 2017.",
  ],
  [
    "Where does PWSO work?",
    "PWSO lists its main office in Kabul and sub offices in Badakhshan and Kunduz, with project locations shown on the Where We Work page.",
  ],
  [
    "How can my organization partner with PWSO?",
    "Visit our Become a Partner page or email info@pwsongo.org.",
  ],
  [
    "How do I raise a concern?",
    "Use the Complaints page to prepare an email draft. This website does not transmit the complaint, and your email provider may identify you.",
  ],
];
export const Route = createFileRoute("/faq")({
  head: () => seo("Frequently Asked Questions", "Answers to common questions about PWSO.", "/faq"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        intro="Answers to common questions about PWSO."
        crumbs={[{ label: "Frequently Asked Questions" }]}
      />
      <div className="container-x py-16">
        <div className="max-w-3xl space-y-3">
          {FAQ.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <summary className="cursor-pointer font-display text-lg font-bold text-heading">
                {q}
              </summary>
              <p className="mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
void Link;
