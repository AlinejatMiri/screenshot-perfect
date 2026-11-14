import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { NAV, ORG } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

function linkContent(label: string, desc?: string) {
  return (
    <>
      <span className="text-sm font-semibold text-heading">{label}</span>
      {desc && <span className="block text-xs text-muted-foreground">{desc}</span>}
    </>
  );
}

function TopBar() {
  return (
    <div className="bg-navy text-navy-foreground text-xs">
      <div className="container-x flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={ORG.phoneHref} className="inline-flex items-center gap-1.5 hover:text-accent">
            <Phone className="h-3.5 w-3.5" aria-hidden /> {ORG.phone}
          </a>
          <a
            href={`mailto:${ORG.email}`}
            className="hidden items-center gap-1.5 hover:text-accent sm:inline-flex"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden /> {ORG.email}
          </a>
        </div>
        <div className="flex items-center gap-3" aria-label="Language">
          <span className="font-semibold text-accent">English</span>
          <span className="hidden opacity-60 sm:inline" title="Coming soon" lang="fa">
            دری
          </span>
          <span className="hidden opacity-60 sm:inline" title="Coming soon" lang="ps">
            پښتو
          </span>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setExpanded(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div className="border-b border-border bg-card/95 backdrop-blur">
        <div className="container-x relative flex h-16 items-center justify-between gap-2 py-3 sm:h-18 sm:gap-3 xl:gap-4">
          <Logo />
          <nav aria-label="Main" className="hidden min-w-0 flex-1 justify-center xl:flex">
            <ul className="flex items-center gap-0">
              {NAV.map((item) => (
                <li key={item.label} className="group">
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-2 text-[13px] font-medium text-heading hover:text-primary data-[status=active]:text-primary xl:px-2.5 xl:text-sm 2xl:px-3"
                  >
                    {item.label}
                    {item.groups && (
                      <ChevronDown
                        className="h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180"
                        aria-hidden
                      />
                    )}
                  </Link>
                  {item.groups && (
                    <div className="invisible absolute inset-x-8 top-full z-50 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="flex w-full gap-6 rounded-2xl border border-border bg-popover p-6 shadow-lift">
                        {item.intro && (
                          <div className="w-52 shrink-0 border-r border-border pr-6">
                            <span className="accent-rule mb-3" />
                            <p className="font-display text-base font-bold text-heading">
                              {item.label}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">{item.intro}</p>
                          </div>
                        )}
                        {item.groups.map((g) => (
                          <div key={g.title} className="min-w-0 flex-1">
                            <p className="eyebrow mb-3">{g.title}</p>
                            <ul className="space-y-1">
                              {g.links.map((l) => (
                                <li key={l.to}>
                                  {l.hash ? (
                                    <a
                                      href={`${l.to}#${l.hash}`}
                                      className="block rounded-lg px-2 py-1.5 hover:bg-muted"
                                    >
                                      {linkContent(l.label, l.desc)}
                                    </a>
                                  ) : (
                                    <Link
                                      to={l.to}
                                      className="block rounded-lg px-2 py-1.5 hover:bg-muted"
                                    >
                                      {linkContent(l.label, l.desc)}
                                    </Link>
                                  )}
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
          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-heading xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => {
                setOpen((v) => !v);
                if (open) setExpanded(null);
              }}
            >
              {open ? <X /> : <Menu />}
            </Button>
            <Button
              asChild
              variant="accent"
              size="sm"
              className="px-2.5 text-primary hover:text-primary sm:px-4"
            >
              <Link to="/donation">Donate</Link>
            </Button>
          </div>
        </div>
        {open && (
          <nav
            aria-label="Mobile"
            className="max-h-[75vh] overflow-y-auto border-t border-border bg-card xl:hidden"
          >
            <ul className="container-x py-3">
              {NAV.map((item) => (
                <li key={item.label} className="border-b border-border last:border-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-semibold text-heading"
                    >
                      {item.label}
                    </Link>
                    {item.groups && (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Show ${item.label} pages`}
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="p-2"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition ${expanded === item.label ? "rotate-180" : ""}`}
                        />
                      </Button>
                    )}
                  </div>
                  {expanded === item.label && item.groups && (
                    <ul className="pb-3 pl-3">
                      {item.groups
                        .flatMap((g) => g.links)
                        .map((l) => (
                          <li key={l.to}>
                            {l.hash ? (
                              <a
                                href={`${l.to}#${l.hash}`}
                                onClick={() => setOpen(false)}
                                className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                              >
                                {l.label}
                              </a>
                            ) : (
                              <Link
                                to={l.to}
                                onClick={() => setOpen(false)}
                                className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                              >
                                {l.label}
                              </Link>
                            )}
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
