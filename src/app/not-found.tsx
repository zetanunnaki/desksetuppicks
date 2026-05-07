import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="pt-24 md:pt-12 min-h-screen flex items-center justify-center">
      <section className="section-container flex flex-col items-center text-center">
        {/* Large 404 */}
        <p
          className="text-gradient font-black leading-none mb-6 select-none"
          style={{ fontSize: "clamp(8rem, 20vw, 18rem)" }}
        >
          404
        </p>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          Page Not Found
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-400 max-w-md mb-12 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/reviews/standing-desks" className="btn-outline">
            Browse Reviews
          </Link>
        </div>
      </section>
    </div>
  );
}
