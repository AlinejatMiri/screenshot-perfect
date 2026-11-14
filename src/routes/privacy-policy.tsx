import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    seo(
      "Privacy Policy",
      "How messages prepared through this website are handled.",
      "/privacy-policy",
    ),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        intro="How PWSO handles personal information shared through this website."
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <div className="container-x py-16">
        <div className="max-w-3xl space-y-4 leading-relaxed">
          <p>
            Contact, feedback and complaint forms on this website prepare a draft in your email
            application. The website does not submit or store those messages. If you choose to send
            an email, its handling is subject to your email provider and PWSO’s applicable
            procedures.
          </p>
          <p>The newsletter form is not connected and does not transmit email addresses.</p>
          <Todo>
            Privacy notice covering website hosting, analytics, email handling and retention, for
            organizational and legal review
          </Todo>
        </div>
      </div>
    </>
  );
}
void Link;
void Todo;
