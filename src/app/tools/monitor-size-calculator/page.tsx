import type { Metadata } from "next";
import Link from "next/link";
import { MonitorCalculator } from "@/components/MonitorCalculator";
import { BackToTop } from "@/components/BackToTop";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Monitor Size & Viewing-Distance Calculator (Is 4K Worth It?)",
  description:
    "Find the right monitor size, resolution, and viewing distance. Enter a screen size to see its pixel density, ideal desk distance, and whether 4K is worth it at that size.",
  alternates: { canonical: "/tools/monitor-size-calculator/" },
  openGraph: {
    title: "Monitor Size & Viewing-Distance Calculator",
    description:
      "See a monitor's pixel density, ideal viewing distance, and whether 4K is worth it at your screen size.",
    url: `${SITE.url}/tools/monitor-size-calculator/`,
  },
};

const faqs = [
  {
    q: "What is the best monitor size for 4K?",
    a: "For a desk at a normal viewing distance, 27 to 32 inches is the sweet spot for 4K. At 27 inches, 4K is extremely sharp (about 163 PPI) and lets you sit close with lots of workspace, though you may need display scaling so text isn't tiny. At 32 inches, 4K stays crisp (about 138 PPI) at a comfortable native size. Below 27 inches, 4K is sharper than most people can perceive at a desk, so 1440p is usually the smarter spend.",
  },
  {
    q: "How far should I sit from my monitor?",
    a: "A comfortable range for productivity is roughly 20 to 40 inches, or about an arm's length, with the top of the screen at eye level. Bigger screens want more distance; the calculator above gives the exact range for your size. If you can read text without leaning in or back, and pixels aren't visible, you're in the right spot.",
  },
  {
    q: "Is a 27-inch monitor good for work?",
    a: "Yes — 27 inches is the most popular productivity size for good reason. At 1440p it hits about 109 PPI, which is crisp at a desk without needing scaling, and it gives enough room for two windows side by side. Step up to 27-inch 4K if you want maximum sharpness and don't mind enabling display scaling; stay at 1440p if you want everything to look right out of the box.",
  },
  {
    q: "Is 4K worth it, or is 1440p enough?",
    a: "It depends on size and how close you sit. At 24 to 27 inches and a normal desk distance, 1440p already looks sharp and costs less, so 4K is a nice-to-have rather than a necessity. At 32 inches and up, or if you sit close and do detailed visual work, 4K's extra density is genuinely visible and worth it. Use the calculator to see whether pixels would be visible on your specific size and resolution.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Monitor Size & Viewing-Distance Calculator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        url: `${SITE.url}/tools/monitor-size-calculator/`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Free calculator for monitor pixel density, ideal viewing distance, and whether 4K is worth it at a given screen size.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">Free Tool</p>
      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
        Monitor Size &amp; Viewing-Distance Calculator
      </h1>
      <p className="text-lg text-slate-400 leading-relaxed mb-2">
        The two questions people ask before buying a monitor — &quot;what size should I get?&quot; and
        &quot;is 4K worth it?&quot; — have the same answer: it depends on how close you sit. Enter a screen
        size and resolution to see its pixel density, the ideal distance to sit, and whether the resolution
        pays off at that size.
      </p>

      <MonitorCalculator />

      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-li:text-slate-300"
      >
        <h2>How to read the numbers</h2>
        <p>
          <strong>Pixel density (PPI)</strong> is how tightly packed the pixels are — higher means sharper.
          Around 110 PPI and up looks crisp at a normal desk distance. <strong>Pixel-sharp distance</strong>{" "}
          is how far back you have to sit before individual pixels become impossible to see; sit closer than
          that and a sharp-eyed viewer can spot them. <strong>Recommended distance</strong> is the range
          where the screen fills a comfortable field of view without forcing you to swivel your head to read
          the edges — which is exactly the problem a <Link href="/blog/are-curved-monitors-better/">curve solves on ultrawides</Link>.
        </p>
        <p>
          Put simply: a bigger screen needs either more distance or more resolution to stay sharp. That's why
          a 24-inch 1080p panel looks fine from across a desk but soft up close, while a 27-inch 4K panel is
          razor-sharp even when you lean in. Once you know your ideal size and distance, our{" "}
          <Link href="/guides/best-monitors-for-work/">best monitors for work guide</Link> and{" "}
          <Link href="/reviews/monitors/">monitor reviews</Link> cover the panels worth buying, and a{" "}
          <Link href="/reviews/monitor-arms/">monitor arm</Link> lets you set the height and distance exactly.
        </p>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      <BackToTop />
    </main>
  );
}
