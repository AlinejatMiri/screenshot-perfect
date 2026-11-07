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
          { heading: "Registration", list: [ORG.license, `Established ${ORG.established}`, "National, non-governmental, non-profit"] },
          { heading: "Our offices", list: ORG.offices.map((o) => `${o.city} — ${o.type}`) },
        ],
      },
      "vision-mission-goals": {
        title: "Vision, Mission & Goals",
        intro: "What guides every program we design and deliver.",
        blocks: [
          { heading: "Vision", todo: "Official vision statement" },
          { heading: "Mission", todo: "Official mission statement" },
          {
            heading: "Goals",
            list: [
              "Empower poor and marginalized women economically and socially.",
              "Strengthen community resilience and sustainable livelihoods.",
              "Improve access to education, health and protection services.",
            ],
            todo: "Confirm official goals wording",
          },
        ],
      },
      history: {
        title: "Our History",
        intro: `From a small community initiative in ${ORG.established} to a multi-sector national NGO.`,
        blocks: [
          { heading: "2017 — Establishment", body: `PWSO is founded and registered with the Ministry of Economy (${ORG.license}).` },
          { heading: "2018 — First programs", body: "Women's food processing training in Daikundi and an education program in Badakhshan with Jesuit Refugee Service." },
          { heading: "2019 — Women's rights awareness", body: "Awareness project on unlawful traditional practices in Kunduz with the Aga Khan Foundation." },
          { heading: "2025 — Value chains for women", body: "Capacity building for women in processing seasonal fruits and vegetables in Kunduz." },
        ],
      },
      "core-values": {
        title: "Core Values",
        intro: "Six principles that shape how we work with communities and partners.",
        blocks: [
          { heading: "Equality and Justice", body: "We work for fair treatment and equal opportunity for women and men." },
          { heading: "Non-Discrimination", body: "We serve people based on need, regardless of ethnicity, religion or background." },
          { heading: "Transparency and Accountability", body: "We are open about how we use resources and answer to communities and donors." },
          { heading: "Speed and Excellence", body: "We respond quickly and hold ourselves to high standards of quality." },
          { heading: "Participation", body: "Communities take part in designing and reviewing the work that affects them." },
          { heading: "Sustainability", body: "We build skills and systems that last beyond any single project." },
        ],
      },
      leadership: {
        title: "Leadership",
        intro: "A message from PWSO's leadership.",
        blocks: [
          { heading: "Message from the Executive Director", todo: "Leadership message, name and photo of the Executive Director" },
        ],
      },
      mandate: {
        title: "Our Mandate",
        intro: "Why PWSO exists and what it is committed to.",
        blocks: [
          {
            heading: "Institutional mandate",
            body: "To support poor and marginalized women and their communities through sustainable development, humanitarian assistance and partnership.",
            todo: "Confirm official mandate wording",
          },
        ],
      },
      approach: {
        title: "Our Approach",
        intro: "Community-led, evidence-based and built for sustainability.",
        blocks: [
          { heading: "Community participation", body: "Communities help identify needs, shape activities and review results." },
          { heading: "Partnership", body: "We work with donors, international and national partners, and coordination mechanisms." },
          { heading: "Evidence and learning", body: "Monitoring, evaluation, accountability and learning (MEAL) inform every stage." },
          { heading: "Sustainability", body: "We invest in skills, market linkages and local structures that continue after projects end." },
        ],
      },
      "organizational-capacity": {
        title: "Organizational Capacity",
        intro: "The systems, people and experience behind our programs.",
        blocks: [
          { heading: "Presence", list: ORG.offices.map((o) => `${o.city} — ${o.type}`) },
          { heading: "Departments", list: ["Program", "MEAL", "Finance", "Operations", "Women Empowerment", "Internal Audit and Compliance"] },
          { heading: "Staff and systems", todo: "Staff numbers, finance and procurement systems, audits" },
        ],
      },
    },
  },
  governance: {
    title: "Governance & Structure",
    intro: "How PWSO is governed, managed and held accountable.",
    pages: {
      structure: { title: "Organizational Structure", intro: "Our governance and management structure.", blocks: [] },
      board: {
        title: "Board of Directors",
        intro: "The Board provides strategic oversight and ensures accountability.",
        blocks: [{ heading: "Board members", todo: "Names, roles and short bios of Board members" }],
      },
      departments: {
        title: "Departments",
        intro: "Each department contributes to quality, accountable delivery.",
        blocks: [
          { heading: "Program Department", body: "Designs and implements projects across thematic areas." },
          { heading: "MEAL Department", body: "Leads monitoring, evaluation, accountability and learning." },
          { heading: "Finance Department", body: "Manages budgets, financial reporting and controls." },
          { heading: "Operations Department", body: "Oversees logistics, procurement, HR and administration." },
          { heading: "Women Empowerment Department", body: "Ensures women's needs and voices are central to all programs." },
          { heading: "Internal Audit and Compliance", body: "Independently reviews compliance with policies and donor requirements." },
        ],
      },
      policies: {
        title: "Policies",
        intro: "Institutional policies that guide our conduct.",
        blocks: [
          {
            heading: "Key policies",
            list: ["Safeguarding / PSEA", "Code of Conduct", "Anti-Fraud and Anti-Corruption", "Procurement", "Human Resources", "Finance"],
            todo: "Upload approved policy documents",
          },
        ],
      },
      accountability: {
        title: "Accountability",
        intro: "We are accountable to the communities we serve, our partners and donors.",
        blocks: [
          { heading: "To communities", body: "Feedback and complaint channels, including anonymous options, are open to everyone we serve." },
          { heading: "To partners and donors", body: "Transparent reporting, monitoring and internal audit." },
        ],
      },
      safeguarding: {
        title: "Safeguarding",
        intro: "Keeping everyone we work with safe from harm, exploitation and abuse.",
        blocks: [
          { heading: "Our commitment", body: "PWSO has zero tolerance for sexual exploitation, abuse and harassment. All staff are expected to uphold safeguarding standards." },
          { heading: "Reporting a concern", body: "Concerns can be raised confidentially and anonymously through our complaints page." },
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
          { heading: "Aga Khan Foundation", body: "Funded the Women and Unlawful Traditional Practices Awareness Project (2019, Kunduz)." },
          { heading: "Jesuit Refugee Service (JRS)", body: "Funded the Access to Quality Education Program (2018, Badakhshan)." },
          { heading: "Azar Afrang Logistic & Construction Company", body: "Contribution to the 2025 women's fruit and vegetable processing program in Kunduz.", todo: "Confirm AALCC relationship" },
        ],
      },
      "strategic-partners": {
        title: "Strategic Partners",
        intro: "Partners we have worked with.",
        blocks: [
          { heading: "Food and Agriculture Organization (FAO)", todo: "Verify nature and dates of partnership" },
          { heading: "Aga Khan Foundation", body: "Development partner." },
          { heading: "Jesuit Refugee Service (JRS)", body: "Education partner." },
        ],
      },
      clusters: {
        title: "Clusters",
        intro: "Humanitarian clusters PWSO participates in.",
        blocks: [
          { heading: "Clusters", list: ["ES/NFI-Shelter", "Education", "FSAC", "WASH", "Child Protection", "Health", "Protection"], todo: "Confirm current membership" },
        ],
      },
      "working-groups": {
        title: "Working Groups",
        intro: "Coordination forums and working groups.",
        blocks: [
          { heading: "Working groups", list: ["GIHA UN Women", "OCHA", "UNDP-NCCSP", "ACVAP", "ADIWG", "CPW Stream", "Cash Working Group"], todo: "Confirm current membership" },
        ],
      },
      "become-a-partner": {
        title: "Become a Partner",
        intro: "Work with PWSO to reach women and communities across Afghanistan.",
        blocks: [
          { heading: "Why partner with PWSO", list: ["Community presence through offices in Kabul, Badakhshan and Kunduz", "Experience across education, livelihoods and women's rights", "Commitment to transparency and accountability"] },
          { heading: "Get in touch", body: `Email ${ORG.email} or use our contact page to start a conversation.` },
        ],
      },
    },
  },
  resources: {
    title: "Resources & Publications",
    intro: "Reports, research, policies and media from PWSO.",
    pages: {
      reports: { title: "Reports", intro: "Annual and project reports.", blocks: [{ heading: "Annual reports", todo: "Upload annual reports (PDF)" }] },
      research: { title: "Research", intro: "Assessments and studies.", blocks: [{ heading: "Research studies", todo: "Upload research and assessment reports" }] },
      publications: { title: "Publications", intro: "Briefs and publications.", blocks: [{ heading: "PWSO Profile 2026", body: "Our organizational profile.", todo: "Supply official PDF" }] },
      policies: { title: "Policy Documents", intro: "Approved institutional policies.", blocks: [{ heading: "Policies", todo: "Upload approved policy documents" }] },
      profiles: { title: "Profiles", intro: "Organizational profiles.", blocks: [{ heading: "PWSO Profile 2026", todo: "Supply official PDF" }] },
      gallery: { title: "Gallery", intro: "Photos from our work.", blocks: [] },
      videos: { title: "Videos", intro: "Video stories from the field.", blocks: [{ heading: "Video library", todo: "Supply video links" }] },
      "success-stories": { title: "Success Stories", intro: "Stories of change from the communities we work with.", blocks: [{ heading: "Stories", todo: "Approved success stories with consent" }] },
    },
  },
  "get-involved": {
    title: "Get Involved",
    intro: "Partner, volunteer, join our team or support our work.",
    pages: {
      partner: { title: "Partner With Us", intro: "Build programs together.", blocks: [{ heading: "How to partner", body: `Contact us at ${ORG.email} to discuss partnership opportunities.` }] },
      volunteer: { title: "Volunteer", intro: "Share your skills with communities.", blocks: [{ heading: "Volunteer opportunities", todo: "Volunteer roles and process" }] },
      careers: { title: "Careers", intro: "Join our team.", blocks: [{ heading: "Current vacancies", body: "There are no open vacancies at the moment. Please check back soon." }] },
      tenders: { title: "Tenders & Procurement", intro: "Procurement announcements.", blocks: [{ heading: "Open tenders", body: "There are no open tenders at the moment." }] },
      "support-us": {
        title: "Support Us",
        intro: "Help us reach more women and communities.",
        blocks: [
          { heading: "Institutional support", body: `To discuss institutional funding or in-kind support, contact ${ORG.email}.` },
          { heading: "Donation methods", todo: "Verified banking or donation details" },
        ],
      },
    },
  },
};
