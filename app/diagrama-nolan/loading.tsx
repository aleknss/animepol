export default function DiagramaNolanLoading() {
  return (
    <div className="min-h-screen bg-background py-10 px-4 animate-pulse">
      <div className="max-w-3xl mx-auto">
        <div className="h-4 w-36 bg-muted rounded mb-6" />

        <div className="text-center mb-8 space-y-2">
          <div className="h-9 w-64 bg-muted rounded mx-auto" />
          <div className="h-5 w-72 bg-muted rounded mx-auto" />
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="size-48 bg-muted rounded" />
          <div className="h-4 w-40 bg-muted rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-2 bg-muted rounded" />
            <div className="flex justify-between">
              <div className="h-3 w-16 bg-muted rounded" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-2 bg-muted rounded" />
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-3 w-20 bg-muted rounded" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border space-y-4">
          <div className="space-y-2">
            <div className="h-6 w-24 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-28 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-6 w-48 bg-muted rounded" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="size-4 bg-muted rounded-sm shrink-0 mt-1" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-5/6 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
