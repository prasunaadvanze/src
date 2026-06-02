"use client";

import clsx from "clsx";
import type { FormField } from "@/types/quote";
import type { AnswerValues } from "@/utils/answers";

interface FieldRendererProps {
  field: FormField;
  value: AnswerValues[string];
  error?: string;
  disabled?: boolean;
  onChange: (name: string, value: string | number | boolean | null) => void;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-gainsco-500 focus:outline-none focus:ring-2 focus:ring-gainsco-100 disabled:bg-slate-50";

export function FieldRenderer({
  field,
  value,
  error,
  disabled,
  onChange,
}: FieldRendererProps) {
  const id = `field-${field.name}`;
  const label = (
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
      {field.label}
      {field.required !== false && (
        <span className="ml-0.5 text-red-500" aria-hidden>
          *
        </span>
      )}
    </label>
  );

  const errorEl = error ? (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {error}
    </p>
  ) : null;

  switch (field.type) {
    case "number":
      return (
        <div>
          {label}
          <input
            id={id}
            type="number"
            inputMode="numeric"
            className={clsx(inputClass, error && "border-red-300")}
            value={value === null || value === undefined ? "" : String(value)}
            disabled={disabled}
            onChange={(e) =>
              onChange(
                field.name,
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          />
          {errorEl}
        </div>
      );

    case "dropdown":
      return (
        <div>
          {label}
          <select
            id={id}
            className={clsx(inputClass, error && "border-red-300")}
            value={String(value ?? "")}
            disabled={disabled}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            <option value="">Select…</option>
            {(field.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errorEl}
        </div>
      );

    case "radio":
      return (
        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-medium text-slate-700">
            {field.label}
            {field.required !== false && (
              <span className="ml-0.5 text-red-500">*</span>
            )}
          </legend>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {(field.options ?? []).map((opt) => (
              <label
                key={opt}
                className={clsx(
                  "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition",
                  value === opt
                    ? "border-gainsco-600 bg-gainsco-50 ring-1 ring-gainsco-600"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  checked={value === opt}
                  disabled={disabled}
                  className="text-gainsco-600 focus:ring-gainsco-500"
                  onChange={() => onChange(field.name, opt)}
                />
                <span className="text-sm text-slate-800">{opt}</span>
              </label>
            ))}
          </div>
          {errorEl}
        </fieldset>
      );

    case "checkbox":
      return (
        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
            <input
              id={id}
              type="checkbox"
              checked={Boolean(value)}
              disabled={disabled}
              className="mt-0.5 h-5 w-5 rounded border-slate-300 text-gainsco-600 focus:ring-gainsco-500"
              onChange={(e) => onChange(field.name, e.target.checked)}
            />
            <span className="text-sm text-slate-700">{field.label}</span>
          </label>
          {errorEl}
        </div>
      );

    case "date":
      return (
        <div>
          {label}
          <input
            id={id}
            type="date"
            className={clsx(inputClass, error && "border-red-300")}
            value={String(value ?? "")}
            disabled={disabled}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          {errorEl}
        </div>
      );

    case "text":
    default:
      return (
        <div>
          {label}
          <input
            id={id}
            type="text"
            className={clsx(inputClass, error && "border-red-300")}
            value={String(value ?? "")}
            disabled={disabled}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          {errorEl}
        </div>
      );
  }
}
