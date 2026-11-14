import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Landmark,
  Leaf,
  MapPinned,
  Megaphone,
  Quote,
  Rocket,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { SectionDetail } from "@/components/common/SectionPages";
import { SECTIONS } from "@/data/pages";
import { seo } from "@/lib/seo";
import { ORG } from "@/data/site";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";

const DEMO_CONTENT: Record<string, { heading: string; body: string; points: string[] }> = {
  "who-we-are": {
    heading: "Sample organization snapshot",
    body: "This demonstration panel shows where a concise, people-focused overview can introduce an organization before its formal background.",
    points: ["Community-led delivery", "Inclusive participation", "Long-term local partnerships"],
  },
  "vision-mission-goals": {
    heading: "Sample priorities for the next chapter",
    body: "Use a short narrative like this to connect the vision to practical priorities and help readers understand the direction of the organization.",
    points: ["Listen before designing", "Invest in local skills", "Measure learning and adapt"],
  },
  history: {
    heading: "Sample milestone",
    body: "2026 — A demonstration entry for a future milestone, partnership or program expansion. This confirms the timeline component works with longer history pages.",
    points: ["Add the year", "Give the moment a clear title", "Explain why it mattered"],
  },
  "core-values": {
    heading: "Values in action — sample",
    body: "This example demonstrates a supporting values card. It can be used for a short quote, a behavioral commitment or a practical example from the field.",
    points: ["Respect every voice", "Share information clearly", "Learn with communities"],
  },
  leadership: {
    heading: "Sample leadership note",
    body: "A leadership page can include a current message, a short team introduction and a clear explanation of how leaders remain accessible to communities and partners.",
    points: [
      "A short signed message",
      "Leadership photo or portrait",
      "Link to governance information",
    ],
  },
  mandate: {
    heading: "Sample mandate in practice",
    body: "This supporting content shows where the mandate can be translated into three practical commitments that are easy for website visitors to understand.",
    points: [
      "Respond to identified needs",
      "Strengthen local capacity",
      "Build accountable partnerships",
    ],
  },
  approach: {
    heading: "Sample delivery cycle",
    body: "This is a useful place to describe the order of work: listen, plan with communities, deliver, review and improve the next cycle.",
    points: ["Community consultation", "Joint planning", "Feedback and learning"],
  },
  "organizational-capacity": {
    heading: "Sample capacity highlight",
    body: "Use this panel for a short, current snapshot of operational strengths, specialist skills or systems that support quality delivery.",
    points: ["Experienced field teams", "Clear financial systems", "Responsive monitoring"],
  },
};

