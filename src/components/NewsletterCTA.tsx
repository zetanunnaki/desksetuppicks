"use client";

interface NewsletterCTAProps {
  variant?: "sidebar" | "full-width";
}

export function NewsletterCTA({ variant = "sidebar" }: NewsletterCTAProps) {
  if (variant === "sidebar") {
    return (
      <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group/cta">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full group-hover/cta:scale-150 transition-transform duration-700" />
        <h4 className="text-xl font-black mb-4">
          Build Your <br />
          Dream Office.
        </h4>
        <p className="text-xs text-indigo-200 mb-8 leading-relaxed">
          Get the curated workspace gear list every week.
        </p>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-5 py-3 rounded-xl text-sm text-slate-950 bg-white border-none focus:ring-2 focus:ring-slate-100"
          />
          <button
            type="submit"
            className="w-full py-3 bg-slate-950 text-white text-xs font-black rounded-xl hover:bg-black transition-colors uppercase tracking-widest"
          >
            Join The Lab
          </button>
        </form>
      </div>
    );
  }

  // Full-width variant for homepage
  return (
    <section className="section-container">
      <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
        <h2 className="text-4xl font-black text-white mb-4">
          Get Weekly Setup Tips &amp; Deals
        </h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Join 10,000+ remote workers who get our curated picks and exclusive desk setup inspiration every Thursday.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-6 py-4 rounded-xl text-sm text-slate-950 bg-white border-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
