import Link from "next/link";

export function AffiliateDisclosure() {
  return (
    <div className="section-container py-0 mb-16">
      <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl px-8 py-4 text-sm text-slate-400">
        DeskSetupPicks is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you.{" "}
        <Link
          href="/affiliate-disclosure"
          className="text-indigo-400 hover:text-indigo-300 underline"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
