export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-9 w-28 animate-pulse rounded-lg bg-muted/50" />
        <div className="text-right space-y-1">
          <div className="h-7 w-32 animate-pulse rounded bg-muted/50 ml-auto" />
          <div className="h-4 w-44 animate-pulse rounded bg-muted/50 ml-auto" />
        </div>
        <div className="h-9 w-28 animate-pulse rounded-lg bg-muted/50" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        <div className="h-8 w-36 animate-pulse rounded-lg bg-muted/50" />
        <div className="h-8 w-40 animate-pulse rounded-lg bg-muted/50" />
      </div>

      {/* Separator */}
      <div className="h-px bg-border mb-6" />

      {/* Content placeholder */}
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted/50" />
        <div className="rounded-xl border border-border p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-muted/50 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted/50" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted/50" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-16 animate-pulse rounded-md bg-muted/50" />
                <div className="h-8 w-16 animate-pulse rounded-md bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
