export default function SugerenciaSectionSkeleton() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-36 animate-pulse rounded bg-muted/50" />
        <div className="flex gap-1">
          <div className="h-8 w-14 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-8 w-20 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-8 w-22 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-8 w-22 animate-pulse rounded-lg bg-muted/50" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-border mb-4" />

      {/* Card list */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-44 animate-pulse rounded bg-muted/50" />
                  <div className="h-5 w-20 animate-pulse rounded-4xl bg-muted/50" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-full animate-pulse rounded bg-muted/50" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-muted/50" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted/50" />
                </div>
                <div className="h-3 w-32 animate-pulse rounded bg-muted/50" />
              </div>
              <div className="flex gap-1 shrink-0">
                <div className="h-7 w-20 animate-pulse rounded-md bg-muted/50" />
                <div className="h-7 w-20 animate-pulse rounded-md bg-muted/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
