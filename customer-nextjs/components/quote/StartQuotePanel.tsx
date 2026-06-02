"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface StartQuotePanelProps {
  onStart: () => void;
  loading?: boolean;
}

export function StartQuotePanel({ onStart, loading }: StartQuotePanelProps) {
  return (
    <Card className="animate-fade-in text-center shadow-card sm:text-left">
      <h3 className="font-display text-xl font-semibold text-slate-900">
        Ready to get your quote?
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        We&apos;ll ask a few quick questions to route you to the right coverage
        path — fast track or detailed review.
      </p>
      <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
        {["Secure & guided", "Personalized pricing", "Under 3 minutes"].map(
          (item) => (
            <li
              key={item}
              className="flex items-center gap-2 justify-center sm:justify-start"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gainsco-100 text-xs text-gainsco-700">
                ✓
              </span>
              {item}
            </li>
          )
        )}
      </ul>
      <div className="mt-6 flex justify-center sm:justify-start">
        <Button onClick={onStart} loading={loading} size="lg">
          Start my quote
        </Button>
      </div>
    </Card>
  );
}
