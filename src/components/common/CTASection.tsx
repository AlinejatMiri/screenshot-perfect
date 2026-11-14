import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Mail, ShieldCheck, UserRoundX, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_TITLE = "Partner with PWSO for lasting change";

const safeguards = [
  { title: "Email draft", text: "Your email application prepares a message.", icon: Mail },
  {
    title: "No online submission",
    text: "This website does not send or store complaints.",
    icon: Info,
  },
  { title: "Email provider", text: "Your provider may identify the sender.", icon: UserRoundX },
  {
    title: "Review before sending",
    text: "Avoid sharing details you cannot safely email.",
    icon: ShieldCheck,
  },
];

export function CTASection({
  title = DEFAULT_TITLE,
  text = "Work with us to reach women and communities across Afghanistan with programs that last.",
}: {
  title?: string;
  text?: string;
}) {
  if (title !== DEFAULT_TITLE) {
    return (
      <section className="container-x py-16">
        <div className="relative overflow-hidden rounded-3xl bg-band px-8 py-12 text-navy-foreground md:px-14">
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-accent/25"
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold text-navy-foreground">{title}</h2>
              <p className="mt-3 opacity-85">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <Link to="/partners/$section" params={{ section: "become-a-partner" }}>
                  Become a partner
                </Link>
              </Button>
              <Button asChild variant="heroGhost" size="lg">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-16" aria-labelledby="accountability-cta-title">
      <div className="grid gap-8 rounded-2xl border border-border bg-card p-7 shadow-card md:p-9 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,2.2fr)_auto] lg:items-center">
        <div className="flex items-start gap-4">
          <span
            className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex"
            aria-hidden="true"
          >
            <ShieldCheck className="h-8 w-8" />
          </span>
          <div>
            <p className="eyebrow mb-2">Accountability &amp; Safeguarding</p>
            <h2 id="accountability-cta-title" className="text-2xl font-extrabold leading-tight">
              We Are Committed to Your Safety &amp; Dignity
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Learn how to raise a concern. Complaint messages are prepared in your email
              application and are not submitted through this website.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {safeguards.map((item) => (
            <li key={item.title} className="flex flex-col items-center text-center">
              <span
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary"
                aria-hidden="true"
              >
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-heading">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:flex-col">
          <Button asChild variant="accent" size="lg">
            <Link to="/complaints">
              Raise a concern <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/governance/$section" params={{ section: "safeguarding" }}>
              Learn More <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
