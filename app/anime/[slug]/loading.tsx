export default function AnimePageLoading() {
  return (
    <main className="min-h-screen bg-background p-6 md:p-12 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-4 w-20 bg-muted rounded mb-8" />

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-80 shrink-0">
            <div className="aspect-3/4 rounded-2xl bg-muted border border-border" />

            <div className="mt-8 p-6 bg-muted/50 rounded-2xl border border-border space-y-4">
              <div className="h-3 w-32 bg-muted rounded" />
              <div className="size-48 bg-muted rounded mx-auto" />
              <div className="flex justify-center gap-6">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded" />
              </div>
            </div>
          </div>

          <div className="grow">
            <div className="mb-2 flex gap-2">
              <div className="h-5 w-16 bg-muted rounded-full" />
              <div className="h-5 w-20 bg-muted rounded-full" />
              <div className="h-5 w-14 bg-muted rounded-full" />
            </div>

            <div className="h-10 w-3/4 bg-muted rounded mb-6" />

            <div className="h-px bg-border mb-8" />

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-4/6 bg-muted rounded" />
              </div>

              <div className="space-y-3">
                <div className="h-7 w-24 bg-muted rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
