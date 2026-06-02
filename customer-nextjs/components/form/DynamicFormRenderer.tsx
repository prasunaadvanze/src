"use client";

import { useEffect, useState } from "react";
import { FieldRenderer } from "@/components/form/FieldRenderer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { FormSchema } from "@/types/quote";
import {
  createInitialAnswers,
  type AnswerValues,
} from "@/utils/answers";
import { validateSchema, type FieldErrors } from "@/utils/validation";

interface DynamicFormRendererProps {
  schema: FormSchema;
  loading?: boolean;
  onSubmit: (values: AnswerValues) => void | Promise<void>;
}

export function DynamicFormRenderer({
  schema,
  loading,
  onSubmit,
}: DynamicFormRendererProps) {
  const [values, setValues] = useState<AnswerValues>(() =>
    createInitialAnswers(schema)
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setValues(createInitialAnswers(schema));
    setErrors({});
  }, [schema.stepId]);

  const handleChange = (
    name: string,
    value: string | number | boolean | null
  ) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSchema(schema, values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await onSubmit(values);
  };

  return (
    <Card className="animate-slide-up border-gainsco-100 shadow-card transition-shadow hover:shadow-card-hover">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            {schema.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Please provide accurate information for your quote.
          </p>
        </div>

        <div className="space-y-4">
          {schema.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              disabled={loading}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" loading={loading} size="lg">
            Continue
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>
      </form>
    </Card>
  );
}
