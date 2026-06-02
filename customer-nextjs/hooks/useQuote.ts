import { useState, useCallback } from "react";
import clientApi from "@/lib/clientApi";
import type { FormSchema, QuoteResult } from "@/types/quote";

export default function useQuote() {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const { data } = await clientApi.post("/start", {
        driverAge: null,
        accidentHistory: null,
      });

      setQuoteId(data.quoteId);
      setSchema(data.schema);
      setProgress(data.progress ?? 0);
    } catch (err) {
      console.error("START ERROR:", err);
      setError("Unable to start your quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const next = useCallback(
    async (answers: Record<string, string>): Promise<void> => {
      try {
        if (!schema || !quoteId) return;

        setLoading(true);
        setError(null);
        setSchema(null);

        const payload: Record<string, unknown> = {};
        for (const field of schema.fields) {
          const raw = answers[field.name] ?? "";
          if (field.type === "number") {
            payload[field.name] =
              raw === "" ? null : Number(raw);
          } else if (field.type === "checkbox") {
            payload[field.name] = raw === "true";
          } else {
            payload[field.name] = raw;
          }
        }

        const { data } = await clientApi.post("/next", {
          quoteId,
          stepId: schema.stepId,
          answers: payload,
        });

        setProgress(data.progress ?? 0);

        if (data.quote) {
          setResult(data.quote);
          setSchema(null);
        } else if (data.schema) {
          setSchema(data.schema);
        }
      } catch (err) {
        console.error("NEXT ERROR:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [schema, quoteId]
  );

  return { schema, result, progress, loading, error, start, next };
}
