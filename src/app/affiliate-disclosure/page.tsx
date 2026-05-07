import type { Metadata } from "next";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "DeskSetupPicks affiliate disclosure — how affiliate links work, Amazon Associates program details, and our FTC compliance statement.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Affiliate <span className="text-gradient">Disclosure</span>
          </h1>
          <p className="text-slate-500 mb-12 text-sm">
            In compliance with FTC guidelines — last updated May 1, 2026
          </p>

          <div className="glass-card p-8 md:p-14 space-y-12">

            {/* Intro */}
            <p className="text-slate-400 leading-relaxed text-lg">
              Transparency is a core value at DeskSetupPicks. This page explains
              exactly how we make money and how that does — and doesn&apos;t —
              affect our recommendations.
            </p>

            {/* 1. What Are Affiliate Links */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                1. What Are Affiliate Links?
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Some of the links on DeskSetupPicks.com are &quot;affiliate
                links.&quot; This means that if you click on a link and
                subsequently make a purchase, we may receive a small commission
                from the retailer — at{" "}
                <span className="text-white font-semibold">
                  absolutely no additional cost to you
                </span>
                . The price you pay is exactly the same whether you use our link
                or navigate to the retailer directly.
              </p>
            </div>

            {/* 2. How We Make Money */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                2. How We Make Money
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                DeskSetupPicks generates revenue through two primary channels:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  <span className="text-white font-semibold">
                    Amazon Associates:
                  </span>{" "}
                  We are a participant in the Amazon Services LLC Associates
                  Program. When you purchase through our Amazon links, we earn a
                  commission (typically 1–8% depending on category) from
                  qualifying purchases.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Display Advertising:
                  </span>{" "}
                  We display contextual ads through Google AdSense. These are
                  served automatically based on page content and do not
                  represent editorial endorsements.
                </li>
              </ul>
            </div>

            {/* 3. Does This Affect Our Reviews */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                3. Does This Affect Our Reviews?
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                <span className="text-white font-semibold">No.</span> Our
                editorial process is completely independent of our affiliate
                relationships. Here&apos;s what that means in practice:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  We test and evaluate products before we consider affiliate
                  availability
                </li>
                <li>
                  No brand can pay to improve their ranking or receive a more
                  favorable review
                </li>
                <li>
                  We link to products on Amazon because it offers the widest
                  availability, competitive pricing, and easy returns — not
                  because the commissions are higher
                </li>
                <li>
                  If a product fails our testing, we say so clearly regardless
                  of affiliate relationships
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed mt-4">
                We only recommend products we genuinely believe represent good
                value. If we wouldn&apos;t buy it ourselves, we won&apos;t tell you to.
              </p>
            </div>

            {/* 4. Amazon Associates */}
            <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-black text-white mb-4">
                4. Amazon Associates Disclosure
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm italic">
                DeskSetupPicks.com is a participant in the Amazon Services LLC
                Associates Program, an affiliate advertising program designed to
                provide a means for sites to earn advertising fees by
                advertising and linking to Amazon.com. As an Amazon Associate,
                we earn from qualifying purchases.
              </p>
            </div>

            {/* 5. FTC Compliance */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                5. FTC Compliance
              </h2>
              <p className="text-slate-400 leading-relaxed">
                In accordance with the Federal Trade Commission&apos;s{" "}
                <a
                  href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Endorsement Guides (16 C.F.R. Part 255)
                </a>
                , we disclose our material connections to any product or service
                we mention. This disclosure appears at the top of each review
                page and is summarized on this dedicated page. We are committed
                to full transparency with our readers.
              </p>
            </div>

            {/* 6. Questions */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                6. Questions?
              </h2>
              <p className="text-slate-400 leading-relaxed">
                If you have any questions about our affiliate relationships or
                how this affects our content, please reach out:
              </p>
              <p className="mt-3">
                <a
                  href="mailto:hello@desksetuppicks.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
                >
                  hello@desksetuppicks.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
