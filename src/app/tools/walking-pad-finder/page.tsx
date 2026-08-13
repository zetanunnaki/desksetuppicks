import type { Metadata } from "next";
import Link from "next/link";
import { WalkingPadFinder } from "@/components/WalkingPadFinder";
import { BackToTop } from "@/components/BackToTop";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Walking Pad Finder: Which Under-Desk Treadmill Should You Buy?",
  description:
    "Answer 1–3 quick questions and get matched to the right under-desk treadmill or walking pad for how you'll actually use it — walk-only, 2-in-1, budget, quiet, or desk-included.",
  alternates: { canonical: "/tools/walking-pad-finder/" },
  openGraph: {
    title: "Walking Pad Finder — Which Under-Desk Treadmill Should You Buy?",
    description: "Get matched to the right walking pad in three questions.",
    url: `${SITE.url}/tools/walking-pad-finder/`,
  },
};

const faqs = [
  {
    q: "How do I choose an under-desk treadmill?",
    a: "Start with one question: will you only walk, or also run? A walk-only pad is flatter, quieter, and cheaper; a 2-in-1 adds a fold-up rail and a running mode but is taller and heavier. From there, weigh price, noise (aim for under 45 dB if you take calls), and whether you need incline. The finder above narrows it to a single pick based on those trade-offs.",
  },
  {
    q: "What's the difference between a walking pad and a 2-in-1 treadmill?",
    a: "A walking pad is a rail-free slab for walking at roughly 0.5 to 4 mph under a standing desk — thin, light, and easy to store. A 2-in-1 adds a fold-up handrail and a faster running mode up to about 6 to 7.5 mph, so you can both walk at your desk and jog with the rail raised. Buy the 2-in-1 only if you'll genuinely run, since paying for a running mode you never use is the most common over-purchase in this category.",
  },
  {
    q: "Do I need a standing desk to use a walking pad?",
    a: "Yes, a walking pad needs a raised surface to work under, so pair it with a height-adjustable standing desk. If you don't have one, an all-in-one model with a desk built into the frame replaces two purchases at once. Either way, set the desk a few inches above your normal standing height to account for the pad's 4 to 5 inch deck.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Walking Pad Finder",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        url: `${SITE.url}/tools/walking-pad-finder/`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Interactive tool that matches you to the right under-desk treadmill or walking pad in three questions.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">Free Tool</p>
      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">Walking Pad Finder</h1>
      <p className="text-lg text-slate-400 leading-relaxed mb-2">
        The under-desk treadmill category is a wall of near-identical slabs, and the single biggest mistake
        is over-buying — paying for a running mode or auto-incline you'll never use. Answer a couple of
        questions and we'll point you to the right pick for how you'll actually move.
      </p>

      <WalkingPadFinder />

      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-li:text-slate-300"
      >
        <h2>How the match works</h2>
        <p>
          Every recommendation comes from the picks in our{" "}
          <Link href="/guides/best-under-desk-treadmills/">best under-desk treadmills guide</Link>, matched
          to your answers rather than to price or commission. If you'll only walk, you get a flat, quiet pad;
          if you'll run, you get the 2-in-1; if you don't have a standing desk, you get the all-in-one with a
          desk built in. Whatever the finder lands on, check it against your own space and budget in the full{" "}
          <Link href="/reviews/under-desk-treadmills/">walking pad reviews</Link> before you buy.
        </p>
        <p>
          Not sure a walking pad is right for you at all? Our honest take on{" "}
          <Link href="/blog/are-walking-pads-worth-it/">whether walking pads are worth it</Link> covers who
          should skip one, and the{" "}
          <Link href="/tools/standing-desk-calorie-calculator/">calorie calculator</Link> shows how much a
          slow walking hour actually adds versus sitting or standing.
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
