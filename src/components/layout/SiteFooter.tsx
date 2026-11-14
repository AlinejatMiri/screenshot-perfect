import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { ORG } from "@/data/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const quick = [
  { label: "Job", to: "/get-involved/job-announcement" },
  { label: "News & Events", to: "/news" },
  { label: "Publication", to: "/resources/publications" },
  { label: "Documentation", to: "/resources" },
  { label: "Report Safely", to: "/complaints" },
  { label: "Contact us", to: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 py-12 md:grid-cols-2 md:py-16 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-80">
            A national, non-governmental, non-profit organization supporting women and marginalized
            communities across Afghanistan since {ORG.established}.
          </p>
          <p className="mt-4 text-xs opacity-60">{ORG.license}</p>
          <nav aria-label="Social media" className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/search/top?q=Poor%20Women%20Support%20Organization"
              target="_blank"
              rel="noreferrer"
              aria-label="Find PWSO on Facebook"
              className="rounded-full border border-navy-foreground/20 p-2 opacity-80 transition hover:border-accent hover:text-accent hover:opacity-100"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/search?q=Poor%20Women%20Support%20Organization"
              target="_blank"
              rel="noreferrer"
              aria-label="Find PWSO on X"
              className="rounded-full border border-navy-foreground/20 px-2.5 py-2 text-xs font-bold opacity-80 transition hover:border-accent hover:text-accent hover:opacity-100"
            >
              X
            </a>
            <a
              href="https://af.linkedin.com/company/poor-women-support-organization-pwso"
              target="_blank"
              rel="noreferrer"
              aria-label="PWSO on LinkedIn"
              className="rounded-full border border-navy-foreground/20 p-2 opacity-80 transition hover:border-accent hover:text-accent hover:opacity-100"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/results?search_query=Poor+Women+Support+Organization+Afghanistan"
              target="_blank"
              rel="noreferrer"
              aria-label="Find PWSO on YouTube"
              className="rounded-full border border-navy-foreground/20 p-2 opacity-80 transition hover:border-accent hover:text-accent hover:opacity-100"
            >
              <Youtube className="h-4 w-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-accent">Quick links</h2>
          <ul className="space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="opacity-80 hover:text-accent hover:opacity-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-accent">Contact</h2>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <span>{ORG.offices.map((o) => `${o.city} (${o.type})`).join(" · ")}</span>
            </li>
            <li>
              <a href={ORG.phoneHref} className="flex gap-2 hover:text-accent">
                <Phone className="h-4 w-4 text-accent" />
                {ORG.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${ORG.email}`} className="flex gap-2 hover:text-accent">
                <Mail className="h-4 w-4 text-accent" />
                {ORG.email}
              </a>
            </li>
          </ul>
          <h2 className="mb-3 mt-6 text-sm font-bold text-accent">Newsletter</h2>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-sidebar-border">
        <div className="container-x flex flex-col gap-3 py-5 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {ORG.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link to="/privacy-policy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="hover:text-accent">
                Accessibility
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-accent">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-accent">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
