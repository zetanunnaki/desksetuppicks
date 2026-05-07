import type { Metadata } from "next";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "DeskSetupPicks privacy policy — how we collect, use, and protect your data. Covers cookies, Google Analytics, AdSense, and Amazon Associates.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-slate-500 mb-12 text-sm">
            Last updated: May 1, 2026
          </p>

          <div className="glass-card p-8 md:p-14 space-y-12">

            {/* Intro */}
            <p className="text-slate-400 leading-relaxed text-lg">
              DeskSetupPicks (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{" "}
              <a
                href="https://desksetuppicks.com"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                desksetuppicks.com
              </a>
              . This Privacy Policy explains what information we collect, how we
              use it, and the choices you have.
            </p>

            {/* 1. Information We Collect */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We collect information in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  <span className="text-white font-semibold">
                    Browsing data:
                  </span>{" "}
                  Pages visited, time spent, referral source, device type, and
                  IP address — collected automatically via analytics tools.
                </li>
                <li>
                  <span className="text-white font-semibold">Cookies:</span>{" "}
                  Small files stored on your device used for analytics,
                  advertising, and preferences.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Form submissions:
                  </span>{" "}
                  If you contact us via our contact form, we collect your name,
                  email address, and message content.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Newsletter signups:
                  </span>{" "}
                  If you subscribe to our newsletter, we collect your email
                  address.
                </li>
              </ul>
            </div>

            {/* 2. How We Use Information */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                2. How We Use Information
              </h2>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>To analyze site traffic and improve content quality</li>
                <li>To display relevant advertisements via Google AdSense</li>
                <li>
                  To respond to your inquiries submitted through our contact
                  form
                </li>
                <li>To send newsletters to subscribers who have opted in</li>
                <li>
                  To comply with legal obligations and enforce our terms of
                  service
                </li>
              </ul>
            </div>

            {/* 3. Cookies & Tracking */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                3. Cookies &amp; Tracking
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We use cookies and similar tracking technologies on this site.
                These include:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  <span className="text-white font-semibold">
                    Google Analytics:
                  </span>{" "}
                  We use Google Analytics to understand how visitors interact
                  with our site. Google may use this data in accordance with
                  their own privacy policy.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Google AdSense:
                  </span>{" "}
                  We serve ads through Google AdSense. Google uses cookies to
                  serve ads based on your prior visits to this and other
                  websites.
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Amazon Associates:
                  </span>{" "}
                  Our affiliate links to Amazon use cookies to track purchases
                  for commission purposes.
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed mt-4">
                You can opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Google&apos;s Ads Settings
                </a>
                .
              </p>
            </div>

            {/* 4. Third-Party Services */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                4. Third-Party Services
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                We work with the following third-party services that may collect
                data independently:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  <span className="text-white font-semibold">
                    Google AdSense
                  </span>{" "}
                  — Advertising platform (
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  )
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Amazon Associates
                  </span>{" "}
                  — Affiliate marketing program (
                  <a
                    href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201909010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Privacy Notice
                  </a>
                  )
                </li>
                <li>
                  <span className="text-white font-semibold">
                    Google Analytics
                  </span>{" "}
                  — Website analytics (
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  )
                </li>
              </ul>
            </div>

            {/* 5. Your Rights */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                5. Your Rights
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Depending on your location, you may have the following rights
                regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-400">
                <li>
                  <span className="text-white font-semibold">Access:</span>{" "}
                  Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <span className="text-white font-semibold">Correction:</span>{" "}
                  Request correction of inaccurate personal data.
                </li>
                <li>
                  <span className="text-white font-semibold">Deletion:</span>{" "}
                  Request deletion of your personal data where we have no
                  legitimate reason to continue processing it.
                </li>
                <li>
                  <span className="text-white font-semibold">Opt-out:</span>{" "}
                  Opt out of personalized advertising and analytics tracking via
                  your browser settings or the links above.
                </li>
              </ul>
              <p className="text-slate-400 leading-relaxed mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@desksetuppicks.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  privacy@desksetuppicks.com
                </a>
                .
              </p>
            </div>

            {/* 6. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                6. Children&apos;s Privacy
              </h2>
              <p className="text-slate-400 leading-relaxed">
                DeskSetupPicks does not knowingly collect personal information
                from children under 13 years of age. Our site is not directed
                toward children. If you believe a child has provided us with
                personal data, please contact us immediately at{" "}
                <a
                  href="mailto:privacy@desksetuppicks.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  privacy@desksetuppicks.com
                </a>{" "}
                and we will delete that information promptly. We comply with the
                Children&apos;s Online Privacy Protection Act (COPPA).
              </p>
            </div>

            {/* 7. Changes */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-slate-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes by updating the &quot;Last
                updated&quot; date at the top of this page. Continued use of the
                site after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* 8. Contact */}
            <div>
              <h2 className="text-2xl font-black text-white mb-4">
                8. Contact Us
              </h2>
              <p className="text-slate-400 leading-relaxed">
                For privacy-related questions or requests, please contact us at:
              </p>
              <p className="mt-3">
                <a
                  href="mailto:privacy@desksetuppicks.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
                >
                  privacy@desksetuppicks.com
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
