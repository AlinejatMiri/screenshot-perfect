import { useState } from "react";
import { z } from "zod";

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
        if (!r.success) return setMsg({ ok: false, text: r.error.issues[0]?.message ?? "Invalid email" });
        setMsg({ ok: true, text: "Thank you — you'll hear from us soon." });
        setEmail("");
      }}
      className="space-y-2"
    >
      <div className="flex overflow-hidden rounded-lg border border-sidebar-border bg-sidebar-accent focus-within:ring-2 focus-within:ring-accent">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input
          id="nl-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-navy-foreground placeholder:opacity-60 focus:outline-none"
        />
        <button className="bg-accent px-4 text-sm font-semibold text-accent-foreground hover:opacity-90">Subscribe</button>
      </div>
      {msg && <p role="status" className={`text-xs ${msg.ok ? "text-accent" : "text-destructive"}`}>{msg.text}</p>}
    </form>
  );
}
