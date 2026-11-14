import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
import { ORG } from "@/data/site";
import { MessageForm } from "@/components/forms/MessageForm";
export const Route = createFileRoute("/donation")({
  head: () =>
    seo(
      "Donate",
      "Contact PWSO about supporting its work. Online donation processing is not available on this website.",
      "/donation",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="Donate"
        intro="Support PWSO's work empowering women and marginalized communities across Afghanistan."
        crumbs={[{ label: "Donate" }]}
      />
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <p className="leading-relaxed">
              Your contribution helps PWSO deliver livelihoods, education, health, agriculture and
              protection programs to poor and marginalized women, their families and communities
              across Afghanistan.
            </p>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <p className="eyebrow mb-2">How to give</p>
              <p className="font-display text-lg font-bold text-heading">Bank details</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Make a direct transfer to PWSO’s official bank account using the details below.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
                  <tbody className="divide-y divide-border">
                    {[
                      "Account name",
                      "Bank name",
                      "Account number",
                      "Currency",
                      "SWIFT code",
                      "Branch address",
                    ].map((label) => (
                      <tr key={label} className="transition hover:bg-muted/50">
                        <th scope="row" className="w-44 px-4 py-3 font-semibold text-heading">
                          {label}
                        </th>
                        <td className="px-4 py-3">
                          <Todo>{label}</Todo>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                These details will be filled in once verified by PWSO. Please contact us before
                making an international transfer.
              </p>
            </div>
          </div>
          <aside className="space-y-4">
            {ORG.offices.map((o) => (
              <div key={o.city} className="rounded-2xl bg-secondary p-6">
                <p className="font-display text-lg font-bold text-heading">{o.city}</p>
                <p className="text-sm text-muted-foreground">{o.type}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-border bg-card p-6 text-sm">
              <p>
                <a className="font-semibold text-primary" href={ORG.phoneHref}>
                  {ORG.phone}
                </a>
              </p>
              <p className="mt-1">
                <a className="font-semibold text-primary" href={`mailto:${ORG.email}`}>
                  {ORG.email}
                </a>
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Sample contact area for office address, map location and opening hours.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <section className="container-x pb-16" aria-labelledby="donation-contact-title">
        <div className="mb-8">
          <p className="eyebrow mb-2">Questions about giving?</p>
          <h2 id="donation-contact-title" className="text-3xl font-extrabold">
            Contact us about donations
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Send us a message to ask about donation methods or supporting PWSO’s work.
          </p>
        </div>
        <div className="max-w-3xl">
          <MessageForm kind="Contact" />
        </div>
      </section>
    </>
  );
}
