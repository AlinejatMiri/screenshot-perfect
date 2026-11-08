import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo("Privacy Policy", "How PWSO handles personal information shared through this website."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Privacy Policy" intro="How PWSO handles personal information shared through this website." crumbs={[{ label: "Privacy Policy" }]} />
      <div className="container-x py-16">
<div className="max-w-3xl space-y-4 leading-relaxed"><p>We collect only the information you choose to send us through forms or email, and use it only to respond to you. We do not sell or share personal data. Feedback and complaints may be submitted anonymously.</p><Todo>Legally reviewed privacy policy</Todo></div>
      </div>
    </>
  );
}
void Link; void Todo;
