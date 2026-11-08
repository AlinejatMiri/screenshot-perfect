import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { NAV, ORG } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

function TopBar() {
  return (
    <div className="bg-navy text-navy-foreground text-xs">
      <div className="container-x flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={ORG.phoneHref} className="inline-flex items-center gap-1.5 hover:text-accent">
            <Phone className="h-3.5 w-3.5" aria-hidden /> {ORG.phone}
          </a>
          <a href={`mailto:${ORG.email}`} className="hidden items-center gap-1.5 hover:text-accent sm:inline-flex">
            <Mail className="h-3.5 w-3.5" aria-hidden /> {ORG.email}
          </a>
        </div>
        <div className="flex items-center gap-3" aria-label="Language">
          <span className="font-semibold text-accent">English</span>
          <span className="opacity-60" title="Coming soon" lang="fa">دری</span>
          <span className="opacity-60" title="Coming soon" lang="ps">پښتو</span>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div className="border-b border-border bg-card/95 backdrop-blur">
        <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
          <Logo />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {NAV.map((item) => (
                <li key={item.label} className="group relative">
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.9rem] font-medium text-heading hover:text-primary data-[status=active]:text-primary"
                  >
                    {item.label}
                    {item.groups && <ChevronDown className="h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180" aria-hidden />}
                  </Link>
                  {item.groups && (
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="flex w-max max-w-[52rem] gap-8 rounded-2xl border border-border bg-popover p-6 shadow-lift">
                        {item.intro && (
                          <div className="w-52 shrink-0 border-r border-border pr-6">
                            <span className="accent-rule mb-3" />
                            <p className="font-display text-base font-bold text-heading">{item.label}</p>
                            <p className="mt-2 text-sm text-muted-foreground">{item.intro}</p>
                          </div>
                        )}
                        {item.groups.map((g) => (
                          <div key={g.title} className="w-52">
                            <p className="eyebrow mb-3">{g.title}</p>
                            <ul className="space-y-1">
                              {g.links.map((l) => (
                                <li key={l.to}>
                                  <Link to={l.to} className="block rounded-lg px-2 py-1.5 hover:bg-muted">
                                    <span className="text-sm font-semibold text-heading">{l.label}</span>
                                    {l.desc && <span className="block text-xs text-muted-foreground">{l.desc}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden md:inline-flex">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="accent" className="hidden sm:inline-flex">
              <Link to="/get-involved/$section" params={{ section: "support-us" }}>Support Us</Link>
            </Button>
            <button
              className="rounded-md p-2 text-heading xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="max-h-[75vh] overflow-y-auto border-t border-border bg-card xl:hidden">
            <ul className="container-x py-3">
              {NAV.map((item) => (
                <li key={item.label} className="border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <Link to={item.to} onClick={() => setOpen(false)} className="block py-3 font-semibold text-heading">
                      {item.label}
                    </Link>
                    {item.groups && (
                      <button
                        aria-label={`Show ${item.label} pages`}
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="p-2"
                      >
                        <ChevronDown className={`h-4 w-4 transition ${expanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {expanded === item.label && item.groups && (
                    <ul className="pb-3 pl-3">
                      {item.groups.flatMap((g) => g.links).map((l) => (
                        <li key={l.to}>
                          <Link to={l.to} onClick={() => setOpen(false)} className="block py-1.5 text-sm text-muted-foreground hover:text-primary">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
