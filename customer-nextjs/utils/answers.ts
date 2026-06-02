import type { FormField, FormSchema } from "@/types/quote";

export type AnswerValues = Record<string, string | number | boolean | null>;

export function createInitialAnswers(schema: FormSchema): AnswerValues {
  const values: AnswerValues = {};
  for (const field of schema.fields) {
    values[field.name] = defaultForType(field.type);
  }
  return values;
}

function defaultForType(type: string): string | number | boolean | null {
  switch (type) {
    case "number":
      return null;
    case "checkbox":
      return false;
    default:
      return "";
  }
}

/** Normalize answers for API submission (matches Blazor Dictionary<string, object?>) */
export function serializeAnswers(
  schema: FormSchema,
  values: AnswerValues
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of schema.fields) {
    const raw = values[field.name];
    if (field.type === "number") {
      payload[field.name] =
        raw === null || raw === "" ? null : Number(raw);
    } else if (field.type === "checkbox") {
      payload[field.name] = Boolean(raw);
    } else {
      payload[field.name] = raw ?? "";
    }
  }
  return payload;
}
