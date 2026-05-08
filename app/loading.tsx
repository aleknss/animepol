export default function Loading() {
  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="top-6 max-w-6xl m-auto flex justify-between items-center animate-pulse">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 bg-muted rounded-md" />
          <div className="size-9 bg-muted rounded-md" />
        </div>
      </div>

      <div className="text-center mb-10">
        <div className="mx-auto mb-4 h-40 w-40 bg-muted rounded" />
        <div className="h-9 w-48 bg-muted rounded mx-auto mb-4" />
        <div className="h-5 w-96 bg-muted rounded mx-auto mb-4" />
        <div className="flex justify-center gap-4">
          <div className="size-10 bg-muted rounded" />
          <div className="h-10 w-40 bg-muted rounded-md" />
        </div>
      </div>

      <div className="sticky top-6 z-10 w-full max-w-2xl mx-auto mb-8">
        <div className="h-12 bg-muted rounded-lg" />
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="h-9 w-20 bg-muted rounded-md" />
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="aspect-3/4 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-2/3 bg-muted rounded" />
                <div className="flex gap-1">
                  <div className="h-4 w-12 bg-muted rounded-full" />
                  <div className="h-4 w-12 bg-muted rounded-full" />
                </div>
                <div className="pt-3 border-t border-border space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-8 bg-muted rounded" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 w-8 bg-muted rounded" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
