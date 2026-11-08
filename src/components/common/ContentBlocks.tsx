import { CheckCircle2 } from "lucide-react";
import type { Block } from "@/data/pages";
import { Todo } from "./PageHero";

export function ContentBlocks({ blocks, variant = "list" }: { blocks: Block[]; variant?: "list" | "grid" | "timeline" | undefined }) {
  if (variant === "timeline") {
    return (
      <ol className="relative ml-3 border-l-2 border-secondary">
        {blocks.map((b) => (
          <li key={b.heading} className="mb-10 ml-8">
            <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-4 border-background bg-accent" aria-hidden />
            <h3 className="text-xl font-bold">{b.heading}</h3>
            {b.body && <p className="mt-2 leading-relaxed">{b.body}</p>}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <div className={variant === "grid" ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
      {blocks.map((b, i) => (
        <article key={b.heading} className="rounded-2xl border border-border bg-card p-7 shadow-card">
          {variant === "grid" && <span className="mb-4 block font-display text-3xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>}
          <h2 className="text-xl font-bold">{b.heading}</h2>
          {b.body && <p className="mt-3 leading-relaxed">{b.body}</p>}
          {b.list && (
            <ul className="mt-4 space-y-2">
              {b.list.map((x) => (
                <li key={x} className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{x}</li>
              ))}
            </ul>
          )}
          {b.todo && <div className="mt-4"><Todo>{b.todo}</Todo></div>}
        </article>
      ))}
    </div>
  );
}
