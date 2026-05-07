import Link from "next/link";
import { Microscope, Award, ArrowRight } from "lucide-react";

export function TrustSection() {
  return (
    <section className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col justify-center pr-8">
          <h2 className="text-4xl font-black text-white mb-6">
            Our Editorial <br />
            <span className="text-indigo-400">Pact.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            We don&apos;t take free gear, we don&apos;t take bribes, and we don&apos;t cut corners. Every review is independent.
          </p>
          <Link href="/about" className="flex items-center space-x-2 text-white font-bold group">
            <span className="border-b-2 border-indigo-500 pb-1">Read Methodology</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-10 glass-card">
            <Microscope className="w-10 h-10 text-indigo-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Metric Based</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We benchmark stability, motor speed, fabric breathability, and lumbar pressure points using standardized tools.
            </p>
          </div>
          <div className="p-10 glass-card">
            <Award className="text-green-400 w-10 h-10 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Expert Vetted</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our writers have decades of experience in hybrid workspace design, ergonomics, and hardware engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
