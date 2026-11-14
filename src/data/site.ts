export const ORG = {
  name: "Poor Women Support Organization",
  short: "PWSO",
  tagline: "Partnership for Change",
  established: 2017,
  license: "License No. 4203, Ministry of Economy, Afghanistan",
  email: "info@pwsongo.org",
  phone: "+93 (0) 795 666 304",
  phoneHref: "tel:+93795666304",
  website: "www.pwsongo.org",
  offices: [
    { city: "Kabul", type: "Main Office" },
    { city: "Badakhshan", type: "Sub Office" },
    { city: "Kunduz", type: "Sub Office" },
  ],
  profileCoverageAreas: [
    "Badakhshan",
    "Nuristan",
    "Kunar",
    "Nangarhar",
    "Kabul",
    "Parwan",
    "Panjshir",
    "Kapisa",
    "Maidan Wardak",
    "Herat",
    "Farah",
    "Nimroz",
    "Kandahar",
    "Paktika",
    "Khost",
    "Paktia",
    "Logar",
    "Uruzgan",
    "Daikundi",
    "Ghor",
    "Takhar",
    "Kunduz",
    "Balkh",
    "Jawzjan",
    "Faryab",
    "Sar-e Pol",
    "Bamyan",
    "Samangan",
    "Baghlan",
    "Badghis",
    "Helmand",
    "Zabul",
    "Ghazni",
  ],
};

export type Zone = {
  name: string;
  provinces: string[];
  color: string;
};

export const ZONES: Zone[] = [
  {
    name: "Central Zone",
    provinces: ["Kabul", "Parwan", "Kapisa", "Panjshir", "Logar", "Wardak", "Bamyan", "Daikundi"],
    color: "#1E40AF",
  },
  {
    name: "North Zone",
    provinces: ["Balkh", "Jowzjan", "Sar-e Pol", "Faryab", "Samangan", "Baghlan", "Kunduz"],
    color: "#059669",
  },
  { name: "Northeast Zone", provinces: ["Badakhshan", "Takhar"], color: "#7C3AED" },
  { name: "East Zone", provinces: ["Nangarhar", "Laghman", "Kunar", "Nuristan"], color: "#DC2626" },
  { name: "Southeast Zone", provinces: ["Paktia", "Paktika", "Khost", "Ghazni"], color: "#D97706" },
  { name: "South Zone", provinces: ["Kandahar", "Helmand", "Uruzgan", "Zabul"], color: "#BE185D" },
  { name: "West Zone", provinces: ["Herat", "Ghor", "Badghis"], color: "#4338CA" },
  { name: "Southwest Zone", provinces: ["Nimroz", "Farah"], color: "#0D9488" },
];

export type NavLink = { label: string; to: string; desc?: string; hash?: string };
export type NavGroup = { title: string; links: NavLink[] };
export type NavItem = { label: string; to: string; intro?: string; groups?: NavGroup[] };

