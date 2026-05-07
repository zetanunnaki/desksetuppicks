export const SITE = {
  name: "DeskSetupPicks",
  url: "https://desksetuppicks.com",
  tagline: "The Science of a Perfect Workspace",
  description: "Data-backed reviews, ergonomic benchmarks, and aesthetic deep-dives to help you build the ultimate desk setup.",
  locale: "en_US",
  twitter: "@desksetuppicks",
  defaultOgImage: "/images/og/default.webp",
  amazonTag: "desksetuppicks-20",
  social: {
    twitter: "https://twitter.com/desksetuppicks",
    pinterest: "https://pinterest.com/desksetuppicks",
    instagram: "https://instagram.com/desksetuppicks",
  },
};

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path}`;
}
