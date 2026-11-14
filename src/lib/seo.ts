export function seo(title: string, description: string, path?: string) {
  const t = `${title} | PWSO`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      ...(path ? [{ property: "og:url", content: `https://www.pwsongo.org${path}` }] : []),
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: t },
      { name: "twitter:description", content: description },
    ],
    ...(path ? { links: [{ rel: "canonical", href: `https://www.pwsongo.org${path}` }] } : {}),
  };
}
