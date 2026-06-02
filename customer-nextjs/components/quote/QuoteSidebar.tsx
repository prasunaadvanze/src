import { Card } from "@/components/ui/Card";

export function QuoteSidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <Card className="border-gainsco-100 bg-gradient-to-br from-gainsco-50 to-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gainsco-600 text-white shadow-md">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h3 className="font-display mt-4 text-lg font-semibold text-slate-900">
          Coverage made simple
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Fewer questions, faster results — tailored to your risk profile by
          GAINSCO.
        </p>
      </Card>

      <Card className="shadow-card">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          What you may need
        </h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {[
            "ZIP code",
            "Vehicle details",
            "Driver information",
            "Accident history",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gainsco-100 text-xs text-gainsco-700">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="text-center shadow-card">
        <p className="font-display text-base font-semibold text-slate-900">
          Trusted by drivers
        </p>
        <p className="mt-2 text-gainsco-500 tracking-widest" aria-hidden>
          ★★★★★
        </p>
        <p className="mt-2 text-xs text-slate-500">
          4.8 average customer satisfaction
        </p>
      </Card>
    </aside>
  );
}
