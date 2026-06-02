import type { QuoteFlowPhase, QuoteStepResponse } from "@/types/quote";

/** Derive UI phase from API-driven workflow state */
export function getFlowPhase(response: QuoteStepResponse | null): QuoteFlowPhase {
  if (!response) return "start";
  if (response.quote) return "summary";
  if (response.schema) return "questions";
  return "start";
}

export function getJourneyLabel(journey: string | undefined): string {
  switch (journey) {
    case "FAST":
      return "Fast quote";
    case "SLOW":
      return "Detailed quote";
    default:
      return "Getting started";
  }
}

export function getStepLabel(response: QuoteStepResponse | null): string {
  if (!response) return "Start quote";
  if (response.quote) return "Quote ready";
  return response.schema?.title ?? "Continue";
}

/** Map API progress (0–100) to the three conceptual steps for the indicator */
export function getVisualStepIndex(phase: QuoteFlowPhase): number {
  switch (phase) {
    case "start":
      return 0;
    case "questions":
      return 1;
    case "summary":
      return 2;
    default:
      return 0;
  }
}