export const Route = createFileRoute("/about/$section")({
  loader: ({ params }) => {
    const page = SECTIONS["about"]!.pages[params.section];
    if (!page) throw notFound();
    return { title: page.title, intro: page.intro };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.title, loaderData.intro, `/about/${params.section}`)
      : { meta: [{ title: "Page not found | PWSO" }, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const { section } = Route.useParams();
  if (section === "who-we-are") return <WhoWeAre />;
  const demo = DEMO_CONTENT[section];
  return (
    <SectionDetail
      sectionKey="about"
      slug={section}
      overviewTo="/about"
      variant={section === "core-values" ? "grid" : section === "history" ? "timeline" : "list"}
      link={(slug, children, className) => (
        <Link to="/about/$section" params={{ section: slug }} className={className}>
          {children}
        </Link>
      )}
    >
      {demo && (
        <section className="mb-10 rounded-2xl border border-accent/40 bg-accent/10 p-6 sm:p-7">
          <p className="eyebrow text-primary">Demo content — replace before publishing</p>
          <h2 className="mt-2 text-2xl font-bold text-heading">{demo.heading}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{demo.body}</p>
          <ul className="mt-5 grid gap-2 text-sm font-medium text-heading sm:grid-cols-3">
            {demo.points.map((point) => (
              <li key={point} className="rounded-lg bg-card px-3 py-2 shadow-sm">
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}
    </SectionDetail>
  );
}

const past = [
  `PWSO was established in ${ORG.established} as a national, non-governmental, non-profit organization supporting women and marginalized communities in Afghanistan.`,
  "The organization’s work is grounded in a belief that community participation and locally led solutions are essential to sustainable change.",
  "Early activities included vocational training for women and education support, creating a foundation for broader integrated programming.",
  "As community needs evolved, PWSO expanded its thematic experience, partnerships and internal systems.",
  "Each project, consultation and lesson learned has contributed to the organization PWSO continues to build today.",
];

const present = [
  "PWSO works across livelihoods, food security, protection, WASH, gender equality, health, education, agriculture and emergency response.",
  "Its programs connect immediate support with longer-term skills, services and community resilience.",
  "PWSO works with women and girls, children, farming households, persons with disabilities, returnees and other vulnerable groups.",
  "Program delivery is supported by systems for MEAL, safeguarding, community feedback, finance, compliance, procurement and operations.",
  `The organization maintains offices in ${ORG.offices.map((office) => office.city).join(", ")}, while working with communities and partners across Afghanistan.`,
];

const priorities: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Community Resilience",
    body: "Supporting communities to prepare for, withstand and recover from shocks through practical, locally informed solutions.",
    icon: ShieldCheck,
  },
  {
    title: "Human Capital",
    body: "Creating pathways through education, skills, livelihoods, health and women’s economic empowerment.",
    icon: GraduationCap,
  },
  {
    title: "Locally Led Development",
    body: "Strengthening community participation, Afghan leadership and local ownership across program design and delivery.",
    icon: MapPinned,
  },
  {
    title: "Dialogue & Engagement",
    body: "Creating space for communities, civil society, partners and decision-makers to listen and identify practical solutions.",
    icon: Megaphone,
  },
  {
    title: "Climate & Environment",
    body: "Connecting agriculture, climate awareness and natural-resource considerations with community resilience.",
    icon: Leaf,
  },
  {
    title: "Evidence & Learning",
    body: "Using monitoring, research, feedback and learning to improve programs and accountability.",
    icon: TrendingUp,
  },
];

function FeatureSection({
  id,
  title,
  subtitle,
  icon: Icon,
  image,
  imageAlt,
  items,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  items: string[];
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="rounded-2xl border border-border bg-card p-6 shadow-card lg:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h2 id={`${id}-title`} className="text-2xl font-extrabold text-heading lg:text-3xl">
                {title.split(" ")[0]}{" "}
                <span className="text-accent">{title.split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="mt-1 font-semibold text-primary">{subtitle}</p>
            </div>
          </div>
          <img
            src={image}
            alt={imageAlt}
            className="mt-6 aspect-[4/3] w-full rounded-xl object-cover"
            loading="lazy"
          />
        </div>
        <ul className="space-y-4 lg:col-span-8">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 bg-muted/30 outline-none">
      <div className="container-x space-y-8 py-8 lg:space-y-10 lg:py-12">
        <section aria-labelledby="who-we-are-title">
          <nav
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/about" className="hover:text-primary">
              About PWSO
            </Link>
            <span>/</span>
            <span className="font-semibold text-heading">Who We Are</span>
          </nav>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h1
                id="who-we-are-title"
                className="text-4xl font-extrabold text-heading lg:text-5xl"
              >
                Who <span className="text-accent">We Are</span>
              </h1>
              <p className="mt-4 text-lg font-bold text-primary">
                Rooted in Afghanistan. Shaped by Communities. Building for the Future.
              </p>
              <p className="mt-5 text-base font-medium leading-relaxed text-heading lg:text-lg">
                {ORG.name} ({ORG.short}) is a national, non-governmental, non-profit organization
                established in {ORG.established}, working alongside women and marginalized
                communities across Afghanistan.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our work brings together livelihoods, education, health and nutrition, agriculture,
                WASH, protection, emergency response and research. Across each area, we seek
                practical, inclusive approaches that build skills, strengthen community resilience
                and support local priorities.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                One principle remains central: the people and communities we serve should remain at
                the center of how programs are designed, delivered and improved.
              </p>
            </div>
            <img
              src={heroEducation}
              alt="Students learning in a classroom"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift lg:col-span-5"
            />
          </div>
        </section>
        <FeatureSection
          id="our-past"
          title="Our Past"
          subtitle="Where Our Journey Began"
          icon={Landmark}
          image={heroLivelihoods}
          imageAlt="Women participating in a skills activity"
          items={past}
        />
        <FeatureSection
          id="our-present"
          title="Our Present"
          subtitle="A National Organization with Local Roots"
          icon={UsersRound}
          image={heroAgriculture}
          imageAlt="Community member holding fresh produce"
          items={present}
        />
        <section
          id="looking-forward"
          aria-labelledby="looking-forward-title"
          className="rounded-2xl border border-border bg-card p-6 shadow-card lg:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
                  <Rocket className="h-6 w-6" />
                </span>
                <div>
                  <h2
                    id="looking-forward-title"
                    className="text-2xl font-extrabold text-heading lg:text-3xl"
                  >
                    Looking <span className="text-accent">Forward</span>
                  </h2>
                  <p className="mt-1 font-semibold text-primary">
                    Building lasting solutions together
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3 leading-relaxed text-muted-foreground">
                <p>Our next chapter is about quality, sustainability, learning and impact.</p>
                <p>
                  PWSO aims to continue strengthening its contribution as an Afghan organization
                  that can respond to community needs while investing in longer-term resilience and
                  opportunity.
                </p>
              </div>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {priorities.map(({ title, body, icon: Icon }) => (
                <li key={title} className="flex items-start gap-3">
                  <Icon className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-bold text-heading">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <section className="border-y border-border bg-card py-12">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border p-6 shadow-card lg:p-8">
            <h2 className="text-2xl font-extrabold text-heading lg:text-3xl">
              The PWSO <span className="text-accent">We Are Building</span>
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our ambition is not simply to grow. It is to remain accountable, responsive and
              capable of connecting community priorities with effective partnerships and sustainable
              support.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                [Award, "Our past has given us experience."],
                [BadgeCheck, "Our present gives us responsibility."],
                [TrendingUp, "Our future is about turning both into lasting impact."],
              ].map(([Icon, text]) => {
                const ItemIcon = Icon as LucideIcon;
                return (
                  <li key={text as string} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent">
                      <ItemIcon className="h-5 w-5" />
                    </span>
                    <p className="font-bold text-heading">{text as string}</p>
                  </li>
                );
              })}
            </ul>
          </article>
          <article className="rounded-2xl border border-border p-6 shadow-card lg:p-8">
            <h2 className="text-2xl font-extrabold text-heading lg:text-3xl">
              Our Journey <span className="text-accent">Continues</span>
            </h2>
            <ol className="mt-6 space-y-6">
              {[
                [
                  Sprout,
                  `${ORG.established} — We Started.`,
                  "With a locally rooted commitment to women and communities.",
                ],
                [
                  Handshake,
                  "Today — We Deliver and Learn.",
                  "Working across integrated humanitarian and development programs.",
                ],
                [
                  Target,
                  "Looking Forward.",
                  "Toward stronger communities, partnerships and locally led impact.",
                ],
              ].map(([Icon, title, text]) => {
                const ItemIcon = Icon as LucideIcon;
                return (
                  <li key={title as string} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ItemIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-heading">{title as string}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {text as string}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent/10 p-5">
              <Quote className="h-7 w-7 shrink-0 text-accent" />
              <p className="text-lg font-bold italic text-heading">Partnership for Change.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
