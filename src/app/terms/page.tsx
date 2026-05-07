import type { Metadata } from "next";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "DeskSetupPicks terms of service — the rules and conditions for using our website, content, and affiliate links.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-slate-500 mb-12 text-sm">
            Last updated: May 1, 2026
          </p>

          <div className="glass-card p-8 md:p-14 space-y-12">

            {/* Intro */}
            <p className="text-slate-400 leading-relaxed text-lg">
              Please read these Terms of Service carefully before using
              DeskSetupPicks.com. By accessing or using our website, you agree
              to be bound by these terms. If you do not agree, please do not use
              the site.
            </p>

            {/* 1. Acceptance */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-400 leading-relaxed">
                By accessing desksetuppicks.com, you confirm that you are at
                least 13 years of age and that you accept and will comply with
                these Terms of Service and our{" "}
                <a
                  href="/privacy-policy"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Privacy Policy
                </a>
                . These terms apply to all visitors, users, and others who
                access the site.
              </p>
            </div>

            {/* 2. Use of Site */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                2. Use of Site
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                You agree to use DeskSetupPicks only for lawful purposes. You
                must not:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  Use the site in any way that violates applicable local,
                  national, or international law
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the site or
                  its related systems
                </li>
                <li>
                  Scrape, crawl, or systematically extract content without prior
                  written permission
                </li>
                <li>
                  Transmit any unsolicited or unauthorized advertising or
                  promotional material
                </li>
                <li>
                  Engage in conduct that restricts or inhibits anyone&apos;s use or
                  enjoyment of the site
                </li>
              </ul>
            </div>

            {/* 3. Intellectual Property */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                All content on DeskSetupPicks.com — including but not limited to
                text, graphics, logos, photographs, product reviews, buying
                guides, and code — is the exclusive property of DeskSetupPicks
                or its content suppliers and is protected by copyright and other
                intellectual property laws.
              </p>
              <p className="text-slate-400 leading-relaxed">
                You may share links to our content and quote brief excerpts
                (with attribution) for non-commercial purposes. Reproduction,
                distribution, or commercial use of our content without express
                written permission is strictly prohibited.
              </p>
            </div>

            {/* 4. Affiliate Links */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                4. Affiliate Links &amp; Third-Party Content
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Our site contains affiliate links to third-party retailers,
                primarily Amazon. When you click these links and make a
                purchase, we may receive a commission. See our full{" "}
                <a
                  href="/affiliate-disclosure"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Affiliate Disclosure
                </a>{" "}
                for details.
              </p>
              <p className="text-slate-400 leading-relaxed">
                We are not responsible for the content, availability, pricing,
                or practices of third-party websites or retailers. Links to
                external sites do not constitute an endorsement beyond the
                specific product recommendation stated.
              </p>
            </div>

            {/* 5. Disclaimer of Warranties */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="text-slate-400 leading-relaxed">
                DeskSetupPicks.com is provided &quot;as is&quot; and &quot;as
                available&quot; without any warranties of any kind, either express or
                implied. We make no warranty that the site will be
                uninterrupted, error-free, or free of viruses. Product
                information, pricing, and availability are subject to change
                without notice. We strive for accuracy but cannot guarantee that
                all information is complete or current.
              </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-slate-400 leading-relaxed">
                To the fullest extent permitted by law, DeskSetupPicks and its
                owners, editors, and contributors shall not be liable for any
                indirect, incidental, special, consequential, or punitive
                damages arising from your use of, or inability to use, the site
                or its content — including purchasing decisions made based on our
                reviews. Your sole remedy for dissatisfaction with the site is to
                stop using it.
              </p>
            </div>

            {/* 7. Privacy */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                7. Privacy
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Your use of DeskSetupPicks is also governed by our{" "}
                <a
                  href="/privacy-policy"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Privacy Policy
                </a>
                , which is incorporated into these Terms of Service by reference.
                Please review it carefully.
              </p>
            </div>

            {/* 8. Changes to Terms */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-slate-400 leading-relaxed">
                We reserve the right to modify these Terms of Service at any
                time. Changes take effect immediately upon posting. The
                &quot;Last updated&quot; date at the top of this page will
                reflect the most recent revision. Continued use of the site
                after changes constitutes your acceptance of the new terms.
              </p>
            </div>

            {/* 9. Contact */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                9. Contact Information
              </h2>
              <p className="text-slate-400 leading-relaxed">
                If you have questions about these Terms of Service, please
                contact us:
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
