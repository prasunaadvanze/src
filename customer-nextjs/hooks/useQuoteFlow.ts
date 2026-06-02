"use client";

import { useCallback, useEffect, useState } from "react";
import { quoteApi } from "@/services/quoteApi";
import { ApiClientError } from "@/services/apiClient";
import type { ApiError, FormSchema, QuoteStepResponse } from "@/types/quote";
import type { AnswerValues } from "@/utils/answers";
import { serializeAnswers } from "@/utils/answers";
import { getFlowPhase } from "@/utils/flow";

export interface UseQuoteFlowState {
  response: QuoteStepResponse | null;
  phase: ReturnType<typeof getFlowPhase>;
  loading: boolean;
  submitting: boolean;
  error: ApiError | null;
  startQuote: () => Promise<void>;
  submitAnswers: (schema: FormSchema, values: AnswerValues) => Promise<void>;
  clearError: () => void;
}

export function useQuoteFlow(autoStart = true): UseQuoteFlowState {
  const [response, setResponse] = useState<QuoteStepResponse | null>(null);
  const [loading, setLoading] = useState(autoStart);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof ApiClientError) {
      setError(err.toApiError());
    } else {
      setError({
        message: err instanceof Error ? err.message : "Something went wrong",
        retryable: true,
      });
    }
  }, []);

  const startQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await quoteApi.startQuote({});
      setResponse(result);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const submitAnswers = useCallback(
    async (schema: FormSchema, values: AnswerValues) => {
      if (!response) return;

      setSubmitting(true);
      setError(null);
      try {
        const next = await quoteApi.submitStep({
          quoteId: response.quoteId,
          stepId: schema.stepId,
          answers: serializeAnswers(schema, values),
        });
        setResponse(next);
      } catch (err) {
        handleError(err);
      } finally {
        setSubmitting(false);
      }
    },
    [response, handleError]
  );

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    if (autoStart) {
      void startQuote();
    }
  }, [autoStart, startQuote]);

  return {
    response,
    phase: getFlowPhase(response),
    loading,
    submitting,
    error,
    startQuote,
    submitAnswers,
    clearError,
  };
}
