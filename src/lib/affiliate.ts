import { SITE } from "./site-config";

export function amazonLink(asin: string, amazonUrl?: string): string {
  if (amazonUrl) {
    const url = new URL(amazonUrl);
    url.searchParams.set("tag", SITE.amazonTag);
    return url.toString();
  }
  if (!asin || asin === "PLACEHOLDER") {
    return "#";
  }
  return `https://www.amazon.com/dp/${asin}?tag=${SITE.amazonTag}`;
}
