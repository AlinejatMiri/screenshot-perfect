const DEPTS = [
  {
    label: "Women Empowerment Department",
    detail:
      "Promotes gender equality and women’s leadership; supports women’s economic empowerment, rights awareness and advocacy against harmful practices.",
  },
  {
    label: "Program Department",
    detail:
      "Plans, implements and evaluates programs across areas including education, health, food security and livelihoods, protection, WASH and women’s empowerment.",
  },
  {
    label: "Operations Department",
    detail:
      "Provides operational support through human resources, administration, procurement, logistics, media and ICT functions described in the profile.",
  },
  {
    label: "Finance Department",
    detail:
      "Supports budgeting, forecasting, financial reporting, financial records and project financial planning.",
  },
  {
    label: "MEAL Department",
    detail:
      "Supports monitoring, evaluation, learning, community feedback and response, and social accountability.",
  },
  {
    label: "Compliance Department",
    detail:
      "The profile places internal audit within Compliance and identifies compliance, risk management and control systems as organizational functions.",
  },
];

function Node({
  label,
  detail,
  tone,
}: {
  label: string;
  detail: string;
  tone: "navy" | "primary" | "card";
}) {
  const cls =
    tone === "navy"
      ? "bg-navy text-navy-foreground"
      : tone === "primary"
        ? "bg-primary text-primary-foreground"
        : "bg-card text-heading border border-border";
  return (
    <details className="group rounded-xl shadow-card">
      <summary
        className={`cursor-pointer list-none rounded-xl px-4 py-3 text-center text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cls}`}
      >
        {label}
        <span className="ml-2 text-xs opacity-75 group-open:hidden">Details</span>
        <span className="ml-2 hidden text-xs opacity-75 group-open:inline">Close</span>
      </summary>
      <p className="rounded-b-xl border border-t-0 border-border bg-card p-3 text-center text-xs text-muted-foreground">
        {detail}
      </p>
    </details>
  );
}
const Line = () => <div className="mx-auto h-6 w-0.5 bg-secondary" aria-hidden />;

export function OrgChart() {
  return (
    <figure
      aria-label="PWSO organizational chart"
      className="mb-10 rounded-2xl border border-border bg-muted p-8"
    >
      <figcaption className="mb-6 text-sm text-muted-foreground">
        Select a position for details from PWSO’s provided organizational profile. The profile
        describes four primary departments in one section and six functional departments elsewhere;
        confirm the current approved reporting structure.
      </figcaption>
      <div className="mx-auto max-w-xs">
        <Node
          label="Board of Directors"
          detail="The profile describes Board oversight of strategic direction, internal controls, audits, budgets, performance and compliance."
          tone="navy"
        />
      </div>
      <Line />
      <div className="mx-auto max-w-xs">
        <Node
          label="Executive Director"
          detail="The profile describes the Executive Director as leading organizational operations and working with the Board on mission, goals, policies, reporting, project management and external relations."
          tone="primary"
        />
      </div>
      <Line />
      <div className="mx-auto max-w-xs">
        <Node
          label="Deputy Executive Director"
          detail="The profile describes the Deputy Executive Director as supporting staff capacity, activity coordination, performance reviews, monitoring reports and project-budget oversight."
          tone="primary"
        />
      </div>
      <Line />
      <ul className="grid gap-3 border-t-2 border-secondary pt-6 sm:grid-cols-3 lg:grid-cols-6">
        {DEPTS.map((department) => (
          <li key={department.label}>
            <Node label={department.label} detail={department.detail} tone="card" />
          </li>
        ))}
      </ul>
    </figure>
  );
}
