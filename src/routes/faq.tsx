import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
const FAQ = [["Is PWSO a registered organization?", "Yes. PWSO is registered with the Ministry of Economy of Afghanistan, License No. 4203, and was established in 2017."], ["Where does PWSO work?", "PWSO has its main office in Kabul and sub offices in Badakhshan and Kunduz, with projects in provinces including Daikundi."], ["How can my organization partner with PWSO?", "Visit our Become a Partner page or email info@pwsongo.org."], ["How do I raise a concern?", "Use our Complaints page. You can submit anonymously and confidentially."]];
export const Route = createFileRoute("/faq")({
  head: () => seo("Frequently Asked Questions", "Answers to common questions about PWSO."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Frequently Asked Questions" intro="Answers to common questions about PWSO." crumbs={[{ label: "Frequently Asked Questions" }]} />
      <div className="container-x py-16">
<div className="max-w-3xl space-y-3">{FAQ.map(([q, a]) => <details key={q} className="group rounded-2xl border border-border bg-card p-6 shadow-card"><summary className="cursor-pointer font-display text-lg font-bold text-heading">{q}</summary><p className="mt-3 leading-relaxed">{a}</p></details>)}</div>
      </div>
    </>
  );
}
void Link; void Todo;
