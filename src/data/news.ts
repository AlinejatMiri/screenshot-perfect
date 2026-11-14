import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: "News" | "Announcement" | "Event";
  image: string;
  excerpt: string;
  body: string[];
};

// Demonstration content only — replace with approved public updates before launch.
export const NEWS: NewsItem[] = [
  {
    slug: "sample-community-garden",
    title: "Community garden session brings neighbours together",
    date: "2026-10-24",
    category: "News",
    image: heroAgriculture,
    excerpt:
      "A sample field update showing how a community activity can be presented on the website.",
    body: [
      "This is demonstration content for the website layout. It shows the ideal length and structure for a short field update.",
      "Replace this text, image and date with an approved story, participant consent details and verified results before publication.",
    ],
  },
  {
    slug: "sample-skills-workshop",
    title: "Registration opens for a skills workshop",
    date: "2026-10-16",
    category: "Announcement",
    image: heroLivelihoods,
    excerpt: "An example announcement card with a clear title, date and short call to action.",
    body: [
      "This placeholder demonstrates an announcement detail page.",
      "Future updates can include eligibility, location, application instructions, a contact point and the closing date.",
    ],
  },
  {
    slug: "sample-learning-exchange",
    title: "Learning exchange planned with local educators",
    date: "2026-10-08",
    category: "Event",
    image: heroEducation,
    excerpt:
      "A sample event listing for a conversation on inclusive learning and community support.",
    body: [
      "This demonstration event entry illustrates how upcoming activities can be shared with visitors.",
      "Add verified logistics, accessibility information and registration details when a real event is confirmed.",
    ],
  },
  {
    slug: "sample-wash-session",
    title: "Hygiene promotion sessions continue in Kabul districts",
    date: "2026-09-30",
    category: "News",
    image: heroAgriculture,
    excerpt: "A sample field update on community hygiene promotion activities and volunteer work.",
    body: [
      "This is demonstration content showing a second field update in the news list layout.",
      "Replace this text, image and date with an approved story and verified results before publication.",
    ],
  },
  {
    slug: "sample-tailoring-course",
    title: "Applications open for the next tailoring course",
    date: "2026-09-12",
    category: "Announcement",
    image: heroLivelihoods,
    excerpt: "An example announcement demonstrating a second call for applications.",
    body: [
      "This placeholder demonstrates how repeated announcements appear alongside each other.",
      "Future updates can include eligibility, location, application instructions and the closing date.",
    ],
  },
  {
    slug: "sample-teacher-training",
    title: "Teachers join a classroom support workshop",
    date: "2026-08-25",
    category: "Event",
    image: heroEducation,
    excerpt: "A sample event recap showing how a completed activity can be summarized.",
    body: [
      "This demonstration entry shows a completed event listing with a short recap structure.",
      "Add verified attendance, outcomes and participant consent details when a real recap is approved.",
    ],
  },
];
