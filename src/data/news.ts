export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: "News" | "Announcement" | "Event";
  excerpt: string;
  body: string[];
  sample: true;
};

// Sample entries — replace with approved PWSO news before publication.
export const NEWS: NewsItem[] = [
  {
    slug: "women-processing-training-kunduz",
    title: "Women begin training in fruit and vegetable processing in Kunduz",
    date: "2025-06-10",
    category: "News",
    excerpt: "250 women are building skills to process and market seasonal produce.",
    body: [
      "PWSO has started a capacity building program for women in processing seasonal fruits and vegetables and marketing in Kunduz province.",
      "The program aims to reach 250 women with practical skills and links to local markets.",
    ],
    sample: true,
  },
  {
    slug: "pwso-profile-2026",
    title: "PWSO Organizational Profile 2026 coming soon",
    date: "2026-01-15",
    category: "Announcement",
    excerpt: "Our updated organizational profile will be available to download.",
    body: ["The updated PWSO organizational profile will be published in the Resources section."],
    sample: true,
  },
  {
    slug: "partners-coordination-meeting",
    title: "Partners coordination meeting",
    date: "2026-03-01",
    category: "Event",
    excerpt: "An event placeholder for partner coordination.",
    body: ["Event details to be confirmed."],
    sample: true,
  },
];
