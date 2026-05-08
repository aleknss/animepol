export default function SugerirLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
        <div className="h-4 w-36 bg-muted rounded mb-12" />

        <div className="mb-12 space-y-4">
          <div className="h-9 w-64 bg-muted rounded" />
          <div className="h-5 w-full max-w-xl bg-muted rounded" />
          <div className="h-5 w-5/6 max-w-xl bg-muted rounded" />
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-14 bg-muted rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted rounded" />
            <div className="h-40 bg-muted rounded-xl" />
          </div>

          <div className="h-11 w-40 bg-muted rounded-lg" />
        </div>

        <div className="mt-16 space-y-2">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-3/4 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
