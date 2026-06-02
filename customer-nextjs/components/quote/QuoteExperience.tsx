"use client";

import { DynamicFormRenderer } from "@/components/form/DynamicFormRenderer";
import { HowItWorks } from "@/components/quote/HowItWorks";
import { HeroSection } from "@/components/quote/HeroSection";
import { QuoteSidebar } from "@/components/quote/QuoteSidebar";
import { QuoteSummary } from "@/components/quote/QuoteSummary";
import { StartQuotePanel } from "@/components/quote/StartQuotePanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormSkeleton } from "@/components/ui/Skeleton";
import { StepProgress } from "@/components/ui/StepProgress";
import { useQuoteFlow } from "@/hooks/useQuoteFlow";
import {
  getJourneyLabel,
  getStepLabel,
  getVisualStepIndex,
} from "@/utils/flow";

export function QuoteExperience() {
  const {
    response,
    phase,
    loading,
    submitting,
    error,
    startQuote,
    submitAnswers,
    clearError,
  } = useQuoteFlow(true);

  const journeyLabel = getJourneyLabel(response?.journey);
  const stepLabel = getStepLabel(response);
  const visualStep = getVisualStepIndex(phase);
  const progress = response?.progress ?? 0;

  return (
    <>
      <HeroSection />
      <HowItWorks />

      <section id="quote" className="scroll-mt-24 bg-blue-50/50 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="section-heading">Your personalized quote</h2>
            <p className="mt-2 text-slate-600">
              Complete the steps below — your progress updates automatically as
              you go.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-6 shadow-card">
                <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gainsco-600">
                      Quote application
                    </p>
                    <h3 className="font-display mt-1 text-xl font-bold text-slate-900">
                      Coverage details
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void startQuote()}
                    loading={loading}
                  >
                    Start over
                  </Button>
                </div>

                <StepProgress
                  activeIndex={visualStep}
                  progress={progress}
                  journeyLabel={journeyLabel}
                  stepLabel={stepLabel}
                />
              </Card>

              {error && (
                <Card className="mb-4 border-red-200 bg-red-50 shadow-card">
                  <p className="text-sm text-red-800">{error.message}</p>
                  <div className="mt-3 flex gap-2">
                    {error.retryable && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          clearError();
                          void startQuote();
                        }}
                      >
                        Retry
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={clearError}>
                      Dismiss
                    </Button>
                  </div>
                </Card>
              )}

              {loading && !response && <FormSkeleton />}

              {!loading && phase === "start" && !response?.schema && (
                <StartQuotePanel
                  onStart={() => void startQuote()}
                  loading={loading}
                />
              )}

              {response?.schema && (
                <DynamicFormRenderer
                  key={response.schema.stepId}
                  schema={response.schema}
                  loading={submitting}
                  onSubmit={(values) =>
                    void submitAnswers(response.schema!, values)
                  }
                />
              )}

              {response?.quote && <QuoteSummary quote={response.quote} />}
            </div>

            <div className="lg:col-span-1">
              <QuoteSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
