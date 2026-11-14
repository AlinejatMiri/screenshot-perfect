import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Todo } from "@/components/common/PageHero";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Use", "Terms for using the PWSO website.", "/terms"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        intro="Terms for using the PWSO website."
        crumbs={[{ label: "Terms of Use" }]}
      />
      <div className="container-x py-16">
        <div className="max-w-3xl space-y-4 leading-relaxed">
          <p>
            Content on this website is provided for information about PWSO and its work. Images and
            documents may not be reused without permission.
          </p>
          <Todo>Legally reviewed terms of use</Todo>
        </div>
      </div>
    </>
  );
}
void Link;
void Todo;
