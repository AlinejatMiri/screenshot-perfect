import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.string().trim().email("Enter a valid email").max(255);

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const r = schema.safeParse(email);
        if (!r.success)
          return setMsg({ ok: false, text: r.error.issues[0]?.message ?? "Invalid email" });
        setMsg({
          ok: false,
          text: "Newsletter sign-up is not connected yet. Your address has not been submitted.",
        });
      }}
      className="space-y-2"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent focus-within:ring-2 focus-within:ring-accent">
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          required
          aria-describedby={msg ? "nl-status" : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-navy-foreground placeholder:opacity-60 focus:outline-none"
        />
        <Button type="submit" variant="accent" className="h-full shrink-0 rounded-none px-3">
          Subscribe
        </Button>
      </div>
      {msg && (
        <p
          id="nl-status"
          role="status"
          className={`text-xs ${msg.ok ? "text-accent" : "text-accent"}`}
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
