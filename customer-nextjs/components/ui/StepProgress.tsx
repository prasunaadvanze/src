"use client";

import clsx from "clsx";

const STEPS = [
  { id: "start", label: "Start" },
  { id: "questions", label: "Your details" },
  { id: "summary", label: "Quote" },
] as const;

interface StepProgressProps {
  activeIndex: number;
  progress: number;
  journeyLabel: string;
  stepLabel: string;
}

export function StepProgress({
  activeIndex,
  progress,
  journeyLabel,
  stepLabel,
}: StepProgressProps) {
  return (
    <div className="space-y-4">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isComplete = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <li key={step.id} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={clsx(
                      "h-0.5 flex-1 transition-colors",
                      isComplete || isActive ? "bg-gainsco-600" : "bg-slate-200"
                    )}
                  />
                )}
                <span
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all",
                    isComplete && "bg-gainsco-600 text-white",
                    isActive && "bg-gainsco-600 text-white ring-4 ring-gainsco-100",
                    !isComplete &&
                      !isActive &&
                      "border-2 border-slate-200 bg-white text-slate-400"
                  )}
                >
                  {isComplete ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                {index < STEPS.length - 1 && (
                  <div
                    className={clsx(
                      "h-0.5 flex-1 transition-colors",
                      isComplete ? "bg-gainsco-600" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
              <span
                className={clsx(
                  "hidden text-center text-xs sm:block",
                  isActive ? "font-medium text-gainsco-700" : "text-slate-500"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium text-slate-700">{stepLabel}</span>
        <span
          className={clsx(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            journeyLabel.includes("Fast") && "bg-gainsco-100 text-gainsco-800",
            journeyLabel.includes("Detailed") && "bg-blue-100 text-blue-800",
            !journeyLabel.includes("Fast") &&
              !journeyLabel.includes("Detailed") &&
              "bg-slate-100 text-slate-600"
          )}
        >
          {journeyLabel}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gainsco-600 to-gainsco-500 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
