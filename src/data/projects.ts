export type Project = {
  slug: string;
  title: string;
  year: number;
  donor: string;
  budgetUsd: number;
  province: string;
  beneficiaries: string;
  program: string; // program slug
  status: "Ongoing" | "Completed";
  overview: string;
  needsVerification: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "pickles-preparation-marketing-2018",
    title: "Preparation of Various Types of Pickles and Marketing",
    year: 2018,
    donor: "PWSO Core Fund",
    budgetUsd: 2500,
    province: "Daikundi",
    beneficiaries: "25 women",
    program: "economic-empowerment",
    status: "Completed",
    overview: "Vocational training for women in preparing and marketing various types of pickles to generate household income.",
    needsVerification: ["Project duration", "District", "Achieved results"],
  },
  {
    slug: "access-to-quality-education-2018",
    title: "Access to Quality Education Program",
    year: 2018,
    donor: "Jesuit Refugee Service",
    budgetUsd: 117290,
    province: "Badakhshan",
    beneficiaries: "2,000 female and male students",
    program: "education",
    status: "Completed",
    overview: "A program supporting access to quality education for female and male students in Badakhshan.",
    needsVerification: ["Project duration", "Districts", "Achieved results"],
  },
  {
    slug: "women-unlawful-traditional-practices-2019",
    title: "Women and Unlawful Traditional Practices Awareness Project",
    year: 2019,
    donor: "Aga Khan Foundation",
    budgetUsd: 20000,
    province: "Kunduz",
    beneficiaries: "150 men and women",
    program: "women-empowerment",
    status: "Completed",
    overview: "Awareness raising with men and women on unlawful traditional practices affecting women.",
    needsVerification: ["Project duration", "District", "Achieved results"],
  },
  {
    slug: "seasonal-fruits-vegetables-processing-2025",
    title: "Capacity Building Program for Women in Processing Seasonal Fruits and Vegetables and Marketing",
    year: 2025,
    donor: "AALCC contribution",
    budgetUsd: 45000,
    province: "Kunduz",
    beneficiaries: "250 women",
    program: "agriculture-climate-change",
    status: "Ongoing",
    overview: "Building women's skills in processing seasonal fruits and vegetables and connecting their products to markets.",
    needsVerification: ["Project status", "Duration", "District", "Donor full name"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const formatUsd = (n: number) => "$" + n.toLocaleString("en-US");
