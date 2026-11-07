const DEPTS = ["Program", "MEAL", "Finance", "Operations", "Women Empowerment", "Internal Audit & Compliance"];

function Node({ label, tone }: { label: string; tone: "navy" | "primary" | "card" }) {
  const cls = tone === "navy" ? "bg-navy text-navy-foreground" : tone === "primary" ? "bg-primary text-primary-foreground" : "bg-card text-heading border border-border";
  return <div className={`rounded-xl px-5 py-3 text-center text-sm font-semibold shadow-card ${cls}`}>{label}</div>;
}
const Line = () => <div className="mx-auto h-6 w-0.5 bg-secondary" aria-hidden />;

export function OrgChart() {
  return (
    <figure aria-label="PWSO organizational chart" className="mb-10 rounded-2xl border border-border bg-muted p-8">
      <div className="mx-auto max-w-xs"><Node label="Board of Directors" tone="navy" /></div>
      <Line />
      <div className="mx-auto max-w-xs"><Node label="Executive Director" tone="primary" /></div>
      <Line />
      <div className="mx-auto max-w-xs"><Node label="Deputy Executive Director" tone="primary" /></div>
      <Line />
      <ul className="grid gap-3 border-t-2 border-secondary pt-6 sm:grid-cols-3 lg:grid-cols-6">
        {DEPTS.map((d) => <li key={d}><Node label={`${d}${d.includes("Audit") ? "" : " Dept."}`} tone="card" /></li>)}
      </ul>
    </figure>
  );
}
