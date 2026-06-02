/** Field types supported by the schema-driven form renderer */
export type FormFieldType =
  | "text"
  | "number"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "date";

export interface FormField {
  type: FormFieldType | string;
  name: string;
  label: string;
  options?: string[] | null;
  required?: boolean;
}

export interface FormSchema {
  stepId: string;
  title: string;
  fields: FormField[];
}

export interface StartQuoteRequest {
  driverAge?: number | null;
  accidentHistory?: number | null;
}

export interface SubmitStepRequest {
  quoteId: string;
  stepId: string;
  answers: Record<string, unknown>;
}

export interface QuoteResult {
  quoteId: string;
  journey: string;
  premium: number;
  message: string;
  mockChecks: Record<string, string>;
}

export interface QuoteStepResponse {
  quoteId: string;
  workflowName: string;
  journey: string;
  schema: FormSchema | null;
  quote: QuoteResult | null;
  progress: number;
}

export interface QuoteConfiguration {
  fastRuleExpression: string;
  slowRuleExpression: string;
  fastQuestionCount: number;
  slowQuestionCount: number;
}

/** UI phase derived from API response — not static routes */
export type QuoteFlowPhase = "start" | "questions" | "summary";

export interface ApiError {
  message: string;
  status?: number;
  retryable: boolean;
}
