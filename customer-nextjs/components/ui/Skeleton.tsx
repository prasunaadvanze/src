import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-lg bg-slate-200/80",
        className
      )}
      aria-hidden
    />
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4" aria-busy aria-label="Loading form">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-11 w-32 ml-auto" />
    </div>
  );
}
