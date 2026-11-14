import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";
import { MessageForm } from "@/components/forms/MessageForm";
import { ORG } from "@/data/site";
export const Route = createFileRoute("/feedback")({
  head: () =>
    seo(
      "Feedback",
      "Tell us how we are doing. Your feedback helps us improve and stay accountable.",
      "/feedback",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="Feedback"
        intro="Tell us how we are doing. Your feedback helps us improve and stay accountable."
        crumbs={[{ label: "Feedback" }]}
      />
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          <MessageForm kind="Feedback" allowAnonymous />
          <aside className="rounded-2xl bg-secondary p-6 text-sm leading-relaxed">
            <h2 className="mb-2 text-lg font-bold">How this form works</h2>Your browser opens an
            email draft. This site does not receive or store it, and your email provider may
            identify you. Avoid sharing sensitive personal information.
          </aside>
        </div>
      </div>
    </>
  );
}
void Link;
void Todo;
