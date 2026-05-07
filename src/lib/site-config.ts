export const SITE = {
  name: "DeskSetupPro",
  url: "https://desksetuppro.vercel.app",
  tagline: "The Science of a Perfect Workspace",
  description: "Data-backed reviews, ergonomic benchmarks, and aesthetic deep-dives to help you build the ultimate desk setup.",
  locale: "en_US",
  twitter: "@desksetuppro",
  defaultOgImage: "/images/og/default.webp",
  amazonTag: "desksetuppro-20",
  social: {
    twitter: "https://twitter.com/desksetuppro",
    pinterest: "https://pinterest.com/desksetuppro",
    instagram: "https://instagram.com/desksetuppro",
  },
};

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path}`;
}
