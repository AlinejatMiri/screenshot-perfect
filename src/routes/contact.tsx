import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
import { MessageForm } from "@/components/forms/MessageForm";
import { ORG } from "@/data/site";
export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Us", "Get in touch with PWSO's offices in Kabul, Badakhshan and Kunduz."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Contact Us" intro="Get in touch with PWSO's offices in Kabul, Badakhshan and Kunduz." crumbs={[{ label: "Contact Us" }]} />
      <div className="container-x py-16">
<div className="grid gap-10 lg:grid-cols-[1fr_22rem]"><MessageForm kind="Contact" /><aside className="space-y-4">{ORG.offices.map((o) => <div key={o.city} className="rounded-2xl bg-secondary p-6"><p className="font-display text-lg font-bold text-heading">{o.city}</p><p className="text-sm text-muted-foreground">{o.type}</p></div>)}<div className="rounded-2xl border border-border bg-card p-6 text-sm"><p><a className="font-semibold text-primary" href={ORG.phoneHref}>{ORG.phone}</a></p><p className="mt-1"><a className="font-semibold text-primary" href={`mailto:${ORG.email}`}>{ORG.email}</a></p><div className="mt-3"><Todo>Office street addresses and map</Todo></div></div></aside></div>
      </div>
    </>
  );
}
void Link; void Todo;
