import {
  HeartPulse,
  Coins,
  GraduationCap,
  LineChart,
  Sprout,
  Users,
  Wheat,
  Droplets,
  Siren,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  kind: "Thematic area" | "Technical program";
  icon: LucideIcon;
  summary: string;
  context: string;
  objectives: string[];
  activities: string[];
  targets: string[];
  layout: "split" | "stacked";
};

export const PROGRAMS: Program[] = [
  {
    slug: "health-nutrition",
    title: "Health and Nutrition",
    kind: "Thematic area",
    icon: HeartPulse,
    summary: "Improving access to basic health awareness and nutrition for women, children and families.",
    context:
      "Many rural households face limited access to health services and nutrition information, with women and young children most affected.",
    objectives: [
      "Increase awareness of maternal and child health and nutrition practices.",
      "Strengthen community-level referral to available health services.",
    ],
    activities: ["Community health and nutrition awareness sessions", "Hygiene and nutrition education for mothers", "Coordination with health service providers"],
    targets: ["Pregnant and lactating women", "Children under five", "Female-headed households"],
    layout: "split",
  },
  {
    slug: "economic-empowerment",
    title: "Economic Empowerment",
    kind: "Thematic area",
    icon: Coins,
    summary: "Helping women build skills, income and market connections for lasting self-reliance.",
    context:
      "Women in Afghanistan face significant barriers to income, skills and markets. Small-scale enterprise and value-chain support can open realistic pathways to self-reliance.",
    objectives: ["Build marketable vocational and enterprise skills.", "Connect women producers to local markets."],
    activities: ["Food processing and preservation training", "Small business and marketing skills", "Producer group formation"],
    targets: ["Poor and marginalized women", "Widows", "Female-headed households"],
    layout: "stacked",
  },
  {
    slug: "education",
    title: "Education",
    kind: "Thematic area",
    icon: GraduationCap,
    summary: "Supporting access to quality learning for girls, boys and young people.",
    context:
      "Access to quality education remains uneven, particularly in remote provinces such as Badakhshan, and for girls.",
    objectives: ["Improve access to quality learning opportunities.", "Support teachers and learning environments."],
    activities: ["Access to quality education programming", "Learning materials and teacher support", "Community engagement on education"],
    targets: ["Female and male students", "Teachers", "Parents and communities"],
    layout: "split",
  },
  {
    slug: "research-meal",
    title: "Research and MEAL",
    kind: "Thematic area",
    icon: LineChart,
    summary: "Monitoring, evaluation, accountability and learning that keeps our work evidence-based.",
    context: "Reliable evidence and community feedback are essential to effective, accountable humanitarian and development work.",
    objectives: ["Ensure quality and accountability across projects.", "Generate learning that informs program design."],
    activities: ["Baseline and endline assessments", "Third-party monitoring", "Community feedback mechanisms"],
    targets: ["Donors and partners", "Communities", "Program teams"],
    layout: "stacked",
  },
  {
    slug: "agriculture-climate-change",
    title: "Agriculture and Climate Change",
    kind: "Thematic area",
    icon: Sprout,
    summary: "Strengthening climate-resilient farming and natural resource practices in rural communities.",
    context: "Drought and climate shocks threaten rural livelihoods that depend on agriculture.",
    objectives: ["Promote climate-resilient agricultural practices.", "Support post-harvest processing to reduce loss."],
    activities: ["Kitchen gardening and farming skills", "Post-harvest processing of fruits and vegetables", "Climate awareness"],
    targets: ["Smallholder farmers", "Rural women", "Farming households"],
    layout: "split",
  },
  {
    slug: "women-empowerment",
    title: "Women Empowerment",
    kind: "Technical program",
    icon: Users,
    summary: "Advancing women's participation, rights awareness and leadership in their communities.",
    context: "Harmful traditional practices and limited participation constrain women's opportunities.",
    objectives: ["Raise awareness of women's rights and harmful practices.", "Strengthen women's voice in community decisions."],
    activities: ["Awareness on unlawful traditional practices", "Community dialogues with men and women", "Women's groups"],
    targets: ["Women and girls", "Men and community leaders"],
    layout: "stacked",
  },
  {
    slug: "food-security-livelihood",
    title: "Food Security and Livelihood",
    kind: "Technical program",
    icon: Wheat,
    summary: "Helping vulnerable households meet food needs and rebuild livelihoods.",
    context: "Many households face food insecurity driven by economic and climate shocks.",
    objectives: ["Improve household food security.", "Restore and diversify livelihoods."],
    activities: ["Livelihood skills training", "Food processing and preservation", "Coordination with FSAC"],
    targets: ["Food-insecure households", "Female-headed households"],
    layout: "split",
  },
  {
    slug: "wash-engineering",
    title: "WASH and Engineering",
    kind: "Technical program",
    icon: Droplets,
    summary: "Water, sanitation and hygiene, and small community infrastructure.",
    context: "Safe water and sanitation remain out of reach for many rural communities.",
    objectives: ["Improve access to safe water and sanitation.", "Promote hygiene practices."],
    activities: ["Hygiene promotion", "Small-scale water and sanitation works", "Coordination with the WASH cluster"],
    targets: ["Rural communities", "Schools", "Households"],
    layout: "stacked",
  },
  {
    slug: "emergency-response",
    title: "Emergency Response",
    kind: "Technical program",
    icon: Siren,
    summary: "Timely, principled response to communities affected by crises and disasters.",
    context: "Natural disasters, displacement and economic shocks create urgent humanitarian needs.",
    objectives: ["Respond quickly to urgent needs.", "Coordinate through humanitarian clusters."],
    activities: ["Needs assessments", "Emergency relief coordination", "ES/NFI and shelter coordination"],
    targets: ["Conflict- and disaster-affected communities", "Displaced families"],
    layout: "split",
  },
  {
    slug: "protection",
    title: "Protection",
    kind: "Technical program",
    icon: ShieldCheck,
    summary: "Promoting the safety, dignity and rights of women, children and at-risk groups.",
    context: "Women, girls and children face protection risks that require safe, confidential support.",
    objectives: ["Reduce protection risks.", "Strengthen safe referral pathways."],
    activities: ["Protection awareness", "Child protection coordination", "Referral to services"],
    targets: ["Girls at risk", "Vulnerable children and youth", "Widows"],
    layout: "stacked",
  },
];

export const getProgram = (slug: string) => PROGRAMS.find((p) => p.slug === slug);
