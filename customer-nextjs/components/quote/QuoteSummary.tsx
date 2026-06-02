"use client";

import { Card } from "@/components/ui/Card";
import type { QuoteResult } from "@/types/quote";

interface QuoteSummaryProps {
  quote: QuoteResult;
}

export function QuoteSummary({ quote }: QuoteSummaryProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <Card className="animate-slide-up border-gainsco-200 bg-gradient-to-br from-gainsco-50 via-white to-white shadow-card-hover">
      <div className="text-center sm:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-gainsco-700">
          Your quote is ready
        </p>
        <p className="font-display mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
          {formatter.format(quote.premium)}
          <span className="text-lg font-normal text-slate-500">/yr</span>
        </p>
        <p className="mt-2 text-slate-600">{quote.message}</p>
        <p className="mt-1 text-sm text-slate-500">
          Journey:{" "}
          <span className="font-medium">
            {quote.journey === "FAST" ? "Fast track" : "Detailed track"}
          </span>
        </p>
      </div>

      {Object.keys(quote.mockChecks).length > 0 && (
        <div className="mt-6 border-t border-slate-200/80 pt-4">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Verification checks
          </p>
          <ul className="space-y-2">
            {Object.entries(quote.mockChecks).map(([key, value]) => (
              <li
                key={key}
                className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm"
              >
                <span className="text-slate-600">{key}</span>
                <span className="rounded-full bg-gainsco-100 px-2.5 py-0.5 text-xs font-medium text-gainsco-800">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
