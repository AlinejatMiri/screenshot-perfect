import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Check, Mail, MessageSquareText } from "lucide-react";
import { MessageForm } from "@/components/forms/MessageForm";
import { PageHero } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
import { ORG } from "@/data/site";

export const Route = createFileRoute("/complaints")({
  head: () =>
    seo(
      "Complaints and Feedback",
      "Learn how the PWSO website complaint form works and what information it sends.",
      "/complaints",
    ),
  component: Page,
});

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Write your concern",
    text: "Share only details you feel safe including. You may leave your name and email out of the draft.",
  },
  {
    icon: Mail,
    title: "Review the email draft",
    text: "Submitting opens your email app with a message addressed to PWSO. This site does not send it.",
  },
  {
    icon: Check,
    title: "Send it from your email app",
    text: "The message reaches PWSO only if you choose to send it. Your email provider may identify you.",
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Accountability"
        title="Complaints and feedback"
        intro="PWSO welcomes feedback and concerns. Read how this website’s reporting form works before deciding what information to share."
        crumbs={[{ label: "Complaints and feedback" }]}
      />
      <div className="container-x space-y-12 py-14 md:py-20">
        <section aria-labelledby="complaint-steps">
          <div className="mb-7 max-w-2xl">
            <p className="eyebrow mb-2">How it works</p>
            <h2 id="complaint-steps" className="text-2xl font-extrabold text-heading md:text-3xl">
              You stay in control of sending your message
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-heading">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <div className="mb-5">
              <p className="eyebrow mb-2">Submit a concern</p>
              <h2 className="text-2xl font-extrabold text-heading">Prepare a complaint email</h2>
            </div>
            <MessageForm kind="Complaint" allowAnonymous />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-36">
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-bold">Privacy and safety</h2>
                  <p className="mt-2">
                    This form does not transmit or store complaints. It creates an email draft on
                    your device; your email address may be visible to the recipient. The anonymous
                    option only leaves your name and email out of the draft. Do not include details
                    you cannot safely share by email.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-bold text-heading">What you may include</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>What happened or what concern you want to raise</li>
                <li>When and where it happened, if safe to share</li>
                <li>How PWSO can follow up, if you want a response</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-muted p-5 text-sm leading-relaxed">
              <h2 className="font-bold text-heading">Other reporting channels</h2>
              <p className="mt-2 text-muted-foreground">
                A verified confidential hotline or secure reporting platform is not listed on this
                website. For general inquiries, contact{" "}
                <a
                  className="font-semibold text-primary underline underline-offset-2"
                  href={`mailto:${ORG.email}`}
                >
                  {ORG.email}
                </a>
                .
              </p>
              <Link
                to="/governance/$section"
                params={{ section: "safeguarding" }}
                className="mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                Read our safeguarding commitments <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
