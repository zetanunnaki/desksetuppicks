import type { Metadata } from "next";
import Link from "next/link";
import { CalorieCalculator } from "@/components/CalorieCalculator";
import { BackToTop } from "@/components/BackToTop";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Standing Desk Calorie Calculator: Sitting vs Standing vs Walking",
  description:
    "How many calories does a standing desk actually burn? Enter your weight to compare sitting, standing, and walking-pad calorie burn — with the honest research on each.",
  alternates: { canonical: "/tools/standing-desk-calorie-calculator/" },
  openGraph: {
    title: "Standing Desk Calorie Calculator — Sitting vs Standing vs Walking",
    description:
      "Compare how many calories you burn sitting, standing, and walking at your desk, based on your bodyweight.",
    url: `${SITE.url}/tools/standing-desk-calorie-calculator/`,
  },
};

const faqs = [
  {
    q: "How many calories does a standing desk burn?",
    a: "Standing burns only slightly more than sitting, about 10 to 15 extra calories per hour for most people, so a full workday of standing adds a modest 80 to 120 calories rather than a meaningful amount for weight loss. The real value of standing is posture variation and less stiffness, not calorie burn. If burning calories is the goal, adding slow walking moves the number far more.",
  },
  {
    q: "How many calories does a walking pad burn?",
    a: "At a slow, desk-friendly pace of about 1.5 to 2 mph, a walking pad burns roughly 100 to 200 calories per hour depending on your bodyweight, which is several times the bump you get from standing. Even one hour a day adds up to a real weekly total without carving out a separate workout. Enter your weight in the calculator above for your own number.",
  },
  {
    q: "Does standing burn more calories than sitting?",
    a: "Yes, but only a little. Real-world studies put the difference at roughly 10 to 15 calories per hour, so standing all day instead of sitting might add around 100 calories. It is worth doing for circulation and comfort, but the scale will not move from standing alone.",
  },
  {
    q: "Is a walking pad or a standing desk better for burning calories?",
    a: "A walking pad, clearly. Standing adds only a small amount over sitting, while walking at a slow pace adds several times more. The best setup is a height-adjustable desk you can raise plus a walking pad you step onto during calls and reading, so you can sit, stand, and walk across the day rather than picking just one.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Standing Desk Calorie Calculator",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        url: `${SITE.url}/tools/standing-desk-calorie-calculator/`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Free calculator comparing calories burned sitting, standing, and walking at your desk, based on bodyweight and hours.",
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
        Standing Desk Calorie Calculator
      </h1>
      <p className="text-lg text-slate-400 leading-relaxed mb-2">
        &quot;How many calories does a standing desk burn?&quot; is one of the most-asked questions about
        home-office gear, and the honest answer surprises people. Enter your weight below to compare
        sitting, standing, and walking at your desk, then read what the research actually says.
      </p>

      <CalorieCalculator />

      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-li:text-slate-300"
      >
        <h2>The honest truth about standing and calories</h2>
        <p>
          Standing desks are often sold as a calorie-burning tool, but the research does not support that
          framing. Studies consistently find that standing burns only about 10 to 15 more calories per hour
          than sitting, so even if you stood for your entire workday you would add roughly 100 calories,
          which is a single bite of most snacks. That does not make a{" "}
          <Link href="/reviews/standing-desks/">standing desk</Link> a bad buy: alternating between sitting
          and standing reduces stiffness, eases back pressure, and keeps you more alert. Just buy it for
          comfort and posture, not for the scale.
        </p>
        <h2>Where the number actually moves: walking</h2>
        <p>
          The moment you add slow movement, the math changes. Walking on an{" "}
          <Link href="/reviews/under-desk-treadmills/">under-desk treadmill or walking pad</Link> at a gentle
          1.5 to 2 mph burns several times what standing does, because your muscles are actually doing work
          rather than holding still. One hour a day on a walking pad during calls and reading adds up to a
          real weekly total, all from hours you were going to spend at the desk anyway. For a deeper look at
          the numbers, see our breakdown of{" "}
          <Link href="/blog/how-many-calories-walking-pad/">how many calories a walking pad burns</Link>, and
          our honest take on <Link href="/blog/are-walking-pads-worth-it/">whether walking pads are worth it</Link>.
        </p>
        <p>
          The best setup is not sitting, standing, or walking, but all three: a height-adjustable desk you
          raise and lower through the day, with a walking pad you step onto when the task allows it. That way
          you break up sitting, get the posture benefits of standing, and capture the real calorie burn of
          walking, without a single dedicated workout.
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
