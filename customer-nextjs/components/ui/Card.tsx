import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card sm:p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
