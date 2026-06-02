import Image from "next/image";

const trustItems = [
  { icon: "🔒", label: "Secure" },
  { icon: "⚡", label: "Fast quotes" },
  { icon: "🛡️", label: "Trusted coverage" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gainsco-900">
      <div className="absolute inset-0 bg-gradient-to-r from-gainsco-900 via-gainsco-900/95 to-gainsco-800/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gainsco-500/30 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-16 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-blue-400/40 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
            Instant quote experience
          </span>
          <h1 className="font-display mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Professional auto insurance,{" "}
            <span className="text-blue-300">quoted in minutes</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-blue-100/90 sm:text-lg">
            Answer a few guided questions and we&apos;ll route you to the right
            coverage path — fast track or detailed review.
          </p>
          <ul className="mt-8 flex flex-wrap gap-6">
            {trustItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm text-blue-50"
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
          <a
            href="#quote"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gainsco-700 shadow-lg shadow-gainsco-900/25 transition hover:bg-blue-50"
          >
            Get started below
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/10">
            <Image
              src="/images/hero-automotive.svg"
              alt="Protected driving with GAINSCO auto insurance"
              width={800}
              height={500}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md sm:block">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-200">
              Average savings
            </p>
            <p className="font-display text-2xl font-bold text-white">$427/yr</p>
            <p className="text-xs text-slate-400">Demo estimate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
