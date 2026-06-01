import type { Metadata } from "next";
import { FlaskConical, PenLine, Shield, Users } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DeskSetupPicks — our mission, methodology, and the team behind the data-backed desk setup reviews you trust.",
};

const teamMembers = [
  {
    initials: "AK",
    name: "Alex Kim",
    role: "Founder & Lead Reviewer",
    bio: "Former industrial designer with 10+ years of ergonomics research. Tests every product for a minimum of 30 days before writing a word.",
  },
  {
    initials: "SR",
    name: "Sara Reyes",
    role: "Ergonomics Specialist",
    bio: "Certified ergonomics consultant and occupational therapist. Brings clinical precision to posture and comfort evaluations.",
  },
  {
    initials: "MB",
    name: "Marcus Bell",
    role: "Tech & Peripherals Editor",
    bio: "Hardware enthusiast and former benchmark engineer. Obsesses over cable management and the perfect monitor setup.",
  },
];

const processSteps = [
  {
    icon: FlaskConical,
    num: "01",
    title: "Research",
    description:
      "We start with hundreds of hours of market analysis, spec comparisons, and community feedback before a single product reaches our desk.",
  },
  {
    icon: FlaskConical,
    num: "02",
    title: "Testing",
    description:
      "Every product is tested in real work conditions for a minimum of 30 days. We measure, benchmark, and document everything.",
  },
  {
    icon: PenLine,
    num: "03",
    title: "Writing",
    description:
      "Our reviews are written by the same people who did the testing — no outsourcing, no AI-generated copy. Real opinions from real use.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-12 min-h-screen">
      {/* Hero */}
      <section className="section-container pb-0">
        <div className="max-w-3xl">
          <div className="section-label">About Us</div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 leading-[1.05]">
            The team behind
            <br />
            <span className="italic text-slate-500">every recommendation.</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            We built the resource we wished existed when we were trying to figure
            out which standing desk wouldn&apos;t break in six months, which
            chair was actually worth the price, and which monitor arm wouldn&apos;t
            wobble every time we typed.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-container">
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-10 md:p-16 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-6">
            DeskSetupPicks exists to cut through the noise. The internet is full
            of affiliate-driven fluff, recycled spec sheets, and reviews written
            by people who have never touched the products they&apos;re recommending.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            Our mission is simple:{" "}
            <span className="text-white font-semibold">
              deliver honest, data-backed recommendations
            </span>{" "}
            so you can build a workspace that actually improves your health,
            focus, and productivity — without wasting money on gear that
            doesn&apos;t deliver.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="section-container pt-0">
        <div className="section-label">Our Process</div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-8 md:mb-12">
          How every review gets made.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/60 border border-slate-700/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-5xl font-black text-slate-800/30 leading-none select-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Promise */}
      <section className="section-container pt-0">
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-10 md:p-16 max-w-4xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-none">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Our Promise
            </h2>
          </div>
          <p className="text-lg text-slate-400 leading-relaxed mb-6">
            DeskSetupPicks participates in affiliate programs including Amazon
            Associates. This means we may earn a commission when you buy through
            our links — at no extra cost to you.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed mb-6">
            But here&apos;s what that doesn&apos;t change:{" "}
            <span className="text-white font-semibold">
              our rankings are never for sale
            </span>
            . No brand can pay to be featured, ranked higher, or reviewed more
            favorably. Our editorial opinions are formed independently, before
            we ever consider monetization.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            If we wouldn&apos;t recommend it to a close friend, we won&apos;t recommend it
            to you.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="section-container pt-0">
        <div className="flex items-center gap-3 mb-12">
          <Users className="w-6 h-6 text-indigo-400" />
          <h2 className="text-3xl md:text-4xl font-black text-white">
            The Team
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-sm mb-6">
                {member.initials}
              </div>
              <h3 className="text-xl font-black text-white mb-1">
                {member.name}
              </h3>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.15em] mb-4">
                {member.role}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
