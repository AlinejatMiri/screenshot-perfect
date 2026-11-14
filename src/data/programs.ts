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
    summary:
      "Expanding access to essential health services and strengthening local health systems.",
    context:
      "PWSO’s profile describes primary healthcare, stronger local health systems, maternal and child health, vaccination and disease-prevention initiatives as areas of work.",
    objectives: [
      "Expand access to basic and essential health services.",
      "Strengthen healthcare systems and disease prevention.",
    ],
    activities: [
      "Support vaccination and maternal and child health initiatives.",
      "Support disease-prevention activities and local health services.",
      "Train health workers and support clinics or mobile health teams where included in a project.",
    ],
    targets: ["Pregnant and lactating women", "Children under five", "Female-headed households"],
    layout: "split",
  },
  {
    slug: "economic-empowerment",
    title: "Economic Empowerment",
    kind: "Thematic area",
    icon: Coins,
    summary:
      "Advancing women’s economic and social development through livelihoods and vocational training.",
    context:
      "PWSO’s profile connects women’s economic empowerment with livelihood skills, vocational training and opportunities for enterprise.",
    objectives: [
      "Support women to develop vocational and livelihood skills.",
      "Promote women’s economic and social development.",
    ],
    activities: [
      "Vocational and livelihood training.",
      "Food processing, preservation and marketing activities where included in a project.",
      "Skills development and enterprise support described in project records.",
    ],
    targets: ["Poor and marginalized women", "Widows", "Female-headed households"],
    layout: "stacked",
  },
  {
    slug: "education",
    title: "Education",
    kind: "Thematic area",
    icon: GraduationCap,
    summary: "Implementing education programs to support learning and community resilience.",
    context:
      "The profile describes work to expand access to schooling for children and adults, alongside literacy, vocational training, teacher support and education rights advocacy.",
    objectives: [
      "Expand access to schooling and learning opportunities.",
      "Support literacy, vocational training and teachers.",
    ],
    activities: [
      "Literacy and vocational training.",
      "Teacher support and community learning activities.",
      "School infrastructure, curriculum development and education rights advocacy where included in a project.",
    ],
    targets: ["Female and male students", "Teachers", "Parents and communities"],
    layout: "split",
  },
  {
    slug: "research-meal",
    title: "Research and MEAL",
    kind: "Thematic area",
    icon: LineChart,
    summary:
      "Research, monitoring, evaluation and learning to inform policy, practice and organizational accountability.",
    context:
      "PWSO’s profile describes research, monitoring, evaluation and data analysis to inform policy and practice, alongside community feedback and social accountability.",
    objectives: [
      "Collect and analyze information to inform decision-making.",
      "Strengthen accountability and learning across programs.",
    ],
    activities: [
      "Research, monitoring, evaluation and data analysis.",
      "Community Feedback and Response Mechanism (CFRM).",
      "Integrate gender equity, safeguarding and social accountability into monitoring and learning.",
    ],
    targets: ["Donors and partners", "Communities", "Program teams"],
    layout: "stacked",
  },
  {
    slug: "agriculture-climate-change",
    title: "Agriculture and Climate Change",
    kind: "Thematic area",
    icon: Sprout,
    summary:
      "Supporting agricultural initiatives and climate awareness to strengthen community resilience.",
    context:
      "The profile describes crop, fruit and vegetable cultivation and livestock as connected to rural livelihoods, food, income, employment, nutrition and raw materials.",
    objectives: [
      "Support sustainable agriculture and climate-change awareness.",
      "Strengthen rural livelihoods through agriculture and livestock activities.",
    ],
    activities: [
      "Agricultural initiatives and climate-change awareness.",
      "Crop, fruit and vegetable cultivation activities.",
      "Livestock-related livelihoods and production activities.",
    ],
    targets: ["Smallholder farmers", "Rural women", "Farming households"],
    layout: "split",
  },
  {
    slug: "women-empowerment",
    title: "Women Empowerment",
    kind: "Technical program",
    icon: Users,
    summary: "Promoting gender equality, women’s leadership, economic empowerment and rights.",
    context:
      "The profile describes skills training, entrepreneurship, advocacy against harmful practices, women’s rights and safe spaces for women and girls.",
    objectives: [
      "Promote women’s leadership, rights and participation.",
      "Support women’s economic empowerment and advocate against harmful practices.",
    ],
    activities: [
      "Skills training, microfinance and entrepreneurship support as described in the profile.",
      "Rights awareness and advocacy against harmful practices.",
      "Safe spaces and integrated gender-responsive activities where included in a project.",
    ],
    targets: ["Women and girls", "Men and community leaders"],
    layout: "stacked",
  },
  {
    slug: "food-security-livelihood",
    title: "Food Security and Livelihood",
    kind: "Technical program",
    icon: Wheat,
    summary: "Supporting food access, agriculture and rural livelihoods.",
    context:
      "The profile links food security and livelihoods with access to food, support to farmers, nutrition activities, emergency food assistance and resilience to drought or crop failure.",
    objectives: [
      "Support reliable access to food.",
      "Strengthen farming, rural livelihoods and resilience.",
    ],
    activities: [
      "Support farmers with seeds, tools and training.",
      "Nutrition activities and emergency food distribution where included in a project.",
      "Support resilience to drought and crop failure.",
    ],
    targets: ["Food-insecure households", "Female-headed households"],
    layout: "split",
  },
  {
    slug: "wash-engineering",
    title: "WASH and Engineering",
    kind: "Technical program",
    icon: Droplets,
    summary:
      "Developing community infrastructure and supporting clean water, sanitation and hygiene.",
    context:
      "The profile describes clean water sources, latrines, hygiene promotion, sanitation improvements and responses to waterborne disease outbreaks.",
    objectives: [
      "Support access to clean water and sanitation.",
      "Promote hygiene and community infrastructure.",
    ],
    activities: [
      "Water sources, wells and water-purification systems.",
      "Latrine construction and sanitation improvements.",
      "Hygiene education and response to waterborne disease outbreaks.",
    ],
    targets: ["Rural communities", "Schools", "Households"],
    layout: "stacked",
  },
  {
    slug: "emergency-response",
    title: "Emergency Response",
    kind: "Technical program",
    icon: Siren,
    summary: "Supporting disaster mitigation and emergency response in affected communities.",
    context:
      "The profile includes disaster-mitigation activities in affected areas and emergency response as part of PWSO’s integrated programming.",
    objectives: [
      "Support disaster mitigation in affected areas.",
      "Contribute to emergency response through project-based interventions.",
    ],
    activities: [
      "Disaster-mitigation activities in affected target areas.",
      "Emergency-response activities described in approved project records.",
      "Coordination through relevant humanitarian mechanisms where specified by a project.",
    ],
    targets: ["Conflict- and disaster-affected communities", "Displaced families"],
    layout: "split",
  },
  {
    slug: "protection",
    title: "Protection",
    kind: "Technical program",
    icon: ShieldCheck,
    summary: "Integrating protection, safeguarding and inclusion across PWSO’s programming.",
    context:
      "The profile identifies protection, safeguarding, PSEA and inclusion of women, girls, persons with disabilities, returnees and other vulnerable groups as cross-cutting priorities.",
    objectives: [
      "Promote safe and inclusive programming.",
      "Strengthen protection and safeguarding across interventions.",
    ],
    activities: [
      "Integrate safeguarding and PSEA into program systems.",
      "Promote accountability to affected people.",
      "Include protection considerations in project design and delivery.",
    ],
    targets: [
      "Women and girls",
      "Persons with disabilities",
      "Returnees",
      "Other vulnerable groups",
    ],
    layout: "stacked",
  },
];

export const getProgram = (slug: string) => PROGRAMS.find((p) => p.slug === slug);