export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About PWSO",
    to: "/about",
    intro:
      "A national, non-profit organization working with women and marginalized communities since 2017.",
    groups: [
      {
        title: "Who we are",
        links: [
          { label: "Who We Are", to: "/about/who-we-are", desc: "Background and registration" },
          {
            label: "Vision, Mission & Goals",
            to: "/about/vision-mission-goals",
            desc: "What guides our work",
          },
          { label: "History", to: "/about/history", desc: "Our journey since 2017" },
          { label: "Core Values", to: "/about/core-values", desc: "Four principles we hold" },
        ],
      },
      {
        title: "How we work",
        links: [
          { label: "Leadership", to: "/about/leadership", desc: "Message from leadership" },
          { label: "Mandate", to: "/about/mandate", desc: "Our institutional mandate" },
          { label: "Approach", to: "/about/approach", desc: "Participation and sustainability" },
          {
            label: "Organizational Capacity",
            to: "/about/organizational-capacity",
            desc: "Systems and experience",
          },
        ],
      },
      {
        title: "Governance",
        links: [
          { label: "Organizational Structure", to: "/governance/structure" },
          { label: "Board", to: "/governance/board" },
          { label: "Departments", to: "/governance/departments" },
          { label: "Safeguarding", to: "/governance/safeguarding" },
        ],
      },
    ],
  },
  {
    label: "What We Do",
    to: "/programs",
    intro: "Ten thematic and technical programs designed around community needs.",
    groups: [
      {
        title: "Thematic areas",
        links: [
          { label: "Health & Nutrition", to: "/programs/health-nutrition" },
          { label: "Economic Empowerment", to: "/programs/economic-empowerment" },
          { label: "Education", to: "/programs/education" },
          { label: "Research & MEAL", to: "/programs/research-meal" },
          { label: "Agriculture & Climate Change", to: "/programs/agriculture-climate-change" },
        ],
      },
      {
        title: "Technical programs",
        links: [
          { label: "Women Empowerment", to: "/programs/women-empowerment" },
          { label: "Food Security & Livelihood", to: "/programs/food-security-livelihood" },
          { label: "WASH & Engineering", to: "/programs/wash-engineering" },
          { label: "Emergency Response", to: "/programs/emergency-response" },
          { label: "Protection", to: "/programs/protection" },
        ],
      },
      {
        title: "Who we serve",
        links: [
          {
            label: "Target Groups",
            to: "/target-groups",
            desc: "Women, youth and rural communities",
          },
        ],
      },
    ],
  },
  {
    label: "Where We Work",
    to: "/where-we-work",
    groups: [
      {
        title: "Sections",
        links: [
          { label: "Our Reach", to: "/where-we-work", hash: "our-reach" },
          { label: "Provinces Where We Work", to: "/where-we-work", hash: "provinces" },
          { label: "Regional Impact", to: "/where-we-work", hash: "regional-impact" },
          { label: "Featured Stories", to: "/where-we-work", hash: "featured-stories" },
        ],
      },
    ],
  },
  {
    label: "Projects",
    to: "/projects",
    groups: [
      {
        title: "Portfolio",
        links: [
          { label: "All Projects", to: "/projects", desc: "Search and filter the full portfolio" },
          { label: "Ongoing Projects", to: "/projects/ongoing" },
          { label: "Completed Projects", to: "/projects/completed" },
        ],
      },
    ],
  },
  {
    label: "Partners",
    to: "/partners",
    groups: [
      {
        title: "Partnerships",
        links: [
          { label: "Donors", to: "/partners/donors" },
          { label: "Strategic Partners", to: "/partners/strategic-partners" },
          { label: "Become a Partner", to: "/partners/become-a-partner" },
        ],
      },
      {
        title: "Coordination",
        links: [
          { label: "Clusters", to: "/partners/clusters" },
          { label: "Working Groups", to: "/partners/working-groups" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    to: "/resources",
    groups: [
      {
        title: "Library",
        links: [
          { label: "Reports", to: "/resources/reports" },
          { label: "Research", to: "/resources/research" },
          { label: "Publications", to: "/resources/publications" },
          { label: "Policies", to: "/resources/policies" },
        ],
      },
      {
        title: "Media",
        links: [
          { label: "Profiles", to: "/resources/profiles" },
          { label: "Gallery", to: "/resources/gallery" },
          { label: "Videos", to: "/resources/videos" },
          { label: "Success Stories", to: "/resources/success-stories" },
        ],
      },
    ],
  },
  {
    label: "Opportunities",
    to: "/get-involved",
    groups: [
      {
        title: "Opportunities",
        links: [
          { label: "RFP", to: "/get-involved/rfp" },
          { label: "RFQ", to: "/get-involved/rfq" },
          { label: "Job Announcement", to: "/get-involved/job-announcement" },
        ],
      },
      {
        title: "Our Services",
        links: [
          { label: "Training", to: "/get-involved/training" },
          { label: "Events", to: "/get-involved/events" },
        ],
      },
    ],
  },
];
