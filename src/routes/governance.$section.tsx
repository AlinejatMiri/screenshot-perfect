import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { OrgChart } from "@/components/common/OrgChart";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartHandshake, Scale, ShieldCheck, UsersRound } from "lucide-react";

export const Route = createFileRoute("/governance/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["governance"]!.pages[params.section];
    if (!page) throw notFound();
    return { title: page.title, intro: page.intro };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.title, loaderData.intro, `/governance/${params.section}`)
      : { meta: [{ title: "Page not found | PWSO" }, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const { section } = Route.useParams();
  if (section === "safeguarding") return <SafeguardingPage />;
  return (
    <SectionDetail
      sectionKey="governance"
      slug={section}
      overviewTo="/governance"
      variant={section === "departments" ? "grid" : "list"}
      link={(slug, children, className) => (
        <Link to="/governance/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    >
      {section === "structure" && <OrgChart />}
    </SectionDetail>
  );
}

const SAFEGUARDING_PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Prevent harm",
    text: "Safeguarding and protection are part of PWSO’s organizational commitments.",
  },
  {
    icon: Scale,
    title: "Zero tolerance",
    text: "PWSO’s profile states zero tolerance for exploitation, abuse and aid diversion.",
  },
  {
    icon: UsersRound,
    title: "Promote inclusion",
    text: "Work should consider the needs and dignity of women, girls, persons with disabilities, returnees and other vulnerable groups.",
  },
  {
    icon: HeartHandshake,
    title: "Be accountable",
    text: "PWSO’s profile identifies accountability to affected people and community feedback as organizational priorities.",
  },
];

function SafeguardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance & accountability"
        title="Safeguarding and protection"
        intro="PWSO’s organizational profile identifies safeguarding, protection from sexual exploitation and abuse, and accountability to affected people as core responsibilities."
        crumbs={[{ label: "Governance", to: "/governance" }, { label: "Safeguarding" }]}
      />
      <div className="container-x space-y-14 py-14 md:py-20">
        <section aria-labelledby="safeguarding-principles">
          <div className="mb-7 max-w-2xl">
            <p className="eyebrow mb-2">Our commitments</p>
            <h2
              id="safeguarding-principles"
              className="text-2xl font-extrabold text-heading md:text-3xl"
            >
              Protecting people and upholding dignity
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              These commitments are drawn from the organizational profile and apply across PWSO’s
              work.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SAFEGUARDING_PRINCIPLES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-heading">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 rounded-2xl border border-border bg-muted p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-2">Across our work</p>
            <h2 className="text-2xl font-extrabold text-heading">
              Safeguarding is everyone’s responsibility
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              PWSO’s profile describes safeguarding and PSEA as organizational priorities supported
              by policies and systems, alongside protection and accountability to affected people.
            </p>
          </div>
          <ul className="grid content-center gap-3 sm:grid-cols-2">
            {[
              "Staff conduct",
              "Program design and delivery",
              "Community engagement",
              "Partner coordination",
              "Feedback and accountability",
              "Management oversight",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-heading"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-5 rounded-2xl bg-navy p-6 text-navy-foreground md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold">Need to raise a concern?</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-foreground/80">
              Review the limits of the website reporting form before sharing information. It
              prepares an email draft and is not a confidential or secure reporting platform.
            </p>
          </div>
          <Button asChild variant="secondary" className="shrink-0">
            <Link to="/complaints">
              Complaint reporting details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
}
