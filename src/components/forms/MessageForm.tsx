import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ORG } from "@/data/site";

const schema = z.object({
  anonymous: z.boolean(),
  name: z.string().trim().max(100).optional(),
  email: z
    .union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)])
    .optional(),
  subject: z.string().trim().min(3, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(3000),
});
type Values = z.infer<typeof schema>;

export function MessageForm({
  kind,
  allowAnonymous = false,
}: {
  kind: "Contact" | "Feedback" | "Complaint";
  allowAnonymous?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { anonymous: false, name: "", email: "", subject: "", message: "" },
  });
  const anon = watch("anonymous");
  const field =
    "mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  const onSubmit = (v: Values) => {
    const body = `${v.message}\n\n${v.anonymous ? "(No name or email address included in this draft)" : `From: ${v.name || "-"} ${v.email || ""}`}`;
    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(`[${kind}] ${v.subject}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent)
    return (
      <div role="status" className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <h2 className="text-xl font-bold">Email draft prepared</h2>
        <p className="mt-2 text-muted-foreground">
          Your email app may have opened with a draft to {ORG.email}. The message has not been sent
          or stored by this website. Review it and press Send in your email app to deliver it.
        </p>
        <Button
          variant="outline"
          className="mt-5"
          onClick={() => {
            setSent(false);
            reset();
          }}
        >
          Write another message
        </Button>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-card"
    >
      <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
        This form prepares a message in your email app. It does not send information to PWSO. Avoid
        including sensitive details; your email provider may identify you even when you select
        anonymous.
      </p>
      {allowAnonymous && (
        <label className="flex items-center gap-3 rounded-lg bg-muted p-3 text-sm font-medium">
          <input type="checkbox" {...register("anonymous")} className="h-4 w-4 accent-primary" /> Do
          not include my name or email address in the draft
        </label>
      )}
      {!anon && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-heading">
            Name (optional)
            <input {...register("name")} className={field} autoComplete="name" />
          </label>
          <label className="block text-sm font-semibold text-heading">
            Email (optional)
            <input
              type="email"
              {...register("email")}
              className={field}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" role="alert" className="mt-1 block text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
      )}
      <label className="block text-sm font-semibold text-heading">
        Subject{" "}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
        <input
          {...register("subject")}
          required
          className={field}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <span id="subject-error" role="alert" className="mt-1 block text-xs text-destructive">
            {errors.subject.message}
          </span>
        )}
      </label>
      <label className="block text-sm font-semibold text-heading">
        Message{" "}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
        <textarea
          rows={6}
          {...register("message")}
          required
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" role="alert" className="mt-1 block text-xs text-destructive">
            {errors.message.message}
          </span>
        )}
      </label>
      <Button type="submit" size="lg">
        Send {kind.toLowerCase()}
      </Button>
    </form>
  );
}
