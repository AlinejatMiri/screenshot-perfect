import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/common/PageHero";
import { NewsList } from "@/components/common/NewsList";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news/")({
  head: () => seo("News & Events", "The latest news, announcements and events from PWSO."),
  component: () => (
    <>
      <PageHero title="News & Events" intro="Updates from our programs, partners and communities." crumbs={[{ label: "News & Events" }]} />
      <section className="container-x py-14"><NewsList /></section>
    </>
  ),
});
