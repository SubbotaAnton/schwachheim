export default function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-12 bg-surface-alt rounded w-3/4 mx-auto mb-4" />
        <div className="h-6 bg-surface-alt rounded w-1/2 mx-auto" />
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-5/6" />
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-4/6" />
      </div>
    </div>
  )
}
