import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ORG } from "@/data/site";

const schema = z.object({
  anonymous: z.boolean(),
  name: z.string().trim().max(100).optional(),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]).optional(),
  subject: z.string().trim().min(3, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(3000),
});
type Values = z.infer<typeof schema>;

export function MessageForm({ kind, allowAnonymous = false }: { kind: "Contact" | "Feedback" | "Complaint"; allowAnonymous?: boolean }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { anonymous: false, name: "", email: "", subject: "", message: "" },
  });
  const anon = watch("anonymous");
  const field = "mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  const onSubmit = (v: Values) => {
    const body = `${v.message}\n\n${v.anonymous ? "(Submitted anonymously)" : `From: ${v.name || "-"} ${v.email || ""}`}`;
    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(`[${kind}] ${v.subject}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    reset();
  };

  if (sent)
    return (
      <div role="status" className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <h2 className="text-xl font-bold">Thank you</h2>
        <p className="mt-2 text-muted-foreground">Your email app has opened with your message to {ORG.email}. Please press send there to deliver it.</p>
        <Button variant="outline" className="mt-5" onClick={() => setSent(false)}>Write another message</Button>
      </div>
    );

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-card">
      {allowAnonymous && (
        <label className="flex items-center gap-3 rounded-lg bg-muted p-3 text-sm font-medium">
          <input type="checkbox" {...register("anonymous")} className="h-4 w-4 accent-primary" /> Submit anonymously (we will not ask for your name or email)
        </label>
      )}
      {!anon && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-heading">Name (optional)<input {...register("name")} className={field} autoComplete="name" /></label>
          <label className="block text-sm font-semibold text-heading">Email (optional)<input type="email" {...register("email")} className={field} autoComplete="email" />
            {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email.message}</span>}</label>
        </div>
      )}
      <label className="block text-sm font-semibold text-heading">Subject<input {...register("subject")} className={field} aria-invalid={!!errors.subject} />
        {errors.subject && <span className="mt-1 block text-xs text-destructive">{errors.subject.message}</span>}</label>
      <label className="block text-sm font-semibold text-heading">Message<textarea rows={6} {...register("message")} className={field} aria-invalid={!!errors.message} />
        {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message.message}</span>}</label>
      <Button type="submit" size="lg">Send {kind.toLowerCase()}</Button>
    </form>
  );
}
