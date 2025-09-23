export function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4 border-b border-gray-200 pb-4">
          <div>
            <div className="h-4 bg-gray-200 rounded-md w-32 mb-3"></div>
            <div className="h-8 bg-gray-300 rounded-md w-64"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded-md w-40"></div>
            <div className="h-10 bg-gray-200 rounded-md w-40"></div>
          </div>
        </div>

        {/* New Hero/Summary Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-200 rounded-lg h-32 lg:col-span-1"></div>
          <div className="bg-gray-200 rounded-lg h-32 lg:col-span-2"></div>
        </div>

        {/* Dashboard Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gray-200 rounded-lg h-96"></div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-200 p-6 rounded-lg h-80"></div>
            <div className="bg-gray-200 p-6 rounded-lg h-80"></div>
          </div>
        </div>
      </div>
    </div>
  );
}