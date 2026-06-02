"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gainsco-600 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-gainsco-600 text-white shadow-md shadow-gainsco-900/20 hover:bg-gainsco-700 active:scale-[0.98]",
        variant === "secondary" &&
          "bg-gainsco-50 text-gainsco-700 hover:bg-gainsco-100",
        variant === "outline" &&
          "border border-gainsco-200 bg-white text-gainsco-700 hover:bg-gainsco-50",
        variant === "ghost" && "text-gainsco-700 hover:bg-gainsco-50",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
