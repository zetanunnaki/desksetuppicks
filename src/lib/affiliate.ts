import { SITE } from "./site-config";

export function amazonLink(asin: string): string {
  if (!asin || asin === "PLACEHOLDER") {
    return "#";
  }
  return `https://www.amazon.com/dp/${asin}?tag=${SITE.amazonTag}`;
}
