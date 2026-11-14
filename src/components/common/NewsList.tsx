import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { NEWS, type NewsItem } from "@/data/news";

export function NewsList({ category }: { category?: NewsItem["category"] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>(category ?? "");
  const items = NEWS.filter(
    (n) => (!cat || n.category === cat) && (!q || n.title.toLowerCase().includes(q.toLowerCase())),
  ).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        <input
          aria-label="Search news"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search news"
          className="h-10 flex-1 rounded-lg border border-input bg-card px-3 text-sm"
        />
        {!category && (
          <select
            aria-label="Category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-10 rounded-lg border border-input bg-card px-3 text-sm"
          >
            <option value="">All categories</option>
            <option>News</option>
            <option>Announcement</option>
            <option>Event</option>
          </select>
        )}
      </div>
      {items.length ? (
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map((n) => (
            <li key={n.slug}>
              <Link
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-lift"
              >
                <img
                  src={n.image}
                  alt=""
                  loading="lazy"
                  width={960}
                  height={540}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold text-primary">
                    {n.category} ·{" "}
                    {new Date(n.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <h2 className="mt-3 text-lg font-bold group-hover:text-primary">{n.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-primary">Read more →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/50 px-6 py-12 text-center">
          <h2 className="text-xl font-bold text-heading">
            {q || cat ? "No updates match those filters" : "No news or events published yet"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            PWSO’s verified project information is available in the project portfolio. News and
            event listings will appear here when approved updates are ready to share.
          </p>
          <Link
            to="/projects"
            className="mt-5 inline-flex font-semibold text-primary hover:underline"
          >
            Explore verified projects →
          </Link>
        </div>
      )}
    </>
  );
}
