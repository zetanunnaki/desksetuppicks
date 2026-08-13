import type { Metadata } from "next";
import Link from "next/link";
import { ErgonomicsCalculator } from "@/components/ErgonomicsCalculator";
import { BackToTop } from "@/components/BackToTop";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Desk Ergonomics Calculator: Ideal Desk, Chair & Monitor Height",
  description:
    "Free desk ergonomics calculator. Enter your height to get your ideal chair height, seated and standing desk height, and monitor position — with the science to fine-tune it.",
  alternates: { canonical: "/tools/desk-ergonomics-calculator/" },
  openGraph: {
    title: "Desk Ergonomics Calculator — Ideal Desk, Chair & Monitor Height",
    description:
      "Enter your height to get your ideal chair, desk (seated and standing), and monitor height, based on standard ergonomic ratios.",
    url: `${SITE.url}/tools/desk-ergonomics-calculator/`,
  },
};

const faqs = [
  {
    q: "What height should my desk be for my height?",
    a: "For a seated desk, aim for roughly 40% of your height off the floor, which puts the surface at your elbow level with your arms relaxed at about 90 degrees. A 5'8\" (173 cm) person lands near 27–28 inches. For a standing desk, aim for about 62% of your height, or roughly 43 inches for that same person. Use the calculator above for your exact number, then fine-tune by feel.",
  },
  {
    q: "What height should a monitor be at a desk?",
    a: "The top edge of the screen should sit at or just below your seated eye level, so your gaze falls slightly downward onto the middle of the display. Place it about an arm's length away, roughly 20 to 28 inches, and tilt it back 10 to 20 degrees. If you wear bifocals or progressives, drop it a little lower to avoid tipping your head back.",
  },
  {
    q: "How do I know if my desk is too high or too low?",
    a: "Sit tall with your arms relaxed and your hands on the keyboard. If your shoulders creep up toward your ears, the desk is too high; if your wrists bend upward or you lean forward, it is too low. Your forearms should be roughly parallel to the floor with elbows near 90 degrees. Adjust your chair to that position first, then match the desk to your elbows.",
  },
  {
    q: "What is the correct standing desk height?",
    a: "Set a standing desk so the surface meets your elbows when you stand tall with shoulders relaxed, which is about 62% of your height. Most people set standing desks too high, forcing the shoulders to shrug. If your wrists angle up or your shoulders rise, lower it an inch at a time until your forearms sit parallel to the floor.",
  },
  {
    q: "Do I need a footrest to sit ergonomically?",
    a: "Only if your feet do not rest flat on the floor once the chair is at the right height for your desk. Shorter users often have to raise the chair so their arms clear the desk, which lifts their feet off the ground and puts pressure behind the knees. A footrest restores that support. If your feet are already flat, you do not need one.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Desk Ergonomics Calculator",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        url: `${SITE.url}/tools/desk-ergonomics-calculator/`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Free calculator that turns your height into your ideal chair, desk, and monitor height using standard ergonomic ratios.",
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
        Desk Ergonomics Calculator
      </h1>
      <p className="text-lg text-slate-400 leading-relaxed mb-2">
        Most desk pain comes from three things set at the wrong height: your chair, your desk, and your
        monitor. Enter your height and this tool gives you the ideal starting point for each, based on
        the same ergonomic ratios physical therapists and workspace planners use.
      </p>

      <ErgonomicsCalculator />

      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-li:text-slate-300"
      >
        <h2>Set it up in the right order: chair, desk, monitor</h2>
        <p>
          Ergonomics is a chain, and each link depends on the one before it, so the order you adjust
          things in matters more than any single number. Start with the <strong>chair</strong>: raise or
          lower the seat until your feet are flat on the floor and your knees sit at roughly 90 degrees.
          If your arms then sit too low for the desk, that is a desk problem, not a chair problem, so
          resist the urge to crank the seat up and leave your feet dangling. If your feet will not reach,
          a <Link href="/reviews/footrests/">footrest</Link> fixes it.
        </p>
        <p>
          Next the <strong>desk</strong>. With your shoulders relaxed and elbows bent to about 90 to 100
          degrees, the surface should meet your hands where they rest on the keyboard. That is why a single
          fixed desk height rarely suits everyone in a household. A{" "}
          <Link href="/reviews/standing-desks/">height-adjustable desk</Link> is the cleanest fix, because
          it lets you dial in both a seated and a standing position and switch through the day.
        </p>
        <p>
          Finally the <strong>monitor</strong>. The top edge of the screen belongs at or just below your
          seated eye level so your gaze drops slightly onto the middle of the display, about an arm's length
          away. Laptop users almost always sit too low here; a{" "}
          <Link href="/reviews/monitor-arms/">monitor arm</Link> or a{" "}
          <Link href="/reviews/laptop-stands/">laptop stand</Link> lifts the screen to eye level and frees
          the desk underneath.
        </p>

        <h2>Why height matters more than any single product</h2>
        <p>
          You can buy the most expensive <Link href="/reviews/ergonomic-chairs/">ergonomic chair</Link> on
          the market and still finish the day with a stiff neck if your monitor sits four inches too low.
          The gear only works once the geometry is right. That is the point of measuring first: it tells you
          which piece is actually out of position, so you spend money on the fix that changes how you feel,
          not the one with the best marketing.
        </p>
        <p>
          The numbers above are calibrated starting points, not rigid rules. Bodies differ in torso and leg
          proportion, so treat the results as where to begin and then trust the comfort checks: relaxed
          shoulders, forearms parallel to the floor, feet supported, and a slightly downward gaze to the
          screen. For the full walkthrough, see our{" "}
          <Link href="/guides/complete-wfh-ergonomics-guide/">complete WFH ergonomics guide</Link>.
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
