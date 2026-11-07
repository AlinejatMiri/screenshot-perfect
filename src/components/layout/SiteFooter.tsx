import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { ORG } from "@/data/site";
import { PROGRAMS } from "@/data/programs";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const quick = [
  { label: "About PWSO", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Where We Work", to: "/where-we-work" },
  { label: "Partners", to: "/partners" },
  { label: "Resources", to: "/resources" },
  { label: "News & Events", to: "/news" },
  { label: "Careers", to: "/get-involved/careers" },
  { label: "Tenders", to: "/get-involved/tenders" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-80">
            A national, non-governmental, non-profit organization supporting women and marginalized communities across Afghanistan since {ORG.established}.
          </p>
          <p className="mt-4 text-xs opacity-60">{ORG.license}</p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-accent">Quick links</h2>
          <ul className="space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.to}><Link to={l.to} className="opacity-80 hover:text-accent hover:opacity-100">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-accent">Programs</h2>
          <ul className="space-y-2 text-sm">
            {PROGRAMS.slice(0, 8).map((p) => (
              <li key={p.slug}>
                <Link to="/programs/$slug" params={{ slug: p.slug }} className="opacity-80 hover:text-accent hover:opacity-100">{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-accent">Contact</h2>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" />{ORG.offices.map((o) => `${o.city} (${o.type})`).join(" · ")}</li>
            <li><a href={ORG.phoneHref} className="flex gap-2 hover:text-accent"><Phone className="h-4 w-4 text-accent" />{ORG.phone}</a></li>
            <li><a href={`mailto:${ORG.email}`} className="flex gap-2 hover:text-accent"><Mail className="h-4 w-4 text-accent" />{ORG.email}</a></li>
          </ul>
          <h2 className="mb-3 mt-6 text-sm font-bold text-accent">Newsletter</h2>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-sidebar-border">
        <div className="container-x flex flex-col gap-3 py-5 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {ORG.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
            <li><Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms</Link></li>
            <li><Link to="/accessibility" className="hover:text-accent">Accessibility</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/sitemap" className="hover:text-accent">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
