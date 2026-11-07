import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CTASection({
  title = "Partner with PWSO for lasting change",
  text = "Work with us to reach women and communities across Afghanistan with programs that last.",
}: { title?: string; text?: string }) {
  return (
    <section className="container-x py-16">
      <div className="relative overflow-hidden rounded-3xl bg-band px-8 py-12 text-navy-foreground md:px-14">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-accent/25" aria-hidden />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold text-navy-foreground">{title}</h2>
            <p className="mt-3 opacity-85">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg"><Link to="/partners/become-a-partner">Become a partner</Link></Button>
            <Button asChild variant="heroGhost" size="lg"><Link to="/contact">Contact us</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
