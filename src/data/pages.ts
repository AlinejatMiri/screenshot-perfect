import { ORG } from "./site";

export type Block = { heading: string; body?: string; list?: string[]; todo?: string };
export type ContentPage = { title: string; intro: string; blocks: Block[] };
export type Section = { title: string; intro: string; pages: Record<string, ContentPage> };

export const SECTIONS: Record<string, Section> = {
  about: {
    title: "About PWSO",
    intro: `${ORG.name} is a national, non-governmental, non-profit organization established in ${ORG.established} to support women and marginalized communities across Afghanistan.`,
    pages: {
      "who-we-are": {
        title: "Who We Are",
        intro: "A national NGO rooted in Afghan communities, working in partnership for change.",
        blocks: [
          {
            heading: "Organizational background",
            body: `PWSO was established in ${ORG.established} as a national, non-governmental, non-profit organization. We work with poor and marginalized women, their families and communities to build skills, livelihoods and resilience.`,
          },
          {
            heading: "Registration",
            list: [
              ORG.license,
              `Established ${ORG.established}`,
              "National, non-governmental, non-profit",
            ],
          },
          { heading: "Our offices", list: ORG.offices.map((o) => `${o.city} — ${o.type}`) },
        ],
      },
      "vision-mission-goals": {
        title: "Vision, Mission & Goals",
        intro:
          "Building resilient, self-reliant communities and driving change from the ground up.",
        blocks: [
          {
            heading: "Vision",
            body: "Building resilient and self-reliant communities; driving change from the ground up.",
          },
          {
            heading: "Mission",
            body: "To empower Afghan communities—especially women and vulnerable groups—through education, health, social welfare and research initiatives that foster peace, equity and sustainable socio-economic development, while building long-term partnerships with national and international stakeholders.",
          },
          {
            heading: "Goals",
            list: [
              "Advance education, health, social welfare and research initiatives.",
              "Support peace, equity and sustainable socio-economic development.",
              "Build long-term partnerships with national and international stakeholders.",
              "Contribute to an educated, peaceful and socially and economically developed Afghanistan.",
            ],
          },
        ],
      },
      history: {
        title: "Our History",
        intro: `From a woman-led initiative in ${ORG.established} to a multi-sector national NGO.`,
        blocks: [
          {
            heading: "2017 — Establishment",
            body: `PWSO is founded and registered with the Ministry of Economy (${ORG.license}).`,
          },
          {
            heading: "2018 — First programs",
            body: "Women's food processing training in Daikundi and an education program in Badakhshan with Jesuit Refugee Service.",
          },
          {
            heading: "2019 — Women's rights awareness",
            body: "Awareness project on unlawful traditional practices in Kunduz with the Aga Khan Foundation.",
          },
          {
            heading: "2025 — Value chains for women",
            body: "Capacity building for women in processing seasonal fruits and vegetables in Kunduz.",
          },
        ],
      },
      "core-values": {
        title: "Core Values",
        intro: "The four core values named in PWSO’s organizational profile.",
        blocks: [
          {
            heading: "Equality and Justice",
            body: "We uphold fairness and protect the rights of marginalized Afghan women and communities, ensuring every voice is valued and every person is treated with dignity.",
          },
          {
            heading: "Non-Discrimination",
            body: "Our programs aim to provide equal access regardless of ethnicity, religion or social status.",
          },
          {
            heading: "Transparency and Accountability",
            body: "We uphold integrity and remain open and answerable to our stakeholders and communities.",
          },
          {
            heading: "Speed and Excellence",
            body: "We aim to deliver timely, efficient and high-quality interventions that respond to needs.",
          },
        ],
      },
      leadership: {
        title: "Leadership",
        intro: "A message from PWSO’s leadership, adapted from the organizational profile.",
        blocks: [
          {
            heading: "A message from PWSO leadership",
            body: "PWSO’s programs address interconnected needs through integrated approaches spanning livelihoods, food security, protection, WASH, gender equality, health, education and emergency response. The organization’s profile emphasizes accountability to affected people, safeguarding and inclusion of women, girls, persons with disabilities, returnees and other vulnerable groups.",
          },
          {
            heading: "Strengthening Afghan-led work",
            body: "The profile describes PWSO’s engagement in coordination and dialogue with UN agencies, donors and civil society partners, contributing Afghan-led perspectives and advocating for principled, inclusive and accountable aid delivery.",
          },
          {
            heading: "Looking ahead",
            body: "PWSO’s stated priorities include deepening its impact, strengthening Afghan civil society and expanding its role in safe, evidence-driven programming, delivered with integrity.",
          },
        ],
      },
      mandate: {
        title: "Our Mandate",
        intro: "Why PWSO exists and what it is committed to.",
        blocks: [
          {
            heading: "Institutional mandate",
            body: "PWSO’s mandate guides community-development work that supports mobilization, participation and local resource mobilization; self-help and self-reliance; sustainable livelihoods, food security and micro-enterprise; needs-based infrastructure; environmental protection, gender awareness and human rights; disaster mitigation; peacebuilding and post-conflict rehabilitation; and organizational development.",
          },
        ],
      },
      approach: {
        title: "Our Approach",
        intro: "Grounded in local solutions, professional standards and community participation.",
        blocks: [
          {
            heading: "Local solutions and participation",
            body: "PWSO’s profile states that local problems call for local solutions. Its mandate emphasizes community mobilization, participation and local resource mobilization, alongside support for community-led self-help and self-reliance.",
          },
          {
            heading: "Partnership and professionalism",
            body: "The profile describes relationships with donors as grounded in trust, knowledge, qualification, reliability, integrity and confidentiality. It also emphasizes understanding donor requirements and maintaining ethical standards.",
          },
          {
            heading: "Integrated programming and learning",
            body: "PWSO’s profile links programming across livelihoods, food security, protection, WASH, gender equality, health, education and emergency response, with research and MEAL supporting evidence-informed work.",
          },
          {
            heading: "Ethical and responsible delivery",
            body: "The profile describes commitments to ethical conduct, environmental responsibility, accountability to affected people and safeguarding across interventions.",
          },
        ],
      },
      "organizational-capacity": {
        title: "Organizational Capacity",
        intro: "The systems, people and experience behind our programs.",
        blocks: [
          { heading: "Office locations", list: ORG.offices.map((o) => `${o.city} — ${o.type}`) },
          { heading: "Geographic areas named in the profile", list: ORG.profileCoverageAreas },
          {
            heading: "Functional departments listed in the profile",
            list: [
              "Program",
              "MEAL",
              "Finance",
              "Operations",
              "Women Empowerment",
              "Compliance and Internal Audit",
            ],
          },
          {
            heading: "Women’s participation",
            body: "The profile reports that women make up more than half of PWSO’s workforce, including senior leadership. It does not provide a reporting date or staff denominator, so this figure should be refreshed against current HR records before being treated as current.",
          },
        ],
      },
    },
  },
  governance: {
    title: "Governance & Structure",
    intro: "How PWSO is governed, managed and held accountable.",
    pages: {
      structure: {
        title: "Organizational Structure",
        intro:
          "The organizational profile describes Board oversight, executive management and six functional departments.",
        blocks: [
          {
            heading: "Reporting and oversight",
            body: "The profile describes the Board of Directors as the governing body. The Executive Director leads the organization, supported by a Deputy Executive Director. Department heads report to the Deputy Executive Director, who reports to the Executive Director.",
          },
          {
            heading: "Departments",
            list: [
              "Women Empowerment",
              "Program",
              "Operations",
              "Finance",
              "MEAL",
              "Compliance / Internal Audit",
            ],
          },
          {
            heading: "Structure note",
            body: "The profile also refers to four primary departments in one section and lists six functional departments elsewhere. This chart follows the six functional departments described in the department profiles; please confirm the current approved organogram.",
          },
        ],
      },
      board: {
        title: "Board of Directors",
        intro: "The Board of Directors provides governance and strategic direction.",
        blocks: [
          {
            heading: "Composition and experience",
            body: "PWSO’s profile describes Board members drawn from diverse backgrounds, including NGO executives, educators and civil society activists. It says members are selected for skills in NGO management, program implementation, gender issues and education. Individual names and biographies are not included in the profile.",
          },
          {
            heading: "Fiduciary responsibilities described in the profile",
            list: [
              "Oversee internal controls and audits",
              "Develop conflict-of-interest protocols",
              "Review budgets and monitor performance",
              "Support compliance with applicable laws",
            ],
          },
        ],
      },
      departments: {
        title: "Departments",
        intro: "Each department contributes to quality, accountable delivery.",
        blocks: [
          {
            heading: "Program Department",
            body: "Plans, implements and evaluates projects. The profile describes program work spanning education, health, food security and livelihoods, protection, WASH, women’s empowerment, construction and fundraising.",
          },
          {
            heading: "MEAL Department",
            body: "The profile describes monitoring and evaluation functions, community feedback and response, safeguarding and social accountability, with findings informing program learning.",
          },
          {
            heading: "Finance Department",
            body: "Oversees budgeting, forecasting and financial reporting, and supports project managers with financial planning and records.",
          },
          {
            heading: "Operations Department",
            body: "Supports program delivery through human resources, administration, procurement, logistics, media and ICT functions described in the profile.",
          },
          {
            heading: "Women Empowerment Department",
            body: "Promotes gender equality, women’s leadership, economic empowerment, rights awareness and advocacy against harmful practices, as described in the profile.",
          },
          {
            heading: "Compliance and Internal Audit",
            body: "The profile places internal audit within the Compliance Department. It describes compliance, risk management, financial control, procurement, safeguarding and security as areas supported by organizational systems.",
          },
        ],
      },
      policies: {
        title: "Policies",
        intro: "Policy areas identified in PWSO’s organizational profile.",
        blocks: [
          {
            heading: "Key policies",
            body: "The profile says PWSO maintains policies and systems related to compliance, risk management, financial control, procurement, safeguarding and security. The documents themselves are not included here.",
            list: [
              "Compliance",
              "Risk management",
              "Financial control",
              "Procurement",
              "Safeguarding / PSEA",
              "Security",
            ],
          },
        ],
      },
      accountability: {
        title: "Accountability",
        intro: "We are accountable to the communities we serve, our partners and donors.",
        blocks: [
          {
            heading: "To communities",
            body: "The profile prioritizes accountability to affected people and describes a Community Feedback and Response Mechanism (CFRM). The website’s current complaint form only prepares an email draft; it is not a connected CFRM.",
          },
          {
            heading: "To partners and donors",
            body: "The profile describes monitoring, evaluation, financial controls, internal audit and donor reporting as components of organizational accountability.",
          },
        ],
      },
      safeguarding: {
        title: "Safeguarding",
        intro:
          "Safeguarding and protection commitments described in PWSO’s organizational profile.",
        blocks: [
          {
            heading: "Our commitment",
            body: "PWSO’s profile states a zero-tolerance position on exploitation, abuse and aid diversion, and identifies safeguarding and PSEA among its organizational priorities.",
          },
          {
            heading: "Reporting a concern",
            body: "The complaints page prepares a draft email and does not transmit or store submissions. A verified confidential hotline or secure reporting platform is not listed on this website.",
          },
        ],
      },
    },
  },
  partners: {
    title: "Partners & Coordination",
    intro: "We work alongside donors, partners and humanitarian coordination mechanisms.",
    pages: {
      donors: {
        title: "Donors",
        intro: "Organizations that have funded PWSO projects.",
        blocks: [
          {
            heading: "Aga Khan Foundation",
            body: "Funded the Women and Unlawful Traditional Practices Awareness Project (2019, Kunduz).",
          },
          {
            heading: "Jesuit Refugee Service (JRS)",
            body: "Funded the Access to Quality Education Program (2018, Badakhshan).",
          },
          {
            heading: "Azar Afrang Logistic & Construction Services Company (AALCC)",
            body: "The profile lists an AALCC contribution to the 2025 women’s fruit and vegetable processing program in Kunduz. Related project figures are marked for confirmation.",
          },
        ],
      },
      "strategic-partners": {
        title: "Strategic Partners",
        intro:
          "Project relationships named in the supplied profile. It does not provide a separate verified list of strategic partners.",
        blocks: [
          {
            heading: "Aga Khan Foundation",
            body: "Named in connection with the 2019 women’s awareness project in Kunduz.",
          },
          {
            heading: "Jesuit Refugee Service (JRS)",
            body: "Named in connection with the 2018 education program in Badakhshan.",
          },
        ],
      },
      clusters: {
        title: "Clusters",
        intro: "Humanitarian clusters PWSO participates in.",
        blocks: [
          {
            heading: "Clusters",
            list: [
              "ES/NFI-Shelter",
              "Education",
              "FSAC",
              "WASH",
              "Child Protection",
              "Health",
              "Protection",
            ],
            todo: "Confirm current membership",
          },
        ],
      },
      "working-groups": {
        title: "Working Groups",
        intro: "Coordination forums and working groups.",
        blocks: [
          {
            heading: "Working groups",
            list: [
              "GIHA UN Women",
              "OCHA",
              "UNDP-NCCSP",
              "ACVAP",
              "ADIWG",
              "CPW Stream",
              "Cash Working Group",
            ],
            todo: "Confirm current membership",
          },
        ],
      },
      "become-a-partner": {
        title: "Become a Partner",
        intro: "Work with PWSO to reach women and communities across Afghanistan.",
        blocks: [
          {
            heading: "Why partner with PWSO",
            list: [
              "Community presence through offices in Kabul, Badakhshan and Kunduz",
              "Experience across education, livelihoods and women's rights",
              "Commitment to transparency and accountability",
            ],
          },
          {
            heading: "Get in touch",
            body: `Email ${ORG.email} or use our contact page to start a conversation.`,
          },
        ],
      },
    },
  },
  resources: {
    title: "Resources & Publications",
    intro: "Reports, research, policies and media from PWSO.",
    pages: {
      reports: {
        title: "Reports",
        intro: "Annual and project reports.",
        blocks: [
          {
            heading: "Sample document area",
            body: "This page includes demonstration entries so visitors can see where annual reports, project reports and evaluations will be listed. Replace all sample material with approved documents.",
          },
        ],
      },
      research: {
        title: "Research",
        intro: "Assessments and studies.",
        blocks: [
          {
            heading: "Sample research collection",
            body: "Use this space for approved assessments, surveys and learning studies, with a short description, publication date and downloadable file.",
          },
        ],
      },
      publications: {
        title: "Publications",
        intro: "Briefs and publications.",
        blocks: [
          {
            heading: "Sample publication shelf",
            body: "This layout is ready for program briefs, community guides and advocacy publications once they are reviewed for release.",
          },
        ],
      },
      policies: {
        title: "Policy Documents",
        intro: "Approved institutional policies.",
        blocks: [
          {
            heading: "Sample policy listing",
            body: "Published policy documents should include their approval date, version and a contact point for accessibility requests.",
          },
        ],
      },
      profiles: {
        title: "Profiles",
        intro: "Organizational profiles.",
        blocks: [
          {
            heading: "Sample profile collection",
            body: "Organizational, program and regional profiles can be featured here with current version dates and accessible downloads.",
          },
        ],
      },
      gallery: {
        title: "Gallery",
        intro: "Photos from our work.",
        blocks: [
          {
            heading: "Visual stories",
            body: "The sample images below show the intended grid. Only use images with appropriate permissions and captions.",
          },
        ],
      },
      videos: {
        title: "Videos",
        intro: "Video stories from the field.",
        blocks: [
          {
            heading: "Sample video area",
            body: "Embed approved video stories here, each with a title, transcript, duration and short description.",
          },
        ],
      },
      "success-stories": {
        title: "Success Stories",
        intro: "Stories of change from the communities we work with.",
        blocks: [
          {
            heading: "Sample story collection",
            body: "Stories of change can introduce a participant’s journey, the activity they joined and the result they describe, always with informed consent.",
          },
        ],
      },
    },
  },
  "get-involved": {
    title: "Opportunities",
    intro:
      "Find PWSO requests for proposals and quotations, job announcements, training and events.",
    pages: {
      rfp: {
        title: "RFP",
        intro: "Requests for proposals from PWSO.",
        blocks: [
          {
            heading: "How to use this board",
            body: "Sample notices below illustrate the fields for reference number, scope, deadline and submission instructions.",
          },
        ],
      },
      rfq: {
        title: "RFQ",
        intro: "Requests for quotations from PWSO.",
        blocks: [
          {
            heading: "How to use this board",
            body: "Sample notices below illustrate the fields for reference number, scope, deadline and submission instructions.",
          },
        ],
      },
      "job-announcement": {
        title: "Job Announcement",
        intro: "Employment opportunities with PWSO.",
        blocks: [
          {
            heading: "Work with us",
            body: "Sample job cards below demonstrate where vacancy details, application requirements and closing dates will be shown.",
          },
        ],
      },
      training: {
        title: "Training",
        intro: "Training opportunities and services offered by PWSO.",
        blocks: [
          {
            heading: "Learning opportunities",
            body: "Use this page to introduce training courses, eligibility, location, dates and application details.",
          },
        ],
      },
      events: {
        title: "Events",
        intro: "Events hosted or supported by PWSO.",
        blocks: [
          {
            heading: "Events calendar",
            body: "Sample event cards below show how future workshops, discussions and public events can be shared.",
          },
        ],
      },
    },
  },
};
