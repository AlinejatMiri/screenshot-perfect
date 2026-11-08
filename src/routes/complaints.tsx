import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
import { MessageForm } from "@/components/forms/MessageForm";
import { ORG } from "@/data/site";
export const Route = createFileRoute("/complaints")({
  head: () => seo("Complaints", "Raise a concern safely and confidentially, including safeguarding concerns."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Complaints" intro="Raise a concern safely and confidentially, including safeguarding concerns." crumbs={[{ label: "Complaints" }]} />
      <div className="container-x py-16">
<div className="grid gap-10 lg:grid-cols-[1fr_22rem]"><MessageForm kind="Complaint" allowAnonymous /><aside className="space-y-4 text-sm leading-relaxed"><div className="rounded-2xl bg-secondary p-6"><h2 className="mb-2 text-lg font-bold">Safeguarding &amp; confidentiality</h2>Complaints are handled confidentially by restricted staff. You may submit anonymously. PWSO has zero tolerance for exploitation and abuse.</div><div className="rounded-2xl border border-border bg-card p-6"><h2 className="mb-2 font-bold">Hotline</h2><Todo>Confidential complaints hotline number</Todo></div></aside></div>
      </div>
    </>
  );
}
void Link; void Todo;
