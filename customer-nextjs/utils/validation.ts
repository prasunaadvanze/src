import type { FormField, FormSchema } from "@/types/quote";
import type { AnswerValues } from "@/utils/answers";

export type FieldErrors = Record<string, string>;

export function validateSchema(
  schema: FormSchema,
  values: AnswerValues
): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of schema.fields) {
    const error = validateField(field, values[field.name]);
    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}

function validateField(field: FormField, value: unknown): string | null {
  const required = field.required !== false;

  if (!required) return null;

  switch (field.type) {
    case "number": {
      if (value === null || value === "" || value === undefined) {
        return `${field.label} is required`;
      }
      const num = Number(value);
      if (Number.isNaN(num)) {
        return `${field.label} must be a valid number`;
      }
      return null;
    }
    case "checkbox":
      return null;
    case "date":
    case "text":
    case "dropdown":
    case "radio":
    default: {
      const str = String(value ?? "").trim();
      if (!str) {
        return `${field.label} is required`;
      }
      return null;
    }
  }
}
