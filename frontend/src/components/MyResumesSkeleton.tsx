export function MyResumesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-surface p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="mt-4 h-5 bg-gray-300 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 h-10 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}