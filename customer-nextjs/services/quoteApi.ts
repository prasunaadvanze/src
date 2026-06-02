import { apiRequest } from "@/services/apiClient";
import type {
  FormSchema,
  QuoteConfiguration,
  QuoteStepResponse,
  StartQuoteRequest,
  SubmitStepRequest,
} from "@/types/quote";

/** Mirrors Blazor QuoteApiClient — all quote journey API calls */
export const quoteApi = {
  startQuote(request: StartQuoteRequest = {}): Promise<QuoteStepResponse> {
    return apiRequest<QuoteStepResponse>("/api/quote/start", {
      method: "POST",
      body: JSON.stringify(request),
    });
  },

  submitStep(request: SubmitStepRequest): Promise<QuoteStepResponse> {
    return apiRequest<QuoteStepResponse>("/api/quote/next", {
      method: "POST",
      body: JSON.stringify({
        quoteId: request.quoteId,
        stepId: request.stepId,
        answers: request.answers,
      }),
    });
  },

  getSchema(stepId: string): Promise<FormSchema> {
    return apiRequest<FormSchema>(`/api/schema/${encodeURIComponent(stepId)}`);
  },

  getConfiguration(): Promise<QuoteConfiguration> {
    return apiRequest<QuoteConfiguration>("/api/configuration");
  },

  saveConfiguration(
    configuration: QuoteConfiguration
  ): Promise<QuoteConfiguration> {
    return apiRequest<QuoteConfiguration>("/api/configuration", {
      method: "POST",
      body: JSON.stringify(configuration),
    });
  },
};
